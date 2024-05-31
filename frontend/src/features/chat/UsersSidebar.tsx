import {
  Avatar,
  Box,
  Burger,
  Divider,
  Flex,
  Group,
  Paper,
  Select,
  Stack,
  Text,
  rem,
} from '@mantine/core'
import { personModel } from '../../api/Match/schema'
import { useChatContext } from './ChatContext'
import { IconSearch } from '@tabler/icons-react'
import classes from './UsersSideBar.module.css'
import { Dispatch, SetStateAction, useState } from 'react'
import { useDisclosure } from '@mantine/hooks'

interface Props {
  people: personModel[]
  visible: boolean
}

const onSearchChange = (
  value: string,
  data: personModel[],
  setData: Dispatch<SetStateAction<personModel[]>>
) => {
  if (value.trim().length == 0) {
    setData(data)
  } else {
    var filteredData = data.filter((d) => d.name.includes(value))
    setData(filteredData)
  }
}

export const UsersSidebar = ({ people, visible }: Props) => {
  const { activePerson, setActivePerson } = useChatContext()
  const [filteredPeople, setFilteredPeople] = useState<personModel[]>(people)

  const handleUserClick = (person: personModel) => {
    setActivePerson(person)
  }

  return (
    <Flex
      hidden={!visible}
      p={rem(24)}
      direction="column"
      gap={rem(40)}
      justify="start"
      mih="100%"
    >
      <Paper>
        <Select
          mt={rem(64)}
          searchable
          onSearchChange={(value) =>
            onSearchChange(value, people, setFilteredPeople)
          }
          leftSectionPointerEvents="none"
          leftSection={<IconSearch size="24px" />}
          rightSectionWidth={0}
          styles={{
            input: {
              border: 'none',
            },
          }}
          style={{ minWidth: '300px' }}
        />
      </Paper>
      <Stack gap={20} align="center" h={'100%'}>
        {filteredPeople.map((person) => (
          <Stack key={person.userId} style={{ minWidth: '300px' }}>
            <Paper bg={person.userId === activePerson?.userId ? 'gray' : ''}>
              <Flex
                direction="column"
                style={{
                  minWidth: '300px',
                  height: '100px',
                  borderBlock: 'red',
                  cursor: 'pointer',
                }}
                onClick={() => handleUserClick(person)}
              >
                <Group ml={rem(16)} mt="auto" mb={rem(16)} align="end">
                  <Avatar src="" size={50} radius="xl" alt="avatar" />
                  <Text fw={700} size="xl">
                    {person.name}
                  </Text>
                </Group>
                <Divider mb="0" size="md" c="darkgray" />
              </Flex>
            </Paper>
          </Stack>
        ))}
      </Stack>
    </Flex>
  )
}
