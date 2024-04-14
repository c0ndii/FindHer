import React, { useEffect, useRef } from 'react'
import { useVideoChat } from './useChat'
import { useParams } from 'react-router-dom'

export const VideoChat: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { startConnection, callUser } = useVideoChat(id ? id : '')

  useEffect(() => {
    startConnection()
  }, [])

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (error) {
        console.error('Error accessing camera:', error)
      }
    }
    startCamera()
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  return (
    <div>
      <h2>Camera View</h2>
      <video ref={videoRef} autoPlay playsInline muted />
    </div>
  )
}
