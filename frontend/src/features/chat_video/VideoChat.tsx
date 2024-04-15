import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Peer from 'peerjs'

export const VideoChat: React.FC = () => {
  const { target: roomId } = useParams<{ target: string }>()
  const [peerId, setPeerId] = useState<string>('')
  const [remotePeerIdValue, setRemotePeerIdValue] = useState<string>(roomId!)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const currentUserVideoRef = useRef<HTMLVideoElement>(null)
  const peerInstance = useRef<Peer | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    const peer = new Peer()

    peer.on('open', (id) => {
      setPeerId(id)
    })

    peer.on('call', (call) => {
      if (mediaStreamRef.current) {
        currentUserVideoRef.current!.srcObject = mediaStreamRef.current
        currentUserVideoRef.current!.play()

        call.answer(mediaStreamRef.current)

        call.on('stream', (remoteStream) => {
          remoteVideoRef.current!.srcObject = remoteStream
          remoteVideoRef.current!.play()
        })
      } else {
        console.error('MediaStream is not available.')
      }
    })

    peerInstance.current = peer

    return () => {
      peer.disconnect()
    }
  }, [])

  const call = async (remotePeerId: string) => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      })

      if (mediaStream) {
        mediaStreamRef.current = mediaStream
        currentUserVideoRef.current!.srcObject = mediaStream
        currentUserVideoRef.current!.play()

        const call = peerInstance.current!.call(remotePeerId, mediaStream)

        call.on('stream', (remoteStream) => {
          remoteVideoRef.current!.srcObject = remoteStream
          remoteVideoRef.current!.play()
        })
      } else {
        console.error('getUserMedia: MediaStream is not available.')
      }
    } catch (error) {
      console.error('getUserMedia error:', error)
    }
  }

  return (
    <div>
      <h1>Current user id is {peerId}</h1>
      <button onClick={() => call(remotePeerIdValue)}>Call</button>
      <div>
        <video ref={currentUserVideoRef} autoPlay muted />
      </div>
      <div>
        <video ref={remoteVideoRef} autoPlay />
      </div>
    </div>
  )
}
