import { useContext } from 'react'
import AuthContext, { AuthContextProps } from '../../../context/AuthProvider'

export const useAuth = () => {
  return useContext(AuthContext) as AuthContextProps
}
