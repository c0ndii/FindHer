// VideoChat.tsx
import React, { useEffect, useRef, useState } from 'react'
import { useVideoChat } from './useChat'
import { useParams } from 'react-router-dom'

export const VideoChat: React.FC = () => {
  const { target } = useParams<{ target: string }>()
  const { joinChatRoom, callUser, receiveSignal, sendSignal } = useVideoChat(
    target || ''
  )

  const [myStream, setMyStream] = useState<MediaStream | null>(null)
  const [targetStream, setTargetStream] = useState<MediaStream | null>(null)

  const myVideoRef = useRef<HTMLVideoElement>(null)
  const targetVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        })
        setMyStream(stream)
        if (myVideoRef.current) {
          myVideoRef.current.srcObject = stream
        }
      } catch (error) {
        console.error('Error accessing camera:', error)
      }
    }
    startCamera()
    return () => {
      if (myStream) {
        myStream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  useEffect(() => {
    const initializeConnection = async () => {
      try {
        await joinChatRoom()
        console.log('SignalR connected.')
      } catch (error) {
        console.error('SignalR connection error: ', error)
        // Handle connection error
      }
    }
    initializeConnection()
  }, [])

  useEffect(() => {
    receiveSignal('receiveSignal', (stream) => {
      console.log('Received stream:', stream)
      setTargetStream(stream)
      if (targetVideoRef.current) {
        targetVideoRef.current.srcObject = stream
      }
    })
  }, [receiveSignal])

  useEffect(() => {
    if (myStream) {
      sendSignal('SendSignal', myStream)
    }
  }, [myStream, sendSignal])

  return (
    <div>
      <div>
        <h2>Your Camera View</h2>
        <video ref={myVideoRef} autoPlay playsInline muted />
      </div>
      <div>
        <h2>Target User's Video</h2>
        <video ref={targetVideoRef} autoPlay playsInline />
      </div>
    </div>
  )
}
