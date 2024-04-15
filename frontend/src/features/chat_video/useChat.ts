import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Peer } from "peerjs";
import { useId } from "../../api/User/GetId";

export const useVideoChat = (target:string) => {
    const { data: myid } = useId()
    const [videoId, setVideoId] = useState<string>('')
    const [connection, setConnection] = useState<HubConnection>()
    const myPeer = new Peer()
    let localStream: any = null;

    const joinChatRoom = async () => {
      try {
        const conn = new HubConnectionBuilder()
          .withUrl('https://localhost:44360/videoHub', {
            accessTokenFactory: () => `Bearer ${Cookies.get('token')}`,
          })
          .configureLogging(LogLevel.None)
          .build()

        await conn.start()
        console.log(conn)
        setConnection(conn)
      } catch (e) {
        console.log(e)
      }
    }

  useEffect(() => {
    if (target !== '' && connection?.state === 'Connected') {
      console.log(target, myid)
      SaveUserConnection();
    }
  }, [target, connection]);


  const TurnOnCamera = async (targetId: string) => {
    try {
      await connection?.invoke("TurnOnCamera", parseInt(targetId), myid);
      console.log('turnedon')
    } catch (error) {
      console.error("Error calling user: ", error);
    }
  };

  const SaveUserConnection = async () => {
    try {
      await connection?.invoke("SaveUserConnection", myid);
      console.log('saveuserconn')
    } catch (error) {
      console.error("Error calling user: ", error);
    }
  };

  connection?.on('camera-on',(response)=>{
    setVideoId(response)
    connectNewUser(response,localStream)
  })


  myPeer.on('open', ()=> {
    TurnOnCamera(target);
  })

  const videoGrid = document.querySelector('[video-grid]')
  const myVideo = document.createElement('video')
  myVideo.muted = true;
  navigator.mediaDevices.getUserMedia({
    audio:true,
    video:true
  }).then(stream=>{
    addVideoStream(myVideo,stream)
    localStream = stream
  })

  myPeer.on('call',call=>{
    call.answer(localStream)

    const userVideo = document.createElement('video')
    call.on('stream',userStream=>{
      addVideoStream(userVideo,userStream)
    })
  })

  const addVideoStream=(video:any,stream:any)=>{
    video.srcObject = stream;
    video.addEventListener('loadedmetadata',()=>{
      video.play();
    })
    videoGrid?.appendChild(video)
  }


  const connectNewUser = (videoID: string, localStream:any)=>{
    const userVideo =document.createElement('video');
    console.log(videoID)
    const call = myPeer.call(videoID, localStream);

    call.on('stream', userVideoStream => {
      addVideoStream(userVideo, userVideoStream)
    })
  }

  return { joinChatRoom,TurnOnCamera };
};
