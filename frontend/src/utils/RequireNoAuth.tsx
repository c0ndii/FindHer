import React from 'react'
import { useAuth } from '../features/authentication/hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const RequireNoAuth: React.FC = () => {
  const { isAuthorized } = useAuth()
  const location = useLocation()
  console.log(isAuthorized)

  return !isAuthorized ? ( //true / false
    <Outlet />
  ) : (
    <Navigate to="/app/Account" state={{ from: location }} replace />
  )
}

export default RequireNoAuth
