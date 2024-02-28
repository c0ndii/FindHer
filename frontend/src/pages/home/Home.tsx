import { Grid, Container, GridCol, rem } from '@mantine/core'
import { getForYou } from '../../api/ForYou/ForYou'
import { useEffect, useState } from 'react'
import { personModel } from '../../api/ForYou/schema'
import { UserCard } from '../../features/home/userCard'

export const Home = () => {
  const [people, setPeople] = useState<personModel[]>([])

  const fetchProfiles = async () => {
    try {
      const response = await getForYou()
      setPeople(response.data as personModel[])
    } catch (error) {
      console.error('Failed to fetch questions', error)
    }
  }

  useEffect(() => {
    fetchProfiles()
  }, [])

  return (
    <Grid mt={rem(48)}>
      {people.map((user) => (
        <GridCol>
          <UserCard person={user} />
        </GridCol>
      ))}
    </Grid>
  )
}
