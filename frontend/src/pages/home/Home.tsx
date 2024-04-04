import { Grid, GridCol, rem, Tabs, Box } from '@mantine/core'
import { useMatched } from '../../api/Match/ForYou'
import { UserCard } from '../../features/home/userCard'
import { EachUserCard } from '../../features/home/userCard/EachUserCard'
import { IconHeart, IconMasksTheater } from '@tabler/icons-react'
import { usePairs } from '../../api/Pair/GetPairs'
import { BlockUserCard } from '../users/BlockUserCard'

export const Home = () => {
  const { data: people } = useMatched()
  const { data: pairs } = usePairs()

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
                  </UserCard>
                </GridCol>
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
