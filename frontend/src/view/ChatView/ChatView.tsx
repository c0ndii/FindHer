import { useCallback, useEffect, useState } from 'react'
import { Chatroom, Waitingroom } from '../../components/ChatRoom'
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr'
import { getId } from '../../api/User/GetId'
import Cookies from 'js-cookie'
import { personModel } from '../../api/ForYou/schema'
import { getForYou } from '../../api/ForYou/ForYou'
import {
  ChatProvider,
  useChatContext,
} from '../../components/ChatRoom/ChatContext'

type History = {
  senderId: number
  receiverId: number
  content: string
  sendTime: Date
}

export const ChatView = () => {
  const [myid, setmyid] = useState<number>()
  //const [receiverid, setreceiverid] = useState<number>()
  const [connection, setConnection] = useState<HubConnection>()
  const [messages, setMessages] = useState<any[]>([])
  const { activePerson, setActivePerson } = useChatContext()

  //TODO : Change forYou api to matched users api
  const [people, setPeople] = useState<personModel[]>([])
  const [isWaiting, setIsWaiting] = useState<boolean>(true)

  const fetchProfiles = async () => {
    try {
      const response = await getForYou()
      const responseId = await getId()
      setmyid(responseId.data)
      setPeople(response.data)
      setActivePerson(response.data[0])
      setIsWaiting(false)
    } catch (error) {
      console.error('Failed to load data', error)
    }
  }

  useEffect(() => {
    fetchProfiles()
    if (myid !== undefined && activePerson?.userId !== undefined) {
      joinChatRoom(myid, activePerson?.userId)
    }
  }, [myid])
  // END OF TODO

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
      {isWaiting && !connection ? (
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
