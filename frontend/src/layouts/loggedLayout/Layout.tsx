import { Sidebar } from '../sidebar'
import { Outlet } from 'react-router-dom'
import { Box, Container, Flex } from '@mantine/core'

export const Layout = () => {
  return (
    <Flex mr={0} mih="100vh" miw="100%">
      <Sidebar />
      <Container w="100%" fluid>
        <Outlet />
      </Container>
    </Flex>
  )
}
