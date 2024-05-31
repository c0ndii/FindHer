import { Grid, GridCol, rem, Tabs, Box, Stack, Center, em } from '@mantine/core'
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
import { useGetAccepted } from '../../api/Meeting/getAccepted'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from '@mantine/hooks'

export const Home = () => {
  const { data: people } = useMatched()
  const { data: pairs } = usePairs()
  const { data: pending } = useGetPending()
  const { data: confirmed } = useGetAccepted()
  const { t, i18n } = useTranslation()
  const hideTabs = useMediaQuery(`(max-width: ${em(1100)})`)
  const xxs = useMediaQuery(`(max-width: ${em(576)})`)

  return (
    <Box style={{ padding: 20, height: '100%', overflowY: 'auto' }}>
      <Tabs color="red" variant="default" defaultValue="Matches">
        <Tabs.List justify="center">
          <Tabs.Tab
            value="Matches"
            leftSection={<IconMasksTheater />}
            style={{ width: '20%' }}
          >
            {!hideTabs && t('home.matches.title')}
          </Tabs.Tab>
          <Tabs.Tab
            value="Pairs"
            leftSection={<IconHeart />}
            style={{ width: '20%' }}
          >
            {!hideTabs && t('home.pairs.title')}
          </Tabs.Tab>
          <Tabs.Tab
            value="Pending"
            leftSection={<IconCalendarMinus />}
            style={{ width: '20%' }}
          >
            {!hideTabs && t('home.pendingMeetings.title')}
          </Tabs.Tab>
          <Tabs.Tab
            value="Confirmed"
            leftSection={<IconCalendarCheck />}
            style={{ width: '20%' }}
          >
            {!hideTabs && t('home.confirmedMeetings')}
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="Matches">
          <Grid
            mt={xxs ? 0 : rem(48)}
            gutter={{ xs: rem(48), lg: rem(72), xl: rem(96) }}
          >
            {people ? (
              people.map((user) => (
                <GridCol span={{ lg: 6, xl: 4 }} mt={xxs ? 24 : 0}>
                  <Center>
                    <UserCard person={user}>
                      <EachUserCard person={user} />
                    </UserCard>
                  </Center>
                </GridCol>
              ))
            ) : (
              <></>
            )}
          </Grid>
        </Tabs.Panel>
        <Tabs.Panel value="Pairs">
          <Grid
            mt={xxs ? 0 : rem(48)}
            gutter={{ xs: rem(48), lg: rem(72), xl: rem(96) }}
          >
            {pairs ? (
              pairs.map((user) => (
                <GridCol span={{ lg: 6, xl: 4 }} mt={xxs ? 24 : 0}>
                  <Center>
                    <UserCard person={user}>
                      <BlockUserCard person={user} />
                      <MeetingModal person={user} />
                    </UserCard>
                  </Center>
                </GridCol>
              ))
            ) : (
              <></>
            )}
          </Grid>
        </Tabs.Panel>
        <Tabs.Panel value="Pending">
          <Center>
            <Grid mt={rem(48)} gutter={48} columns={12}>
              {pending ? (
                pending.map((meeting) => (
                  <>
                    <Grid.Col span={{ xl: 6 }}>
                      <MeetingCard meeting={meeting} />
                    </Grid.Col>
                  </>
                ))
              ) : (
                <></>
              )}
            </Grid>
          </Center>
        </Tabs.Panel>

        <Tabs.Panel value="Confirmed">
          <Center>
            <Grid mt={rem(48)} gutter={48} columns={12}>
              {confirmed ? (
                confirmed.map((meeting) => (
                  <>
                    <Grid.Col span={{ xl: 6 }}>
                      <MeetingCard meeting={meeting} />
                    </Grid.Col>
                  </>
                ))
              ) : (
                <></>
              )}
            </Grid>
          </Center>
        </Tabs.Panel>
      </Tabs>
    </Box>
  )
}
