import React from 'react'
import { useAuth } from '../features/authentication/hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { WithChildren } from './WithChildren'

const RequireAuth = ({ children }: WithChildren) => {
  const { isAuthorized } = useAuth()
  const location = useLocation()

  return isAuthorized ? (
    children ? (
      <>{children}</>
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to="/SignIn" state={{ from: location }} replace />
  )
}

export default RequireAuth
