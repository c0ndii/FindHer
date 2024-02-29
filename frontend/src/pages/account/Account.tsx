import { Grid, Container, Flex, rem } from '@mantine/core'
import { Avatar, Text, Box } from '@mantine/core'
import classes from './Account.module.css'
import { EditUserForm } from '../../features/home/user'
import { SocialMedia } from '../../features/account/socialMedia'
import { Fragment, useEffect, useState } from 'react'
import { getOwnInfo } from '../../api/User/OwnInfo'

interface UserData {
  age: number
  description: string
  image: string
  interests: string[] | null
  name: string
  sex: string
  userId: number
}

export const Account = () => {
  const [user, setUser] = useState<UserData>()

  const fetchInfo = async () => {
    try {
      const response = await getOwnInfo()
      setUser(response.data as UserData)
    } catch (error) {
      console.error('Failed to fetch id', error)
    }
  }

  useEffect(() => {
    fetchInfo()
  }, [])

  return (
    <Grid mx={rem(128)}>
      <Grid.Col span={{ base: 12, xs: 5 }} mih="100vh">
        <Flex h="100%">
          <Flex
            my="auto"
            h="50%"
            direction="column"
            align="center"
            justify="space-between"
          >
            <Avatar src="" size={300} radius="xl" alt="avatar" />
            <SocialMedia />
          </Flex>
        </Flex>
      </Grid.Col>

      <Grid.Col mih="100vh" span={{ base: 12, xs: 7 }}>
        <Flex direction="column" h="100%">
          <Flex direction="column" h="50%" my="auto" justify="space-between">
            <Box>
              <Text fz={36} fw={500} className={classes.name}>
                Imie: {user?.name}
              </Text>
              <Text fz={24} fw={400} className={classes.name}>
                Wiek: {user?.age}
              </Text>
              <Text fz={24} fw={400} className={classes.name}>
                Płeć: {user?.sex}
              </Text>
              <Text
                fz="md"
                fw={400}
                className={classes.name}
                style={{ paddingTop: '16px', paddingBottom: '16px' }}
              >
                {user?.description}
              </Text>
            </Box>
            <EditUserForm data={user} />
          </Flex>
        </Flex>
      </Grid.Col>
    </Grid>
  )
}
