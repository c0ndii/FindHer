import { Grid, Container } from '@mantine/core'
import { Avatar, Text, Box } from '@mantine/core'
import classes from './AccountView.module.css'
import { EditUserForm } from '../../components/User'
import { SocialMedia } from '../../components/SocialMedia'

export const AccountView = () => {
  return (
    <Container my="xl" style={{ padding: 0, margin: 0 }}>
      <Grid>
        <Grid.Col
          span={{ base: 12, xs: 5 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '700px',
            width: '500px',
          }}
        >
          <Avatar src="" size={300} radius="xl" alt="avatar" />
        </Grid.Col>

        <Grid.Col
          span={{ base: 12, xs: 7 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '700px',
            width: '500px',
          }}
        >
          <Box>
            <Text fz={96} fw={500} className={classes.name}>
              Imie
            </Text>
          </Box>

          <Box>
            <Text fz={24} fw={400} className={classes.name}>
              Wiek:
            </Text>

            <Text fz={24} fw={400} className={classes.name}>
              Płeć:
            </Text>

            <Text fz={24} fw={400} className={classes.name}>
              Miasto:
            </Text>
          </Box>

          <Box>
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
        </Grid.Col>

        <SocialMedia />
      </Grid>
    </Container>
  )
}
