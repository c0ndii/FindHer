import { Button, Modal, rem } from '@mantine/core'
import '@mantine/dates/styles.css'
import { personModel } from '../../api/Match/schema'
import { useDisclosure } from '@mantine/hooks'
import { IconCalendar } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { MeetingForm } from './MeetingForm'
import { meetingModel } from './schema'
import { useCreateMeeting } from '../../api/Meeting/Create'

type Props = {
  person: personModel
}

export const MeetingModal = ({ person }: Props) => {
  const { mutateAsync: createMeeting } = useCreateMeeting()
  const [opened, { open, close }] = useDisclosure(false)
  const { t, i18n } = useTranslation()
  const handleSubmit = (data: meetingModel) => {
    createMeeting(data)
    close()
  }

  return (
    <>
      <Button onClick={open} color="blue" fullWidth mt="md" radius="md">
        <IconCalendar />
        {t('home.pairs.meetingButton.text')}
      </Button>
      <Modal
        size="md"
        radius="lg"
        opened={opened}
        onClose={close}
        centered
        padding={rem(16)}
      >
        <MeetingForm id={person.userId} handleSubmit={handleSubmit} />
      </Modal>
    </>
  )
}
