import {
  Box,
  Button,
  Group,
  PasswordInput,
  TextInput,
  Title,
  rem,
} from '@mantine/core'
import { FormContainer } from '../Common/FormContainer'

export const SignUpForm = () => {
  return (
    <Box ml={rem(250)} mt={rem(250)}>
      <FormContainer>
        <Title c="white">Zarejestruj się</Title>
        <TextInput
          c="white"
          label="Adres email"
          description=""
          placeholder="Adres email"
        ></TextInput>

        <PasswordInput
          c="white"
          label="Hasło"
          placeholder="Hasło"
        ></PasswordInput>

        <PasswordInput
          c="white"
          label="Powtórz hasło"
          placeholder="Powtórz hasło"
        ></PasswordInput>
        <Group>
          <Button color="red" variant="filled">
            Zarejestruj
          </Button>
          <Button
            component="a"
            href="/SignIn"
            bg={'white'}
            color="red"
            variant="outline"
          >
            Mam już konto
          </Button>
        </Group>
      </FormContainer>
    </Box>
  )
}
