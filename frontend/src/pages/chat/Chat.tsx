import { useCallback, useEffect, useState } from 'react'
import { Chatroom, Waitingroom } from '../../features/chat'
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr'
import { useId } from '../../api/User/GetId'
import Cookies from 'js-cookie'
import { useChatContext } from '../../features/chat/ChatContext'
import { usePairs } from '../../api/Pair/GetPairs'

type History = {
  senderId: number
  receiverId: number
  content: string
  sendTime: Date
}

export const Chat = () => {
  const { data: myid } = useId()
  const [connection, setConnection] = useState<HubConnection>()
  const [messages, setMessages] = useState<any[]>([])
  const { activePerson, setActivePerson } = useChatContext()

  const { data: people, isFetched } = usePairs()
  const [isWaiting, setIsWaiting] = useState<boolean>(true)

  useEffect(() => {
    if (isFetched && people) {
      setActivePerson(people[0])
      setIsWaiting(false)
    }
  }, [people, isFetched])

  useEffect(() => {
    if (myid !== undefined && activePerson?.userId !== undefined) {
      joinChatRoom(myid, activePerson?.userId)
    }
  }, [myid])

  useEffect(() => {
    if (myid !== undefined && activePerson?.userId !== undefined) {
      joinChatRoom(myid, activePerson?.userId)
    }
  }, [myid, activePerson])

  const joinChatRoom = async (username: number, username2: number) => {
    try {
      const conn = new HubConnectionBuilder()
        .withUrl('https://localhost:44360/chatHub', {
          accessTokenFactory: () => `Bearer ${Cookies.get('token')}`,
        })
        .configureLogging(LogLevel.Information)
        .build()

      await conn.on('ReceiveMessage', (message) => {
        setMessages((messages) => [...messages, message])
      })

      await conn.start()

      setConnection(conn)
    } catch (e) {
      console.log(e)
    }
  }

  const handleNewConnection = useCallback(async () => {
    const mess: History[] | undefined = await connection?.invoke(
      'GetChatHistory',
      myid,
      activePerson?.userId
    )
    mess?.sort(
      (a, b) => new Date(a.sendTime).getTime() - new Date(b.sendTime).getTime()
    )
    const messagesHistory = [] as string[]
    mess?.forEach((object) => {
      messagesHistory.push(object.senderId + '#' + object.content)
    })

    setMessages(messagesHistory)
    await connection?.invoke('SaveUserConnection', myid)
  }, [connection])

  useEffect(() => {
    handleNewConnection()
  }, [connection, activePerson])

  const sendMessage = async (message: string) => {
    try {
      await connection?.invoke(
        'SendMessage',
        myid,
        activePerson?.userId,
        message
      )
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      {(isWaiting && !connection) || !people ? (
        <Waitingroom joinChatRoom={joinChatRoom} />
      ) : (
        <Chatroom
          people={people}
          messages={messages}
          sendMessage={sendMessage}
        />
      )}
    </>
  )
}
