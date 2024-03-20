import {
  Box,
  Button,
  Group,
  PasswordInput,
  TextInput,
  Title,
  Text,
  rem,
  Dialog,
} from '@mantine/core'
import { FormContainer } from '../../../shared/FormContainer'
import { Link } from 'react-router-dom'
import { hasLength, isEmail, useForm } from '@mantine/form'
import api from '../../../api/api'
import { useDisclosure } from '@mantine/hooks'
import { t } from 'i18next'

interface RegisterModel {
  email: string
  password: string
  passwordConfirm: string
}

export const SignUpForm = () => {
  const [opened, { toggle, close }] = useDisclosure(false)

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    } as RegisterModel,
    validate: {
      email: isEmail(t('signUp.validation.email')),
      password: hasLength({ min: 8 }, t('signUp.validation.password')),
      passwordConfirm: (value, values) => {
        if (value !== values.password) {
          return t('signUp.validation.confirmPassword')
        }
      },
    },
  })

  const handleSubmit = async (values: RegisterModel) => {
    try {
      await api.post('/api/account/register', values)
      toggle()
      console.log(t('signUp.successMessage'))
    } catch {
      console.log('error')
    }
  }

  return (
    <Box ml={rem(250)} mt={rem(250)}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <FormContainer>
          <Title c="white">{t('signUp.form.title')}</Title>
          <TextInput
            c="white"
            label={t('signUp.form.email')}
            description=""
            placeholder={t('signUp.form.email')}
            {...form.getInputProps('email')}
          ></TextInput>

          <PasswordInput
            c="white"
            label={t('signUp.form.password')}
            placeholder={t('signUp.form.password')}
            {...form.getInputProps('password')}
          ></PasswordInput>

          <PasswordInput
            c="white"
            label={t('signUp.form.confirmPassword')}
            {...form.getInputProps('passwordConfirm')}
          ></PasswordInput>
          <Group>
            <Button color="red" variant="filled" type="submit">
              {t('signUp.form.button.signUp')}
            </Button>
            <Button
              component={Link}
              to="/SignIn"
              bg={'white'}
              color="red"
              variant="outline"
            >
              {t('signUp.form.button.signIn')}
            </Button>
          </Group>
        </FormContainer>
      </form>
      <Box>
        <Dialog
          opened={opened}
          withCloseButton
          onClose={close}
          size="lg"
          radius="md"
        >
          <Text size="sm" mb="xs" fw={500}>
            {t('signUp.successMessage')}
          </Text>
          <Text size="sm" mb="xs" fw={500}>
            {t('signUp.confirmRequest')}
          </Text>
          <Group align="flex-end">
            <Button component={Link} onClick={close} to="/SignIn" color="red">
              {t('signUp.loginButtonText')}
            </Button>
          </Group>
        </Dialog>
      </Box>
    </Box>
  )
}
