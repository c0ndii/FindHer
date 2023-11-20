import {
  Box,
  Button,
  Group,
  PasswordInput,
  TextInput,
  Title,
} from '@mantine/core'
import { FormContainer } from '../Common/FormContainer'

export const SignInForm = () => {
  return (
    <Box ml={250} mt={250}>
      <FormContainer>
        <Title c="white">Zaloguj się</Title>

        <TextInput
          c="#FFFFFF"
          label="Adres email"
          description=""
          placeholder="Adres email"
        ></TextInput>

        <PasswordInput
          c="#FFFFFF"
          label="Hasło"
          placeholder="Hasło"
        ></PasswordInput>

        <Group mb="sm">
          <Button color="red" variant="filled">
            Zaloguj
          </Button>
          <Button
            component="a"
            href="/SignUp"
            bg={'white'}
            color="red"
            variant="outline"
          >
            Załóż konto
          </Button>
        </Group>
      </FormContainer>
    </Box>
  )
}
