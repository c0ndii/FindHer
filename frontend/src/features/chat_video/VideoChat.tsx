import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Peer from 'peerjs'

export const VideoChat: React.FC = () => {
  const { target: roomId } = useParams<{ target: string }>()
  const [peerId, setPeerId] = useState<string | undefined>(undefined)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const currentUserVideoRef = useRef<HTMLVideoElement>(null)
  const peerInstance = useRef<Peer | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    const initializePeer = async () => {
      try {
        const peer = new Peer()

        peer.on('open', async (id) => {
          setPeerId(id)
          console.log('Connected to room:', roomId)
          callOtherUsers(peer, roomId!)
        })

        peer.on('call', (call) => {
          console.log(`Received call from peer: ${call.peer}`)
          if (mediaStreamRef.current) {
            call.answer(mediaStreamRef.current)

            call.on('stream', (remoteStream) => {
              remoteVideoRef.current!.srcObject = remoteStream
              remoteVideoRef.current!.addEventListener('loadedmetadata', () => {
                remoteVideoRef.current!.play()
              })
            })
          } else {
            console.error('MediaStream is not available.')
          }
        })

        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        })
        mediaStreamRef.current = mediaStream
        currentUserVideoRef.current!.srcObject = mediaStream
        currentUserVideoRef.current!.addEventListener('loadedmetadata', () => {
          currentUserVideoRef.current!.play()
        })

        peerInstance.current = peer
      } catch (error) {
        console.error('Error initializing Peer:', error)
      }
    }

    initializePeer()

    return () => {
      if (peerInstance.current) {
        peerInstance.current.disconnect()
      }
    }
  }, [roomId])

  const callOtherUsers = (peer: Peer, roomId: string) => {
    peer.listAllPeers((peers) => {
      peers.forEach((peerId) => {
        if (peerId !== peer.id) {
          const call = peer.call(peerId, mediaStreamRef.current!)
          call.on('stream', (remoteStream) => {
            remoteVideoRef.current!.srcObject = remoteStream
            remoteVideoRef.current!.addEventListener('loadedmetadata', () => {
              remoteVideoRef.current!.play()
            })
          })
        }
      })
    })
  }

  return (
    <div>
      <h1>Current user id is {peerId}</h1>
      <div>
        <video ref={currentUserVideoRef} autoPlay muted />
      </div>
      <div>
        <video ref={remoteVideoRef} autoPlay />
      </div>
    </div>
  )
}
