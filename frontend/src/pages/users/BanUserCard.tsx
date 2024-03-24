import { Button, Group, Text, Modal, Box, Chip } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { useDisclosure } from '@mantine/hooks'
import { Card, Image } from '@mantine/core'

import { IconCheck, IconX } from '@tabler/icons-react'
import { t } from 'i18next'
import { personModel } from '../../api/ForYou/schema'
import { banUser } from '../../api/User/BanUser'

type Props = {
  person: personModel
}

export const BanUserCard = ({ person }: Props) => {
  const [opened, { open, close }] = useDisclosure(false)
  const { handleSubmit } = useForm({})
  const onSubmit = async () => {
    try {
    } catch (error: any) {}
  }
  return (
    <>
      <Button onClick={open} color="red" fullWidth mt="md" radius="md">
        {t('home.ban')}
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
              <Text size={'xl'}>Are you sure?</Text>
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
                onClick={() => {
                  banUser(person.userId)
                  close()
                }}
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
