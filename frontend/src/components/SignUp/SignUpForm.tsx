import {
  Box,
  Button,
  Group,
  PasswordInput,
  TextInput,
  Title,
  Text,
  rem,
} from '@mantine/core'
import { FormContainer } from '../Common/FormContainer'
import { Link } from 'react-router-dom'
import { hasLength, isEmail, useForm } from '@mantine/form'
import api from '../../api/api'

interface RegisterModel {
  email: string
  password: string
  passwordConfirm: string
}

export const SignUpForm = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    } as RegisterModel,
    validate: {
      email: isEmail('Proszę wprowadź poprawny email'),
      password: hasLength({ min: 8 }, 'Hasło musi mieć minimum 8 znaków'),
      passwordConfirm: (value, values) => {
        if (value !== values.password) {
          return 'Hasła nie są takie same'
        }
      },
    },
  })

  const handleSubmit = async (values: RegisterModel) => {
    try {
      await api.post('/api/account/register', values)
      console.log('Konto zostało zarejestrowane pomyślnie')
    } catch {
      console.log('error')
    }
  }

  return (
    <Box ml={rem(250)} mt={rem(250)}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <FormContainer>
          <Title c="white">Zarejestruj się</Title>
          <TextInput
            c="white"
            label="Adres email"
            description=""
            placeholder="Adres email"
            {...form.getInputProps('email')}
          ></TextInput>

          <PasswordInput
            c="white"
            label="Hasło"
            placeholder="Hasło"
            {...form.getInputProps('password')}
          ></PasswordInput>

          <PasswordInput
            c="white"
            label="Powtórz hasło"
            {...form.getInputProps('passwordConfirm')}
          ></PasswordInput>
          <Group>
            <Button color="red" variant="filled" type="submit">
              Zarejestruj
            </Button>
            <Button
              component={Link}
              to="/SignIn"
              bg={'white'}
              color="red"
              variant="outline"
            >
              Mam już konto
            </Button>
          </Group>
        </FormContainer>
      </form>
    </Box>
  )
}
