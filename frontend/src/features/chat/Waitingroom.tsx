import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  NumberInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'
import { getId } from '../../api/User/GetId'
import { t } from 'i18next'

export const Waitingroom = ({ joinChatRoom }: any) => {
  const [ownId, setOwnId] = useState<number>()

  const fetchId = async () => {
    try {
      const response = await getId()
      setOwnId(response.data as number)
    } catch (error) {
      throw new Error('Failed to fetch')
    }
  }

  useEffect(() => {
    fetchId()
  }, [])

  const form = useForm({
    initialValues: {
      username: ownId,
      username2: 0,
    },
  })

  useEffect(() => {
    form.setFieldValue('username', ownId)
  }, [ownId])

  return (
    <Box maw={340} mx="auto">
      <form
        onSubmit={form.onSubmit((values) => {
          joinChatRoom(values.username, values.username2)
        })}
      >
        <NumberInput
          label="Username"
          placeholder="username"
          {...form.getInputProps('username')}
        />
        <NumberInput
          label="Username2"
          placeholder="username"
          {...form.getInputProps('username2')}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit">{t('chat.sendButton')}</Button>
        </Group>
      </form>
    </Box>
  )
}
