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
import { t } from 'i18next'
import { ApiError } from '../../../api/Models/ApiError'
import { AxiosError } from 'axios'
import { GoogleLogin } from '@react-oauth/google'

interface loginModel {
  email: string
  password: string
}

interface googleModel {
  email: string
  name: string
  image: string
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
      const reponse = (err as AxiosError).response?.data as ApiError
      form.setFieldError('email', 'Provided credentials are invalid')
    }
  }

  const handleGoogleSubmit = async (values: googleModel) => {
    try {
      const response = await api.post('/api/account/googleauth', values)
      const token = response?.data as string
      saveToken(token, setAuth)
      navigate(from, { replace: true })
    } catch (err) {
      const reponse = (err as AxiosError).response?.data as ApiError
      form.setFieldError('email', 'Provided credentials are invalid')
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
      email: isEmail(t('signUp.validation.email')),
      password: hasLength({ min: 8 }, t('signUp.validation.password')),
    },
  })

  return (
    <Box ml={250} mt={250}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <FormContainer>
          <Title c="white">{t('signIn.form.title')}</Title>
          <TextInput
            c="#FFFFFF"
            label={t('signUp.form.email')}
            description=""
            placeholder={t('signUp.form.email')}
            {...form.getInputProps('email')}
          ></TextInput>
          <PasswordInput
            c="#FFFFFF"
            label={t('signUp.form.password')}
            placeholder={t('signUp.form.password')}
            {...form.getInputProps('password')}
          ></PasswordInput>
          <Group mb="sm">
            <Button color="red" variant="filled" type="submit">
              {t('signIn.form.button.signIn')}
            </Button>
            <Button
              component={Link}
              to="/SignUp"
              bg={'white'}
              color="red"
              variant="outline"
            >
              {t('signIn.form.button.signUp')}
            </Button>
          </Group>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                const credentialResponseDecoded = jwtDecode<any>(
                  credentialResponse.credential
                )
                handleGoogleSubmit({
                  email: credentialResponseDecoded.email,
                  name: credentialResponseDecoded.given_name,
                  image: credentialResponseDecoded.picture,
                })
              }
            }}
            onError={() => {
              console.log('OAtuh Login Failed')
            }}
          />
        </FormContainer>
      </form>
    </Box>
  )
}
