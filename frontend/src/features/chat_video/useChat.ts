import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import Cookies from "js-cookie";
import { useCallback, useEffect, useRef, useState } from "react";
import { Peer } from "peerjs";
import { useId } from "../../api/User/GetId";

export const useVideoChat = (target: string) => {
    const { data: myid } = useId();
    const [videoId, setVideoId] = useState<string>('');
    const [connection, setConnection] = useState<HubConnection>();
    const [myPeer, setMyPeer] = useState<Peer>(new Peer({
        referrerPolicy: 'origin-when-cross-origin',
        config: {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'turn:homeo@turn.bistri.com:80', username: 'homeo', credential: 'homeo' }
            ]
        }
    }));
    const myVideoRef = useRef<HTMLVideoElement>(null);
    const videoGridRef = useRef<HTMLDivElement>(null);
    const localStreamRef = useRef<MediaStream>();

    const getRoomId = useCallback(async () => {
      const roomId: string | undefined = await connection?.invoke('GetRoomId',parseInt(myid), parseInt(target))
  
      if(roomId) setVideoId(roomId)
    }, [connection])
  
    useEffect(() => {
      getRoomId();
    }, [connection])

    const joinChatRoom = async () => {
        try {
          getRoomId()
            const conn = new HubConnectionBuilder()
                .withUrl('https://localhost:44360/videoHub', {
                    accessTokenFactory: () => `Bearer ${Cookies.get('token')}`,
                })
                .configureLogging(LogLevel.None)
                .build();

            conn.on("user-connected", (roomId) => {
                // Handle if needed
            });

            await conn.start();
            setConnection(conn);

        } catch (e) {
            
        }
    };

    const JoinRoom = async () => {
        try {
            await connection?.invoke("JoinRoom", parseInt(myid), parseInt(target));
         
            // After joining the room, start PeerJS connection
            if(videoId!==''){
              startPeerJsConnection(videoId);
            }
        } catch (error) {
          
        }
    };

    const startPeerJsConnection = (roomId: string) => {
        // Connect to PeerJS using the room ID
        const myPeer = new Peer(roomId, {
            referrerPolicy: 'origin-when-cross-origin',
            config: {
                iceServers: [
                    { urls: 'stun:stun.l.google.com:19302' },
                    { urls: 'turn:homeo@turn.bistri.com:80', username: 'homeo', credential: 'homeo' }
                ]
            }
        });
        setMyPeer(myPeer);

        myPeer.on('open', () => {
            
        });

        myPeer.on('call', (call) => {
            call.answer(localStreamRef.current);

            call.on('stream', (userStream) => {
                addVideoStream(userStream);
            });
        });
    };

    useEffect(() => {
        if (target !== '' && connection && connection.state === 'Connected') {
            startSignalR();
        }
    }, [target, connection]);

    const startSignalR = async () => {
        try {
            if (connection && connection.state === 'Connected') {
                await JoinRoom();
            } else {
                await connection?.start();
                await JoinRoom();
            }
        } catch (error) {
           
        }
    };

    const addVideoStream = (stream: MediaStream | null) => {
        if (stream) {
            const videoGrid = document.querySelector('.video-grid');
            if (videoGrid) {
                const videoElement = document.createElement('video');
                videoElement.srcObject = stream;
                videoElement.autoplay = true;
                videoElement.muted = true;
                videoElement.playsInline = true;
                videoGrid.appendChild(videoElement);
            } else {
                
            }
        }
    };

    useEffect(() => {
        if (target !== '' && connection && connection.state === 'Connected') {
            navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true
            }).then(stream => {
                localStreamRef.current = stream;
                addVideoStream(stream);
            }).catch(error => {
               
            });
        }
    }, [target, connection]);

    return { joinChatRoom };
};
