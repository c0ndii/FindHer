import { Grid, Container, GridCol, rem, Flex, Center } from '@mantine/core'
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
    <Grid
      //      gap={{ lg: rem(80), base: rem(20) }}
      gutter="lg"
      w="80%"
      mx="auto"
      mt={{ lg: rem(40), base: rem(10) }}
      columns={16}
    >
      {people.map((user) => (
        <GridCol span={{ lg: 7, xl: 5, base: 8 }} mih="400px" miw="400px">
          <Center>
            <UserCard person={user}>
              <BanUserCard person={user} />
            </UserCard>
          </Center>
        </GridCol>
      ))}
    </Grid>
  )
}
