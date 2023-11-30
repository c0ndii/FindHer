import { createContext, useState, ReactNode, useContext } from 'react'
import { WithChildren } from '../../../utils/WithChildren'
import Cookies from 'js-cookie'
import { TokenData } from '../Models/tokenData'
import { jwtDecode } from 'jwt-decode'
import { Role_Claim } from '../Constants/claimsConstans'

export interface AuthState {
  accessToken: string
  expirationTime: number
  roles: string[]
}

export interface AuthContextProps {
  auth: AuthState | null
  setAuth: React.Dispatch<React.SetStateAction<AuthState | null>>
  isAuthorized: () => boolean
}

const AuthContext = createContext<AuthContextProps>({
  auth: null,
  setAuth: () => {},
  isAuthorized: () => false,
})
export default AuthContext

export const AuthProvider = ({ children }: WithChildren) => {
  const [auth, setAuth] = useState<AuthState | null>(null)

  const isAuthorized = () => {
    if (!auth) {
      var token = Cookies.get('token')
      if (!token) return false

      const decoded = jwtDecode<TokenData>(token)
      const roles = decoded[Role_Claim] as string[]
      const exp = decoded.exp

      if (exp < Date.now() / 1000) return false

      setAuth({
        accessToken: token,
        expirationTime: exp,
        roles: roles,
      })

      return true
    }

    return auth?.expirationTime > Date.now() / 1000 ? true : false
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, isAuthorized }}>
      {children}
    </AuthContext.Provider>
  )
}
