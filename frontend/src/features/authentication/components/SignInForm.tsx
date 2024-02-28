import {
  Box,
  Button,
  Group,
  PasswordInput,
  TextInput,
  Title,
} from '@mantine/core'
import { FormContainer } from '../../../shared/FormContainer'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { hasLength, isEmail, useForm } from '@mantine/form'
import api from '../../../api/api'
import { useAuth } from '../hooks/useAuth'
import { Role_Claim } from '../Constants/claimsConstans'
import { jwtDecode } from 'jwt-decode'
import { AuthState } from '../../../context/AuthProvider'
import Cookies from 'js-cookie'
import { TokenData } from '../Models/tokenData'

interface loginModel {
  email: string
  password: string
}

export const SignInForm = () => {
  const { auth, setAuth } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/app/account'

  const handleSubmit = async (values: loginModel) => {
    try {
      const response = await api.post('/api/account/login', values)
      const token = response?.data as string
      saveToken(token, setAuth)
      navigate(from, { replace: true })
    } catch (err) {
      console.log('error')
    }
  }

  const saveToken = (
    token: string,
    setAuth: React.Dispatch<React.SetStateAction<AuthState | null>>
  ) => {
    const decoded = jwtDecode<TokenData>(token)
    const roles = decoded[Role_Claim] as string[]
    const exp = decoded.exp

    setAuth({
      accessToken: token,
      expirationTime: exp,
      roles: roles,
    })

    Cookies.set('token', token, { expires: exp })
  }

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    } as loginModel,
    validate: {
      email: isEmail('Proszę wprowadź poprawny email'),
      password: hasLength({ min: 8 }, 'Hasło musi mieć minimum 8 znaków'),
    },
  })

  return (
    <Box ml={250} mt={250}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <FormContainer>
          <Title c="white">Zaloguj się</Title>

          <TextInput
            c="#FFFFFF"
            label="Adres email"
            description=""
            placeholder="Adres email"
            {...form.getInputProps('email')}
          ></TextInput>

          <PasswordInput
            c="#FFFFFF"
            label="Hasło"
            placeholder="Hasło"
            {...form.getInputProps('password')}
          ></PasswordInput>

          <Group mb="sm">
            <Button color="red" variant="filled" type="submit">
              Zaloguj
            </Button>
            <Button
              component={Link}
              to="/SignUp"
              bg={'white'}
              color="red"
              variant="outline"
            >
              Załóż konto
            </Button>
          </Group>
        </FormContainer>
      </form>
    </Box>
  )
}
