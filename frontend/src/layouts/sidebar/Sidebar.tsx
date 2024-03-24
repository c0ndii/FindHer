import { useEffect, useState } from 'react'
import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core'
import {
  IconHome2,
  IconUser,
  IconHeart,
  IconSettings,
  IconThumbUp,
  IconLogout,
  IconForms,
  IconMessage,
  IconUsers,
} from '@tabler/icons-react'
import classes from './Sidebar.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import { useAuth } from '../../features/authentication/hooks/useAuth'
import Cookies from 'js-cookie'
import { useTranslation } from 'react-i18next'
import api from '../../api/api'

interface NavbarLinkProps {
  icon: typeof IconHome2
  label: string
  path: string
  active?: boolean
  onClick(): void
}

function NavbarLink({
  icon: Icon,
  label,
  path,
  active,
  onClick,
}: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <NavLink to={path} style={{ textDecoration: 'none', color: 'inherit' }}>
        <UnstyledButton
          component="a"
          onClick={onClick}
          className={classes.link}
          data-active={active || undefined}
        >
          <Icon style={{ width: rem(30), height: rem(30) }} stroke={1.5} />
        </UnstyledButton>
      </NavLink>
    </Tooltip>
  )
}

// const mockdata = [
//   { icon: IconHome2, label: 'home' },
//   { icon: IconUser, label: 'account' },
//   { icon: IconHeart, label: 'preferences' },
//   { icon: IconThumbUp, label: 'interests' },
//   { icon: IconForms, label: 'matchForm' },
//   { icon: IconSettings, label: 'settings' },
//   { icon: IconMessage, label: 'chat' },
// ]

export const Sidebar = () => {
  const [active, setActive] = useState(1)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { setAuth, auth, isAuthorized } = useAuth()

  const logOut = () => {
    Cookies.remove('token')
    setAuth(null)

    return false
  }

  // Stałe ścieżki dla NavLink 'to' properties
  const paths = {
    home: '/app/Home',
    account: '/app/Account',
    preferences: '/app/Preferences',
    interests: '/app/Interests',
    matchForm: '/app/MatchForm',
    settings: '/app/Settings',
    chat: '/app/Chat',
  }

  const mockdata = [
    { icon: IconHome2, label: t('sidebar.home'), path: paths.home },
    { icon: IconUser, label: t('sidebar.account'), path: paths.account },
    {
      icon: IconHeart,
      label: t('sidebar.preferences'),
      path: paths.preferences,
    },
    { icon: IconThumbUp, label: t('sidebar.interests'), path: paths.interests },
    { icon: IconForms, label: t('sidebar.matchForm'), path: paths.matchForm },
    { icon: IconSettings, label: t('sidebar.settings'), path: paths.settings },
    { icon: IconMessage, label: t('sidebar.chat'), path: paths.chat },
  ]

  // const links = mockdata.map((link, index) => (
  //   <NavbarLink
  //     {...link}
  //     key={link.label}
  //     active={index === active}
  //     onClick={() => setActive(index)}
  //   />
  // ))

  const links = mockdata.map((link, index) => (
    <NavbarLink
      icon={link.icon}
      label={link.label} // Używane dla Tooltip, etykieta widoczna dla użytkownika
      path={link.path} // Stała ścieżka używana w NavLink
      key={link.path} // Zmienione z label na path dla unikalności
      active={index === active}
      onClick={() => setActive(index)}
    />
  ))

  return (
    <nav className={classes.navbar}>
      <Center>
        <img src={Logo} style={{ height: '80px' }} alt="logo"></img>
      </Center>
      <Stack justify="center" gap={40} align="center" h={'100%'}>
        <div className={classes.navbarMain}>
          <Stack justify="center" gap={0}>
            {links}
            {auth?.roles.toString() === 'Admin' && (
              <NavbarLink
                icon={IconUsers}
                label={t('sidebar.users')}
                path={'/app/Users'}
                key={'/app/Users'}
                active={links.length + 1 === active}
                onClick={() => setActive(links.length + 1)}
              />
            )}
          </Stack>
        </div>

        <Stack justify="center" gap={0}>
          {/*
          The href in the link below triggers before the onClick event, so the user is redirected to the /logout page before the logOut function is called.
*/}
          <UnstyledButton
            style={{ textDecoration: 'none', color: 'inherit' }}
            onClick={logOut}
            data-active={active || undefined}
          >
            <IconLogout
              style={{ width: rem(30), height: rem(30) }}
              stroke={1.5}
            />
          </UnstyledButton>
        </Stack>
      </Stack>
    </nav>
  )
}

export default Sidebar
