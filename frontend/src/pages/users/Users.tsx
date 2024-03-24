import { Grid, Container, GridCol, rem } from '@mantine/core'
import { getForYou } from '../../api/ForYou/ForYou'
import { useEffect, useState } from 'react'
import { personModel } from '../../api/ForYou/schema'
import { UserCard } from '../../features/home/userCard'
import { t } from 'i18next'
import api from '../../api/api'
import { getUsers } from '../../api/User/getUsers'
import { BanUserCard } from './BanUserCard'

export const Users = () => {
  const [people, setPeople] = useState<personModel[]>([])

  const fetchProfiles = async () => {
    try {
      const response = await getUsers()
      setPeople(response.data as personModel[])
    } catch (error) {
      console.error(t('home.fetchFailMessage'), error)
    }
  }

  useEffect(() => {
    fetchProfiles()
  }, [])

  return (
    <Grid mt={rem(48)}>
      {people.map((user) => (
        <GridCol span={4}>
          <UserCard person={user}>
            <BanUserCard person={user} />
          </UserCard>
        </GridCol>
      ))}
    </Grid>
  )
}
