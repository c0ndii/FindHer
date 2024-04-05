import { Card, Image, Text } from '@mantine/core'
import { meetingModel } from '../../../pages/users/schema'

type Props = {
  meeting: meetingModel
}

export const MeetingCard = ({ meeting }: Props) => {
  return (
    <Card shadow="sm" padding="xl">
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
          h={160}
          alt="No way!"
        />
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
