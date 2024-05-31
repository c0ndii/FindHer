import { Grid, Flex, Center } from '@mantine/core'
import { Avatar, Text, Box } from '@mantine/core'
import classes from './Account.module.css'
import { EditUserForm } from '../../features/home/user'
import { SocialMedia } from '../../features/account/socialMedia'
import { useOwnInfo } from '../../api/User/OwnInfo'
import { t } from 'i18next'

export const Account = () => {
  const { data: user } = useOwnInfo()

  return (
    <Center>
      <Grid w="75%">
        <Grid.Col span={{ base: 12, md: 6 }} mih="100vh">
          <Flex h="100%" justify="center">
            <Flex
              my="auto"
              h="50%"
              direction="column"
              align="center"
              justify="space-between"
            >
              <Avatar
                src={user?.image ? user?.image : ''}
                size={300}
                radius="xl"
                alt="avatar"
              />
              <SocialMedia />
            </Flex>
          </Flex>
        </Grid.Col>

        <Grid.Col mih="100vh" span={{ base: 12, md: 6 }}>
          <Center h="100%">
            <Flex direction="column" h="100%">
              <Flex
                direction="column"
                h="50%"
                my="auto"
                justify="space-between"
              >
                <Box>
                  <Text fz={36} fw={500} className={classes.name}>
                    {t('account.name')}: {user?.name}
                  </Text>
                  <Text fz={24} fw={400} className={classes.name}>
                    {t('account.age')}: {user?.age}
                  </Text>
                  <Text fz={24} fw={400} className={classes.name}>
                    {t('account.gender')}: {user?.sex}
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
          </Center>
        </Grid.Col>
      </Grid>
    </Center>
  )
}
