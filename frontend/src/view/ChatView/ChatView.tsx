import { useCallback, useEffect, useState } from 'react'
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

type History = {
  senderId: number
  receiverId: number
  content: string
  sendTime: Date
}

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

  const handleNewConnection = useCallback(async () => {
    const mess: History[] | undefined = await connection?.invoke(
      'GetChatHistory',
      myid,
      receiverid
    )
    console.log(mess)
    mess?.sort(
      (a, b) => new Date(a.sendTime).getTime() - new Date(b.sendTime).getTime()
    )
    const messagesHistory = [] as string[]
    mess?.forEach((object) => {
      messagesHistory.push(object.senderId + '#' + object.content)
      console.log(object.senderId + '#' + object.content)
    })
    console.log(messagesHistory)
    // const messagesHistory = mess?.map((message) => {
    //   return `${message.SenderId}#${message.Content}`
    // })

    setMessages(messagesHistory)
    await connection?.invoke('SaveUserConnection', myid)
  }, [connection])

  useEffect(() => {
    handleNewConnection()
  }, [connection])

  const sendMessage = async (message: string) => {
    try {
      // const mess = await connection?.invoke('GetChatHistory', myid, receiverid)
      // console.log(mess, 'xd')
      // await connection?.on('GetChatHistory', (result: History[]) => {
      //   console.log(result, 'xd2')
      //   const messagesHistory = result.map((message) => {
      //     return `${message.SenderId}#${message.Content}`
      //   })

      //   setMessages([messagesHistory])
      // })
      // await connection?.invoke('SaveUserConnection', myid)
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
