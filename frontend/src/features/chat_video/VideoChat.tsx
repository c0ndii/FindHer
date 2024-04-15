// VideoChat.tsx
import React, { useEffect, useRef, useState } from 'react'
import { useVideoChat } from './useChat'
import { useParams } from 'react-router-dom'

export const VideoChat: React.FC = () => {
  const { target } = useParams<{ target: string }>()
  const { joinChatRoom } = useVideoChat(target || '')

  useEffect(() => {
    const initializeConnection = async () => {
      try {
        await joinChatRoom()
      } catch (error) {
        console.error('SignalR connection error: ', error)
      }
    }
    initializeConnection()
  }, [])

  return (
    <div>
      <div className="video-grid"></div>
    </div>
  )
}
