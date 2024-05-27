import {
  Button,
  Group,
  Text,
  Modal,
  Box,
  Chip,
  Tooltip,
  rem,
  Stack,
  Flex,
  Textarea,
  Center,
} from '@mantine/core'
import { useForm } from 'react-hook-form'
import { useDisclosure } from '@mantine/hooks'
import { Card, Image } from '@mantine/core'
import { personModel } from '../../../api/Match/schema'
import { SocialMedia } from '../../account/socialMedia'
import { IconCheck, IconX } from '@tabler/icons-react'
import { t } from 'i18next'
import { useCancelUser } from '../../../api/Match/Cancel'
import { useAddToPair } from '../../../api/Match/AddPair'

type Props = {
  person: personModel
}

export const EachUserCard = ({ person }: Props) => {
  const [opened, { open, close }] = useDisclosure(false)
  const { handleSubmit } = useForm({})
  const { mutateAsync: cancelUser } = useCancelUser()
  const { mutateAsync: addToPair } = useAddToPair()
  const onSubmit = async () => {
    try {
    } catch (error: any) {}
  }
  return (
    <>
      <Button onClick={open} color="red" fullWidth mt="md" radius="md">
        {t('home.matches.details.title')}
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        centered
        radius="lg"
        size="xl"
        padding={rem(16)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex h={rem(160)} gap="lg">
            <Image
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
              height={160}
              alt={person.image}
              style={{
                border: '1px solid lightGray',
                borderRadius: '10px',
              }}
            />
            <Stack w="75%">
              <Text fw={700} size="xl" tt="capitalize">
                {person.name}
              </Text>
              <Box
                h="100%"
                w="100%"
                style={{
                  border: '1px solid lightGray',
                  borderRadius: '10px',
                  padding: '10px',
                }}
              >
                <Text
                  h="100%"
                  style={{ overflowWrap: 'break-word' }}
                  lineClamp={3}
                >
                  {person.description}
                </Text>
              </Box>
            </Stack>
          </Flex>
          <SocialMedia />
          <Group
            style={{ flexGrow: 1 }}
            w="80%"
            mx="auto"
            align="center"
            justify="center"
          >
            {person.interests.map((interest) => (
              <Chip checked={false} color="red" variant="light" size="xs">
                {interest.name}
              </Chip>
            ))}
          </Group>
          <Group mt="lg" justify="space-evenly">
            <Tooltip label={t('home.matches.details.unmatchHover')}>
              <Button
                leftSection={<IconX />}
                color="red"
                w={rem(200)}
                radius="md"
                style={{ height: '50px' }}
                onClick={() => {
                  cancelUser(person.userId)
                  close()
                }}
              >
                {t('home.matches.details.unmatchButton')}
              </Button>
            </Tooltip>
            <Tooltip
              label={`${t('home.matches.details.pairHover')} ${person.name}`}
            >
              <Button
                leftSection={<IconCheck />}
                color="green"
                w={rem(200)}
                radius="md"
                style={{ height: '50px' }}
                onClick={() => {
                  addToPair(person.userId)
                  close()
                }}
              >
                {t('home.matches.details.pairButton')}
              </Button>
            </Tooltip>
          </Group>
        </form>
      </Modal>
    </>
  )
}
