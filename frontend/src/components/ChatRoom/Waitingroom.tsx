import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  NumberInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'

export const Waitingroom = ({ joinChatRoom }: any) => {
  const form = useForm({
    initialValues: {
      username: 0,
    },
  })

  return (
    <Box maw={340} mx="auto">
      <form
        onSubmit={form.onSubmit((values) => {
          joinChatRoom(values.username)
        })}
      >
        <NumberInput
          label="Username"
          placeholder="username"
          {...form.getInputProps('username')}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  )
}
