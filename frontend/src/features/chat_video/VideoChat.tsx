// VideoChat.tsx
import React, { useEffect, useRef, useState } from 'react'
import { useVideoChat } from './useChat'
import { useParams } from 'react-router-dom'

export const VideoChat: React.FC = () => {
  const { target } = useParams<{ target: string }>()
  const { joinChatRoom, TurnOnCamera } = useVideoChat(target || '')

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

  return (
    <div>
      <div video-grid={true}></div>
    </div>
  )
}
