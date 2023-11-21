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
import { signupModel, signupSchema } from '../../api/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { registerUser } from '../../api/Signup'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<signupModel>({
    resolver: zodResolver(signupSchema)
  })
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const onSubmit: SubmitHandler<signupModel> = async (data) => {
    try {
      await registerUser(data);
      setErrorMessage('Utworzono konto pomyślnie!');
    } catch (error:any) {
      setErrorMessage(error.message);
    }
  };
  return (
    <Box ml={rem(250)} mt={rem(250)}>
      <form onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <Title c="white">Zarejestruj się</Title>
        <TextInput
          c="white"
          label="Adres email"
          description=""
          placeholder="Adres email"
          {...register("email")}
          error={errors.email?.message}
        ></TextInput>

        <PasswordInput
          c="white"
          label="Hasło"
          placeholder="Hasło"
          {...register("password")}
          error={errors.password?.message}
        ></PasswordInput>

        <PasswordInput
          c="white"
          label="Powtórz hasło"
          placeholder="Powtórz hasło"
          {...register("passwordConfirm")}
          error={errors.passwordConfirm?.message}
        ></PasswordInput>
        {errorMessage && (<Text size='xs' color='red'>{errorMessage}</Text>)}
        <Group>
          <Button color="red" variant="filled" type='submit'>
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

