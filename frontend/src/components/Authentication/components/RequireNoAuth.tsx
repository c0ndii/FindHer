import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from '../../Sidebar'
import { Flex } from '@mantine/core'

const RequireNoAuth: React.FC = () => {
  const { auth, isAuthorized } = useAuth()
  const location = useLocation()

  return isAuthorized() ? (
    <Flex>
      <Sidebar />
      <Outlet />
    </Flex>
  ) : (
    <Navigate to="/SignIn" state={{ from: location }} replace />
  )
}

export default RequireNoAuth
