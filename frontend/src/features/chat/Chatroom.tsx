import {
  Group,
  Avatar,
  Flex,
  rem,
  Title,
  Divider,
  Indicator,
  ActionIcon,
  Burger,
  Drawer,
  Box,
} from '@mantine/core'
import { Messagecontainer } from './Messagecontainer'
import { Sendmessageform } from './Sendmessageform'
import { UsersSidebar } from './UsersSidebar'
import { useChatContext } from './ChatContext'
import { personModel } from '../../api/Match/schema'
import { IconCamera } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useRoomId } from '../../api/VideoChat/getRoomId'
import { useDisclosure } from '@mantine/hooks'

type Props = {
  people: personModel[]
  messages: string[]
  sendMessage: (message: string) => void
}

export const Chatroom = ({ people, messages, sendMessage }: Props) => {
  const { activePerson, setActivePerson } = useChatContext()
  const [opened, { toggle }] = useDisclosure()

  //const { data: roomId } = useRoomId(activePerson?.userId!)

  return (
    <Flex gap={rem(40)} h="100%">
      <Burger opened={opened} onClick={toggle} hiddenFrom="md" mt={rem(48)} />
      <Drawer onClose={toggle} opened={opened} hiddenFrom="md">
        <UsersSidebar people={people} visible={opened} />
      </Drawer>
      <Box visibleFrom="md">
        <UsersSidebar people={people} visible={opened} />
      </Box>
      <Flex
        direction="column"
        display={'flex'}
        p={rem(24)}
        style={{ gap: '40px', width: '100%' }}
      >
        <Flex direction="column" miw="400px">
          <Flex justify={'space-between'} align={'flex-end'}>
            <Group mb="0" align="end">
              <Avatar src="" size={100} radius="xl" alt="avatar" />
              <Title style={{ marginLeft: '10px', fontSize: '2rem' }}>
                {activePerson?.name}
              </Title>
            </Group>

            <ActionIcon
              variant="filled"
              color="red"
              size="xl"
              radius="xl"
              component={Link}
              to={`/app/VideoChat/${activePerson?.userId}`}
            >
              <IconCamera />
            </ActionIcon>
          </Flex>

          <Divider mb="0" mt={rem(24)} />
        </Flex>
        <Messagecontainer messages={messages} />
        <Sendmessageform sendMessage={sendMessage} />
      </Flex>
    </Flex>
  )
}
