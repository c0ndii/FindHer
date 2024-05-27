import { Button, Group, Text, Modal, Tooltip, Flex, rem } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { useDisclosure } from '@mantine/hooks'
import { IconCheck, IconX, IconLock, IconBan } from '@tabler/icons-react'
import { personModel } from '../../api/Match/schema'
import { useBlockUser } from '../../api/Pair/BlockUser'
import { useTranslation } from 'react-i18next'

type Props = {
  person: personModel
}

export const BlockUserCard = ({ person }: Props) => {
  const [opened, { open, close }] = useDisclosure(false)
  const { mutateAsync: blockUser } = useBlockUser()
  const { handleSubmit } = useForm({})
  const { t, i18n } = useTranslation()
  const onSubmit = async () => {
    try {
    } catch (error: any) {}
  }
  return (
    <>
      <Button onClick={open} color="red" mt="md" radius="md">
        <IconLock />
      </Button>
      <Modal
        size="md"
        radius="lg"
        opened={opened}
        onClose={close}
        centered
        padding={rem(16)}
      >
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
            <Text
              size="xl"
              style={{
                lineHeight: '2', // Adjust based on your font size
                maxWidth: '90%', // Keeps text from being too wide
              }}
            >
              {t('home.pairs.blockButton.confirmPopup')} {person.name}?
            </Text>
            <Tooltip
              label={`${t('home.pairs.blockButton.hover')} ${person.name}`}
            >
              <Button
                px="xl"
                mt={rem(16)}
                leftSection={<IconBan stroke={2} />}
                color="red"
                radius="md"
                style={{ height: '50px' }}
                onClick={() => {
                  blockUser(person.userId)
                  close()
                }}
              >
                <Text size="lg">{t('home.pairs.blockButton.text')} </Text>
              </Button>
            </Tooltip>
          </Flex>
        </form>
      </Modal>
    </>
  )
}
