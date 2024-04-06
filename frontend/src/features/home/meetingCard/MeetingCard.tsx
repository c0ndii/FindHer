import { Card, Avatar, Text } from '@mantine/core'
import { meetingModel } from '../../../pages/users/schema'

type Props = {
  meeting: meetingModel
}

export const MeetingCard = ({ meeting }: Props) => {
  return (
    <Card shadow="sm" padding="xl" style={{ minWidth: '600px' }}>
      <Card.Section>
        <Avatar src="" size={90} radius="xl" alt="avatar" />
      </Card.Section>
      <Text fw={500} size="lg" mt="md">
        {meeting.meetingName}
      </Text>

      <Text mt="xs" c="dimmed" size="sm">
        {meeting.meetingPlace}: {meeting.meetingDate}
      </Text>
    </Card>
  )
}
