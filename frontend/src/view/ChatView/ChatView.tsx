import { useState } from 'react'
import {
  Chatroom,
  Messagecontainer,
  Waitingroom,
} from '../../components/ChatRoom'
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr'
import { getId } from '../../api/User/GetId'
import Cookies from 'js-cookie'

export const ChatView = () => {
  const [myid, setmyid] = useState<number>()
  const [receiverid, setreceiverid] = useState<number>()
  const [connection, setConnection] = useState<HubConnection>()
  const [messages, setMessages] = useState<any[]>([])

  const joinChatRoom = async (
    username: number,
    username2: number,
    message: string
  ) => {
    try {
      const conn = new HubConnectionBuilder()
        .withUrl('https://localhost:44360/chatHub', {
          accessTokenFactory: () => `Bearer ${Cookies.get('token')}`,
        })
        .configureLogging(LogLevel.Information)
        .build()

      setmyid(username)
      setreceiverid(username2)

      // conn.on('JoinSpecificChatRoom', (username, msg) => {
      //   console.log('msg', msg)
      // })
      //await conn.invoke('GetChatHistory', myid, receiverid)
      await conn.on('ReceiveMessage', (message) => {
        setMessages((messages) => [...messages, message])
      })

      await conn.start()
      //await conn.invoke('JoinSpecificChatRoom', { username, chatroom })

      setConnection(conn)
    } catch (e) {
      console.log(e)
    }
  }

  const sendMessage = async (message: string) => {
    try {
      await connection?.invoke('SaveUserConnection', myid)
      await connection?.invoke('SendMessage', myid, receiverid, message)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      {!connection ? (
        <>
          <Waitingroom joinChatRoom={joinChatRoom} />
        </>
      ) : (
        <Chatroom messages={messages} sendMessage={sendMessage} />
      )}
    </>
  )
}
