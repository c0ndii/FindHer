import {
  Button,
  Card,
  Group,
  Modal,
  Box,
  TextInput,
  Text,
  Flex,
  rem,
} from '@mantine/core'
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
      <Modal
        size="md"
        radius="lg"
        opened={opened}
        onClose={close}
        centered
        padding={rem(16)}
      >
        <form onSubmit={form.handleSubmit(onSubmit)} {...form}>
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
              Create meeting
            </Text>
            <Group mx="auto" w="80%">
              <TextInput
                w="100%"
                label={'Name'}
                placeholder={'Meeting name'}
                {...form.register('meetingName')}
                error={form.formState.errors.meetingName?.message}
              />
              <TextInput
                w="100%"
                label={'Place'}
                placeholder={'Meeting place'}
                {...form.register('meetingPlace')}
                error={form.formState.errors.meetingPlace?.message}
              />
              <DateTimePicker
                w="100%"
                label={'Date'}
                placeholder={format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'")}
                value={date}
                onChange={setDate}
                minDate={new Date()}
              />

              <Button
                mx="auto"
                px="lg"
                leftSection={<IconCheck stroke={2} />}
                mt="lg"
                color="green"
                radius={2.5}
                style={{ height: '50px' }}
                type="submit"
              >
                <Text size="lg">Create</Text>
              </Button>
            </Group>
          </Flex>
        </form>
      </Modal>
    </>
  )
}
