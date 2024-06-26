import { Grid, UnstyledButton } from '@mantine/core'
import { Stack, Tooltip, ActionIcon } from '@mantine/core'
import {
  IconBrandFacebook,
  IconBrandX,
  IconBrandSpotify,
  IconBrandInstagram,
} from '@tabler/icons-react'
import classes from '../../../pages/account/Account.module.css'
import { NavLink } from 'react-router-dom'

export const SocialMedia = () => {
  return (
    <Grid>
      <Grid.Col span={{ base: 2, xs: 12 }}>
        <Stack
          justify="center"
          gap={'5vw'}
          style={{ display: 'flex', flexDirection: 'row' }}
        >
          <Tooltip
            label={'Instagram'}
            position="top"
            transitionProps={{ duration: 0 }}
          >
            <NavLink
              to={''}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <UnstyledButton className={classes.link}>
                <ActionIcon color="red" variant="subtle" size="xl">
                  <IconBrandInstagram />
                </ActionIcon>
              </UnstyledButton>
            </NavLink>
          </Tooltip>
          <Tooltip
            label={'Facebook'}
            position="top"
            transitionProps={{ duration: 0 }}
          >
            <NavLink
              to={''}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <UnstyledButton className={classes.link}>
                <ActionIcon color="red" variant="subtle" size="xl">
                  <IconBrandFacebook />
                </ActionIcon>
              </UnstyledButton>
            </NavLink>
          </Tooltip>
          <Tooltip
            label={'Twitter'}
            position="top"
            transitionProps={{ duration: 0 }}
          >
            <NavLink
              to={''}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <UnstyledButton className={classes.link}>
                <ActionIcon color="red" variant="subtle" size="xl">
                  <IconBrandX />
                </ActionIcon>
              </UnstyledButton>
            </NavLink>
          </Tooltip>
          <Tooltip
            label={'Spotify'}
            position="top"
            transitionProps={{ duration: 0 }}
          >
            <NavLink
              to={''}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <UnstyledButton className={classes.link}>
                <ActionIcon color="red" variant="subtle" size="xl">
                  <IconBrandSpotify />
                </ActionIcon>
              </UnstyledButton>
            </NavLink>
          </Tooltip>
        </Stack>
      </Grid.Col>
    </Grid>
  )
}
