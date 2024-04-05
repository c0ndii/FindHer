import { Grid, GridCol, rem, Tabs, Box, Stack } from '@mantine/core'
import { useMatched } from '../../api/Match/ForYou'
import { UserCard } from '../../features/home/userCard'
import { EachUserCard } from '../../features/home/userCard/EachUserCard'
import {
  IconHeart,
  IconMasksTheater,
  IconCalendarCheck,
  IconCalendarMinus,
} from '@tabler/icons-react'
import { usePairs } from '../../api/Pair/GetPairs'
import { BlockUserCard } from '../users/BlockUserCard'
import { MeetingModal } from '../users/MeetingModal'
import { useGetPending } from '../../api/Meeting/getPending'
import { MeetingCard } from '../../features/home/meetingCard'

export const Home = () => {
  const { data: people } = useMatched()
  const { data: pairs } = usePairs()
  const { data: pending } = useGetPending()

  return (
    <Box style={{ padding: 20 }}>
      <Tabs color="red" variant="default" defaultValue="Matches">
        <Tabs.List justify="center">
          <Tabs.Tab
            value="Matches"
            leftSection={<IconMasksTheater />}
            style={{ width: '20%' }}
          >
            Matches
          </Tabs.Tab>
          <Tabs.Tab
            value="Pairs"
            leftSection={<IconHeart />}
            style={{ width: '20%' }}
          >
            Pairs
          </Tabs.Tab>
          <Tabs.Tab
            value="Pending"
            leftSection={<IconCalendarMinus />}
            style={{ width: '20%' }}
          >
            Pending Meetings
          </Tabs.Tab>
          <Tabs.Tab
            value="Confirmed"
            leftSection={<IconCalendarCheck />}
            style={{ width: '20%' }}
          >
            Confirmed Meetings
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="Matches">
          <Grid mt={rem(48)}>
            {people ? (
              people.map((user) => (
                <GridCol span={4}>
                  <UserCard person={user}>
                    <EachUserCard person={user} />
                  </UserCard>
                </GridCol>
              ))
            ) : (
              <></>
            )}
          </Grid>
        </Tabs.Panel>
        <Tabs.Panel value="Pairs">
          <Grid mt={rem(48)}>
            {pairs ? (
              pairs.map((user) => (
                <GridCol span={4}>
                  <UserCard person={user}>
                    <BlockUserCard person={user} />
                    <MeetingModal person={user} />
                  </UserCard>
                </GridCol>
              ))
            ) : (
              <></>
            )}
          </Grid>
        </Tabs.Panel>
        <Tabs.Panel value="Pendings">
          <Grid mt={rem(48)}>
            {pending ? (
              pending.map((meeting) => (
                <Stack h={300}>
                  <MeetingCard meeting={meeting} />
                </Stack>
              ))
            ) : (
              <></>
            )}
          </Grid>
        </Tabs.Panel>
      </Tabs>
    </Box>
  )
}
