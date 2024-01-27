import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core'
import { useForm } from '@mantine/form'

export const Sendmessageform = ({ sendMessage }: any) => {
  const form = useForm({
    initialValues: {
      message: '',
    },
  })

  return (
    <Box>
      <form
        onSubmit={form.onSubmit((values) => {
          sendMessage(values.message)
        })}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '5px',
        }}
      >
        <Group>
          <TextInput
            width={'auto'}
            placeholder="message"
            {...form.getInputProps('message')}
          />
          <Button
            disabled={form.values.message.length === 0}
            color="red"
            type="submit"
          >
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  )
}
