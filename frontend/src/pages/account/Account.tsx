import { Grid, Container, Flex, rem } from '@mantine/core'
import { Avatar, Text, Box } from '@mantine/core'
import classes from './Account.module.css'
import { EditUserForm } from '../../features/home/user'
import { SocialMedia } from '../../features/account/socialMedia'
import { Fragment } from 'react'

export const Account = () => {
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
              <Text fz={96} fw={500} className={classes.name}>
                Imie
              </Text>
              <Text fz={24} fw={400} className={classes.name}>
                Wiek:
              </Text>
              <Text fz={24} fw={400} className={classes.name}>
                Płeć:
              </Text>
              <Text fz={24} fw={400} className={classes.name}>
                Miasto:
              </Text>
              <Text
                fz="md"
                fw={400}
                className={classes.name}
                style={{ paddingTop: '16px', paddingBottom: '16px' }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                consequat urna eget nibh accumsan, vitae dictum augue euismod.
                Duis augue tortor, efficitur nec suscipit at, sagittis sed nunc.
                Curabitur quis ex dui. Donec congue orci risus, ultrices commodo
                ante gravida ut. Sed volutpat id dui ut dapibus. In varius ante
                tincidunt, mollis turpis nec, placerat risus. Fusce molestie dui
                eget justo dictum vestibulum.
              </Text>
            </Box>
            <EditUserForm />
          </Flex>
        </Flex>
      </Grid.Col>
    </Grid>
  )
}
