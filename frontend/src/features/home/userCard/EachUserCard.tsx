import { Button, Group, Text, Modal, Box, Chip } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { useDisclosure } from '@mantine/hooks'
import { Card, Image } from '@mantine/core'
import { personModel } from '../../../api/ForYou/schema'
import { SocialMedia } from '../../account/socialMedia'
import { IconCheck, IconX } from '@tabler/icons-react'
import { t } from 'i18next'
import { blockUser } from '../../../api/User/BlockUser'

type Props = {
  person: personModel
}

export const EachUserCard = ({ person }: Props) => {
  const [opened, { open, close }] = useDisclosure(false)
  const { handleSubmit } = useForm({})
  const onSubmit = async () => {
    try {
    } catch (error: any) {}
  }
  return (
    <>
      <Button onClick={open} color="red" fullWidth mt="md" radius="md">
        {t('home.details')}
      </Button>
      <Modal opened={opened} onClose={close} size={'55%'} centered padding={0}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card padding="xl" radius="md">
            <Card.Section
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                paddingBottom: '20px',
              }}
            >
              <Group
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth: '40%',
                }}
              >
                <Image
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                  height={160}
                  alt={person.image}
                  style={{
                    border: '1px solid lightGray',
                    borderRadius: '10px',
                  }}
                />
                <Text fw={700} size="xl" tt="capitalize">
                  {person.name}
                </Text>
              </Group>
              <Group
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth: '60%',
                }}
              >
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid lightGray',
                    borderRadius: '10px',
                    padding: '10px',
                  }}
                >
                  <Text size="sm" style={{ paddingBottom: '40px' }}>
                    {person.description}
                  </Text>
                  <SocialMedia />
                </Box>
                <Box>
                  <Box
                    display={'flex'}
                    style={{
                      gap: '5px',
                      flexWrap: 'wrap',
                    }}
                  >
                    {person.interests.map((interest) => (
                      <Chip
                        checked={false}
                        color="red"
                        variant="light"
                        size="xs"
                      >
                        {interest.name}
                      </Chip>
                    ))}
                    <Chip checked={false} color="red" variant="light" size="xs">
                      Sushi
                    </Chip>
                    <Chip checked={false} color="red" variant="light" size="xs">
                      Auta
                    </Chip>
                    <Chip checked={false} color="red" variant="light" size="xs">
                      Sport
                    </Chip>
                    <Chip checked={false} color="red" variant="light" size="xs">
                      Telewizor
                    </Chip>
                    <Chip checked={false} color="red" variant="light" size="xs">
                      Książki
                    </Chip>
                    <Chip checked={false} color="red" variant="light" size="xs">
                      Badminton
                    </Chip>
                    <Chip checked={false} color="red" variant="light" size="xs">
                      Kasyno
                    </Chip>
                  </Box>
                </Box>
              </Group>
            </Card.Section>
          </Card>
          <Group>
            <Box
              display={'flex'}
              style={{ width: '100vw', overflow: 'hidden', height: '50px' }}
            >
              <Button
                color="red"
                fullWidth
                radius={0}
                style={{ height: '50px' }}
                onClick={() => {
                  blockUser(person.userId)
                  close()
                }}
              >
                <IconX />
              </Button>
              <Button
                color="green"
                fullWidth
                radius={0}
                style={{ height: '50px' }}
              >
                <IconCheck />
              </Button>
            </Box>
          </Group>
        </form>
      </Modal>
    </>
  )
}
