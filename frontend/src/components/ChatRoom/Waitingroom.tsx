import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core'
import { useForm } from '@mantine/form'

export const Waitingroom = ({ joinChatRoom }: any) => {
  const form = useForm({
    initialValues: {
      username: '',
      chatroom: '',
    },
  })

  return (
    <Box maw={340} mx="auto">
      <form
        onSubmit={form.onSubmit((values) => {
          joinChatRoom(values.username, values.chatroom)
        })}
      >
        <TextInput
          label="Username"
          placeholder="username"
          {...form.getInputProps('username')}
        />
        <TextInput
          label="Chatroom"
          placeholder="chatroom"
          {...form.getInputProps('chatroom')}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  )
}
