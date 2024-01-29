import {
  Avatar,
  Box,
  Divider,
  Flex,
  Group,
  Select,
  Stack,
  Text,
  rem,
} from '@mantine/core'
import { personModel } from '../../api/ForYou/schema'
import { useChatContext } from './ChatContext'
import { IconSearch } from '@tabler/icons-react'
import classes from './UsersSideBar.module.css'
import { Dispatch, SetStateAction, useState } from 'react'

interface Props {
  people: personModel[]
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

export const UsersSidebar = ({ people }: Props) => {
  const { activePerson, setActivePerson } = useChatContext()
  const [filteredPeople, setFilteredPeople] = useState<personModel[]>(people)

  const handleUserClick = (person: personModel) => {
    setActivePerson(person)
  }

  return (
    <Flex
      p={rem(24)}
      direction="column"
      gap={rem(40)}
      justify="start"
      style={{ border: '1px solid aqua' }}
      mih="100%"
    >
      <Select
        mt={rem(64)}
        searchable
        onSearchChange={(value) =>
          onSearchChange(value, people, setFilteredPeople)
        }
        leftSectionPointerEvents="none"
        leftSection={<IconSearch size="24px" color="black" />}
        rightSectionWidth={0}
        styles={{
          input: {
            backgroundColor: '#E0E0E0',
            border: 'none',
          },
        }}
      />
      <Stack gap={20} align="center" h={'100%'}>
        {filteredPeople.map((person) => (
          <Stack key={person.userId} style={{ width: '300px' }}>
            <Flex
              direction="column"
              style={{
                width: '300px',
                height: '100px',
                borderBlock: 'red',
                cursor: 'pointer',
                backgroundColor:
                  person.userId === activePerson?.userId
                    ? 'rgb(224, 224, 224)'
                    : 'white',
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
          </Stack>
        ))}
      </Stack>
    </Flex>
  )
}
