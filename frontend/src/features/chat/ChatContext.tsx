import React, { createContext, useContext, useState } from 'react'
import { personModel } from '../../api/Match/schema'

interface ChatContextProps {
  activePerson: personModel | null
  setActivePerson: React.Dispatch<React.SetStateAction<personModel | null>>
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined)

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activePerson, setActivePerson] = useState<personModel | null>(null)

  return (
    <ChatContext.Provider value={{ activePerson, setActivePerson }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChatContext = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider')
  }
  return context
}
