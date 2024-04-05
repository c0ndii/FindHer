import { Button, Card, Group, Modal, Box, TextInput, Text } from '@mantine/core'
import { DatePicker, DateTimePicker } from '@mantine/dates'
import '@mantine/dates/styles.css'
import { personModel } from '../../api/Match/schema'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from 'react-hook-form'
import { IconCheck, IconX, IconCalendar } from '@tabler/icons-react'
import { meetingModel, meetingSchema } from './schema'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateMeeting } from '../../api/Meeting/Create'
import { format } from 'date-fns'

type Props = {
  person: personModel
}

export const MeetingModal = ({ person }: Props) => {
  const [opened, { open, close }] = useDisclosure(false)
  const [date, setDate] = useState<Date | null>()
  const { mutateAsync: createMeeting } = useCreateMeeting()
  const form = useForm<meetingModel>({
    defaultValues: {
      userId: person.userId,
    },
    resolver: zodResolver(meetingSchema),
  })
  const onSubmit = async (data: meetingModel) => {
    try {
      close()
      createMeeting(data)
    } catch (error: any) {}
  }

  useEffect(() => {
    form.setValue(
      'meetingDate',
      date
        ? format(new Date(date), "yyyy-MM-dd'T'HH:mm:ss'Z'")
        : format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'")
    )
  }, [date])

  return (
    <>
      <Button onClick={open} color="blue" fullWidth mt="md" radius="md">
        <IconCalendar />
        Meeting
      </Button>
      <Modal opened={opened} onClose={close} size={'25%'} centered padding={0}>
        <form onSubmit={form.handleSubmit(onSubmit)} {...form}>
          <Card padding="xl" radius="md">
            <Card.Section
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                flexDirection: 'column',
                gap: 25,
                padding: 20,
                marginBottom: 5,
              }}
            >
              <Text size="xl">Create meeting</Text>
              <TextInput
                label={'Name'}
                placeholder={'Meeting name'}
                {...form.register('meetingName')}
                error={form.formState.errors.meetingName?.message}
              />
              <TextInput
                label={'Place'}
                placeholder={'Meeting place'}
                {...form.register('meetingPlace')}
                error={form.formState.errors.meetingPlace?.message}
              />
              <Box>
                <DateTimePicker
                  label={'Date'}
                  placeholder={format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'")}
                  value={date}
                  onChange={setDate}
                  minDate={new Date()}
                />
              </Box>
            </Card.Section>
          </Card>
          <Group>
            <Box
              display={'flex'}
              style={{
                width: '100vw',
                overflow: 'hidden',
                height: '50px',
              }}
            >
              <Button
                color="red"
                fullWidth
                radius={0}
                style={{ height: '50px' }}
                onClick={() => {
                  close()
                }}
              >
                <IconX />
              </Button>
              <Button
                color="green"
                fullWidth
                radius={0}
                style={{ height: '50px' }}
                type="submit"
              >
                <IconCheck />
              </Button>
            </Box>
          </Group>
        </form>
      </Modal>
    </>
  )
}
