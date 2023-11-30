import { useContext } from 'react'
import AuthContext, { AuthContextProps } from '../components/AuthProvider'

export const useAuth = () => {
  return useContext(AuthContext) as AuthContextProps
}
