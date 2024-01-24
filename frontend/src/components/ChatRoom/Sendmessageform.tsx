import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core'
import { useForm } from '@mantine/form'

export const Sendmessageform = ({ sendMessage }: any) => {
  const form = useForm({
    initialValues: {
      message: '',
    },
  })

  return (
    <Box maw={340} mx="auto">
      <form
        onSubmit={form.onSubmit((values) => {
          sendMessage(values.message)
        })}
      >
        <TextInput
          label="text"
          placeholder="message"
          {...form.getInputProps('message')}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  )
}
