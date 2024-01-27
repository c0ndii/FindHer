import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  Avatar,
  Text,
} from '@mantine/core'
import { Messagecontainer } from './Messagecontainer'
import { Sendmessageform } from './Sendmessageform'
import { UsersSidebar } from './UsersSidebar'
import { useState } from 'react'
import { useChatContext } from './ChatContext'
import { personModel } from '../../api/ForYou/schema'

type Props = {
  people: personModel[]
  messages: string[]
  sendMessage: (message: string) => void
}

export const Chatroom = ({ people, messages, sendMessage }: Props) => {
  const { activePerson, setActivePerson } = useChatContext()

  return (
    <Box display={'flex'} style={{ margin: 0 }}>
      {/* TODO: apply users sidebar */}
      <Box style={{ flexDirection: 'column', gap: '40px' }}>
        <UsersSidebar people={people} />
      </Box>
      <Box
        display={'flex'}
        style={{ flexDirection: 'column', gap: '40px', width: '100%' }}
      >
        {/* TODO: apply top chat view => change it to another component (use useChatContext for active user info ) */}
        <Box
          display={'flex'}
          style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            padding: '10px',
            borderBottom: '1px solid lightgray',
          }}
        >
          <Avatar src="" size={100} radius="xl" alt="avatar" />
          <Text style={{ marginLeft: '10px', fontSize: '2rem' }}>
            {activePerson?.name}
          </Text>
        </Box>
        <Messagecontainer messages={messages} />
        <Sendmessageform sendMessage={sendMessage} />
      </Box>
    </Box>
  )
}
