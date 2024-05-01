import { Sidebar } from '../sidebar'
import { Outlet } from 'react-router-dom'
import { Box, Center, Container, Flex } from '@mantine/core'

export const Layout = () => {
  return (
    <Flex mr={0} mih="100vh" miw="100%">
      <Sidebar />
      <Flex w="100%" direction="column">
        <Outlet />
      </Flex>
    </Flex>
  )
}
