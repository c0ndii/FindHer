import { Button, Group, Text, Modal, Box, Tooltip } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { useDisclosure } from '@mantine/hooks'
import { Card } from '@mantine/core'
import { IconCheck, IconX, IconLock } from '@tabler/icons-react'
import { t } from 'i18next'
import { personModel } from '../../api/Match/schema'
import { useBlockUser } from '../../api/Pair/BlockUser'

type Props = {
  person: personModel
}

export const BlockUserCard = ({ person }: Props) => {
  const [opened, { open, close }] = useDisclosure(false)
  const { mutateAsync: blockUser } = useBlockUser()
  const { handleSubmit } = useForm({})
  const onSubmit = async () => {
    try {
    } catch (error: any) {}
  }
  return (
    <>
      <Button onClick={open} color="red" mt="md" radius="md">
        <IconLock />
      </Button>
      <Modal opened={opened} onClose={close} size={'25%'} centered padding={0}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card padding="xl" radius="md">
            <Card.Section
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <Text size={'xl'}>Are you sure to block {person.name}?</Text>
            </Card.Section>
          </Card>
          <Group>
            <Box
              display={'flex'}
              style={{ width: '100vw', overflow: 'hidden', height: '50px' }}
            >
              <Tooltip label="Cancel">
                <Button
                  color="red"
                  fullWidth
                  radius={0}
                  style={{ height: '50px' }}
                  onClick={() => {
                    close()
                  }}
                >
                  <IconX />
                </Button>
              </Tooltip>
              <Tooltip label={`Block ${person.name}`}>
                <Button
                  color="green"
                  fullWidth
                  radius={0}
                  style={{ height: '50px' }}
                  onClick={() => {
                    blockUser(person.userId)
                    close()
                  }}
                >
                  <IconCheck />
                </Button>
              </Tooltip>
            </Box>
          </Group>
        </form>
      </Modal>
    </>
  )
}
