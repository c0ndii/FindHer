import { Button, Flex, Group, TextInput, Text } from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { isNotEmpty, useForm } from '@mantine/form'
import { IconCheck } from '@tabler/icons-react'
import { format } from 'date-fns'
import { t } from 'i18next'
import { useCreateMeeting } from '../../api/Meeting/Create'
import { meetingModel } from './schema'

export interface props {}

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60 * 1000)
}

interface MeetingFormProps {
  id: number
  handleSubmit: (values: meetingModel) => void
}

interface FormProps {
  id: number
  name: string
  place: string
  date: Date | null
}

export const MeetingForm = ({ id, handleSubmit }: MeetingFormProps) => {
  
  const form = useForm<FormProps, (values: FormProps) => meetingModel>({
    initialValues: {
      name: '',
      place: '',
      date: null,
      id: id,
    },

    validate: {
      name: isNotEmpty('Name cannot be empty'),
      place: isNotEmpty('Place cannot be empty'),
      date: (value) => {
        if (!value) return 'Date cannot be empty'

        const currentDate = new Date()
        const futureDate = addMinutes(currentDate, 15)

        if (value < futureDate) {
          return 'Date must be at least 15 minutes in the future'
        }
      },
    },
    transformValues: (values: FormProps): meetingModel => ({
      meetingName: values.name,
      meetingPlace: values.place,
      meetingDate: values.date!.toISOString(),
      userId: values.id,
    }),
  })

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex
        w="100%"
        justify="center"
        align="start"
        direction="column"
        mih="320px" // Adjust min-height based on your content needs
        style={{
          gap: '20px', // Provides consistent spacing between form elements
        }}
      >
        <Text mx="auto" size="xl">
          {t('home.pairs.meetingButton.modalTitle')}
        </Text>
        <Group mx="auto" w="80%">
          <TextInput
            w="100%"
            label={t('home.pairs.meetingButton.name')}
            placeholder={t('home.pairs.meetingButton.namePlaceholder')}
            {...form.getInputProps('name')}
          />
          <TextInput
            w="100%"
            label={t('home.pairs.meetingButton.place')}
            placeholder={t('home.pairs.meetingButton.placePlaceholder')}
            {...form.getInputProps('place')}
          />
          <DateTimePicker
            w="100%"
            valueFormat="DD MMM YYYY hh:mm A"
            label={t('home.pairs.meetingButton.date')}
            placeholder={format(new Date(), 'dd MMM yyy hh:mm a')}
            {...form.getInputProps('date')}
            minDate={new Date()}
          />

          <Button
            mx="auto"
            px="lg"
            leftSection={<IconCheck stroke={2} />}
            mt="lg"
            color="green"
            radius="md"
            style={{ height: '50px' }}
            type="submit"
          >
            <Text size="lg">{t('home.pairs.meetingButton.confirmButton')}</Text>
          </Button>
        </Group>
      </Flex>
    </form>
  )
}
