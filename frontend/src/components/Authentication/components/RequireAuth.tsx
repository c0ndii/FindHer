import React, { Fragment } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { Sidebar } from '../../Sidebar'
import { Container, Flex, Paper, rem } from '@mantine/core'

const RequireAuth: React.FC = () => {
  const { auth, isAuthorized } = useAuth()
  const location = useLocation()

  return isAuthorized() ? (
    <Flex mr={0} h={'100vh'}>
      <Sidebar />
      <Container w={'100%'}>
        <Outlet />
      </Container>
    </Flex>
  ) : (
    <Navigate to="/SignIn" state={{ from: location }} replace />
  )
}

export default RequireAuth
