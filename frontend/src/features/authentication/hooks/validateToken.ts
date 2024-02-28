import { jwtDecode } from 'jwt-decode'
import { useAuth } from './useAuth'
import Cookies from 'js-cookie'

const validateToken = () => {
  const { auth, setAuth } = useAuth()

  if (!auth) {
    const jwtFromCookie = Cookies.get('token')
  }
}
