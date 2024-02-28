import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  Avatar,
  Text,
  Flex,
  rem,
  Select,
  Title,
  Divider,
} from '@mantine/core'
import { Messagecontainer } from './Messagecontainer'
import { Sendmessageform } from './Sendmessageform'
import { UsersSidebar } from './UsersSidebar'
import { useState } from 'react'
import { useChatContext } from './ChatContext'
import { personModel } from '../../api/ForYou/schema'
import { IconSearch } from '@tabler/icons-react'

type Props = {
  people: personModel[]
  messages: string[]
  sendMessage: (message: string) => void
}

export const Chatroom = ({ people, messages, sendMessage }: Props) => {
  const { activePerson, setActivePerson } = useChatContext()

  return (
    <Flex gap={rem(40)} h="100%">
      <UsersSidebar people={people} />
      <Flex
        direction="column"
        display={'flex'}
        p={rem(24)}
        style={{ gap: '40px', width: '100%' }}
      >
        <Flex direction="column">
          <Group mb="0" align="end">
            <Avatar src="" size={100} radius="xl" alt="avatar" />
            <Title style={{ marginLeft: '10px', fontSize: '2rem' }}>
              {activePerson?.name}
            </Title>
          </Group>
          <Divider mb="0" mt={rem(24)} />
        </Flex>
        <Messagecontainer messages={messages} />
        <Sendmessageform sendMessage={sendMessage} />
      </Flex>
    </Flex>
  )
}
