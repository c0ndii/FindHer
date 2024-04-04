import { Grid, GridCol, rem } from '@mantine/core'
import { useMatched } from '../../api/Match/ForYou'
import { UserCard } from '../../features/home/userCard'
import { EachUserCard } from '../../features/home/userCard/EachUserCard'

export const Home = () => {
  const { data: people } = useMatched()

  return (
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
  )
}
