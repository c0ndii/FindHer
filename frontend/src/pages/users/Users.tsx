import { Grid, GridCol, rem, Center } from '@mantine/core'
import { UserCard } from '../../features/home/userCard'
import { useUsers } from '../../api/Admin/getUsers'
import { BanUserCard } from './BanUserCard'

export const Users = () => {
  const { data: people } = useUsers()

  return (
    <Grid
      //      gap={{ lg: rem(80), base: rem(20) }}
      gutter="lg"
      w="80%"
      mx="auto"
      mt={{ lg: rem(40), base: rem(10) }}
      columns={16}
    >
      {people ? (
        people.map((user : any) => (
          <GridCol span={{ lg: 7, xl: 5, base: 8 }} mih="400px" miw="400px">
            <Center>
              <UserCard person={user}>
                <BanUserCard person={user} />
              </UserCard>
            </Center>
          </GridCol>
        ))
      ) : (
        <></>
      )}
    </Grid>
  )
}
