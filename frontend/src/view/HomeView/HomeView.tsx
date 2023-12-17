import { Grid, Container, GridCol } from '@mantine/core'
import { getForYou } from '../../api/ForYou/ForYou'
import { useEffect, useState } from 'react'
import { personModel } from '../../api/ForYou/schema'
import { UserCard } from '../../components/UserCard'

export const HomeView = () => {
  const [people, setPeople] = useState<personModel[]>([])

  const fetchProfiles = async () => {
    try {
      const response = await getForYou()
      console.log(response)
      setPeople(response.data as personModel[])
    } catch (error) {
      console.error('Failed to fetch questions', error)
    }
  }

  useEffect(() => {
    fetchProfiles()
  }, [])

  return (
    <Container my="xl" style={{ padding: 0, margin: 0 }}>
      <Grid>
        {people.map((user) => (
          <GridCol span={6}>
            <UserCard person={user} />
          </GridCol>
        ))}
      </Grid>
    </Container>
  )
}
