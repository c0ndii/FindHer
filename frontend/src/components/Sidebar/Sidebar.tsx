import { useState } from 'react'
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
} from '@tabler/icons-react'
import classes from './Sidebar.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import { useAuth } from '../Authentication/hooks/useAuth'
import Cookies from 'js-cookie'

interface NavbarLinkProps {
  icon: typeof IconHome2
  label: string
  active?: boolean
  onClick(): void
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <NavLink to={label} style={{ textDecoration: 'none', color: 'inherit' }}>
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

const mockdata = [
  { icon: IconHome2, label: 'Home' },
  { icon: IconUser, label: 'Account' },
  { icon: IconHeart, label: 'Preferences' },
  { icon: IconThumbUp, label: 'Interests' },
  { icon: IconForms, label: 'Matchform' },
  { icon: IconSettings, label: 'Settings' },
  { icon: IconMessage, label: 'Chat' },
]

export const Sidebar = () => {
  const [active, setActive] = useState(1)
  const navigate = useNavigate()

  const { setAuth } = useAuth()

  const logOut = () => {
    setAuth(null)
    Cookies.remove('token')
    navigate('/')
  }

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
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
          </Stack>
        </div>

        <Stack justify="center" gap={0}>
          <NavbarLink icon={IconLogout} label="Logout" onClick={logOut} />
        </Stack>
      </Stack>
    </nav>
  )
}

export default Sidebar
