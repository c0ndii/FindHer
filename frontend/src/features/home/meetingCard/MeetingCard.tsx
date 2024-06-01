import { Card, Avatar, Text, Box, Button } from '@mantine/core'
import { pendingMeeting } from '../../../api/Meeting/getPending'
import { IconCheck, IconX } from '@tabler/icons-react'
import { useAcceptMeeting } from '../../../api/Meeting/AcceptMeeting'
import { useDeclineMeeting } from '../../../api/Meeting/DeclineMeeting'
import { format } from 'date-fns'

type Props = {
  meeting: pendingMeeting
}

export const MeetingCard = ({ meeting }: Props) => {
  const { mutateAsync: decline } = useDeclineMeeting()
  const { mutateAsync: accept } = useAcceptMeeting()
  return (
    <Card shadow="sm" padding="lg" style={{ minWidth: '600px' }}>
      <Box
        display={'flex'}
        style={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Avatar src="" size={90} radius="xl" alt="avatar" />
        {meeting.canAccept && (
          <Box style={{ display: 'flex', gap: 5 }}>
            <Button
              color="red"
              size="lg"
              onClick={() => decline(meeting.meetingId)}
            >
              <IconX />
            </Button>
            <Button
              color="green"
              size="lg"
              onClick={() => accept(meeting.meetingId)}
            >
              <IconCheck />
            </Button>
          </Box>
        )}
      </Box>
      <Box>
        <Text fw={500} size="lg" mt="md">
          {meeting.meetingName}
        </Text>

        <Text mt="xs" c="dimmed" size="sm">
          {meeting.meetingPlace}:{' '}
          {format(new Date(meeting.meetingDate), 'dd/MM/yy hh:mm a')}
        </Text>
      </Box>
    </Card>
  )
}
