/* import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../../utils/Authentication'

const LogoutView = () => {
  const [, setIsAuthenticated] = useAtom(isAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.removeItem('Authorization')

    setIsAuthenticated(false)

    navigate('/SignIn')
  }, [setIsAuthenticated, navigate])

  return <></>
}

export default LogoutView
function useAtom(isAuthenticated: any): [any, any] {
  throw new Error('Function not implemented.')
}

 */
export {}