import { Avatar, Box, Stack } from '@mantine/core'
import { personModel } from '../../api/ForYou/schema'
import { useChatContext } from './ChatContext'

interface Props {
  people: personModel[]
}

export const UsersSidebar = ({ people }: Props) => {
  const { activePerson, setActivePerson } = useChatContext()

  const handleUserClick = (person: personModel) => {
    setActivePerson(person)
  }

  return (
    <Box>
      <Stack justify="center" gap={20} align="center" h={'100%'}>
        {people.map((person) => (
          <Stack key={person.userId} style={{ width: '300px' }}>
            <Box
              style={{
                width: '300px',
                height: '100px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                cursor: 'pointer',
                overflow: 'hidden',
                backgroundColor:
                  person.userId === activePerson?.userId
                    ? 'lightgray'
                    : 'white',
              }}
              onClick={() => handleUserClick(person)}
            >
              <Box
                display={'flex'}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px',
                }}
              >
                <Avatar src="" size={50} radius="xl" alt="avatar" />
                <p style={{ marginLeft: '10px' }}>{person.name}</p>
              </Box>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Box>
  )
}
