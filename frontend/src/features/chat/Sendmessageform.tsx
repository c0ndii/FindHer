import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core'
import { useForm } from '@mantine/form'
import { t } from 'i18next'

type Props = {
  sendMessage: (message: string) => void
}

export const Sendmessageform = ({ sendMessage }: Props) => {
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
            placeholder={t('chat.messagePlaceholder')}
            {...form.getInputProps('message')}
          />
          <Button
            disabled={form.values.message.length === 0}
            color="red"
            type="submit"
          >
            {t('chat.sendButton')}
          </Button>
        </Group>
      </form>
    </Box>
  )
}
