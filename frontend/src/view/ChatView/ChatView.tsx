import { useState } from 'react'
import { Chatroom, Waitingroom } from '../../components/ChatRoom'
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr'

export const ChatView = () => {
  const [connection, setConnection] = useState<HubConnection>()
  const [messages, setMessages] = useState<any[]>([])

  const joinChatRoom = async (username: string, chatroom: string) => {
    try {
      const conn = new HubConnectionBuilder()
        .withUrl('https://localhost:44360/chathub')
        .configureLogging(LogLevel.Information)
        .build()

      conn.on('JoinSpecificChatRoom', (username, msg) => {
        console.log('msg', msg)
      })

      conn.on('ReceiveSpecificMessage', (username, msg) => {
        setMessages((messages) => [...messages, { username, msg }])
      })

      await conn.start()
      await conn.invoke('JoinSpecificChatRoom', { username, chatroom })

      setConnection(conn)
    } catch (e) {
      console.log(e)
    }
  }

  const sendMessage = async (message: string) => {
    try {
      await connection?.invoke('SendMessage', message)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      {!connection ? (
        <Waitingroom joinChatRoom={joinChatRoom} />
      ) : (
        <Chatroom messages={messages} sendMEssage={sendMessage} />
      )}
    </>
  )
}
