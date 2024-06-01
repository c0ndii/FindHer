import { Button, Group, Text, Modal, Box, Chip, rem, Flex } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { useDisclosure } from '@mantine/hooks'
import { Card } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons-react'
import { t } from 'i18next'
import { personModel } from '../../api/Match/schema'
import { useBanUser } from '../../api/Admin/BanUser'

type Props = {
  person: personModel
}

export const BanUserCard = ({ person }: Props) => {
  const [opened, { open, close }] = useDisclosure(false)
  const { mutateAsync: banUser } = useBanUser()
  const { handleSubmit } = useForm({})
  const onSubmit = async () => {
    try {
    } catch (error: any) {}
  }
  return (
    <>
      <Button onClick={open} color="red" fullWidth mt="md" radius="md">
        {t('users.buttonText')}
      </Button>
      <Modal opened={opened} onClose={close} size={'25%'} centered padding={0}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex
            justify="center"
            align="center"
            direction="column"
            mih={rem(160)}
            style={{
              textAlign: 'center',
            }}
          >
            <Text ta="center" size={'xl'}>
              {t('users.confirmQuestion')}
            </Text>
            <Button
              px="xl"
              mt={rem(16)}
              leftSection={<IconX stroke={2} />}
              color="red"
              radius="md"
              style={{ height: '50px' }}
              onClick={() => {
                banUser(person.userId)
                close()
              }}
            >
              <Text size="lg">{t('home.pairs.banButton.text')} </Text>
            </Button>
          </Flex>
        </form>
      </Modal>
    </>
  )
}
