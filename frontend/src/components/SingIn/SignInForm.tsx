import {
  Box,
  Button,
  Group,
  PasswordInput,
  TextInput,
  Title,
  Text,
} from '@mantine/core'
import { FormContainer } from '../Common/FormContainer'
import { SubmitHandler, useForm } from 'react-hook-form';
import { loginModel, loginSchema } from '../../api/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { loginUser } from '../../api/Signin';
import { useAtom } from 'jotai';
import { isAuthenticated } from '../../utils/Authentication';

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<loginModel>({
    resolver: zodResolver(loginSchema)
  })
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [, setIsAuthenticated] = useAtom(isAuthenticated);
  const navigate  = useNavigate();

  const onSubmit: SubmitHandler<loginModel> = async (data) => {
    try {
      await loginUser(data);
      setIsAuthenticated(true);
      navigate('/app/account');
    } catch (error:any) {
      setErrorMessage(error.message);
    }
  };
  
  return (
    <Box ml={250} mt={250}>
      <form onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <Title c="white">Zaloguj się</Title>

        <TextInput
          c="#FFFFFF"
          label="Adres email"
          description=""
          placeholder="Adres email"
          {...register("email")}
          error={errors.email?.message}
        ></TextInput>

        <PasswordInput
          c="#FFFFFF"
          label="Hasło"
          placeholder="Hasło"
          {...register("password")}
          error={errors.password?.message}
        ></PasswordInput>
        {errorMessage && (<Text size='xs' color='red'>{errorMessage}</Text>)}
        <Group mb="sm">
          <Button color="red" variant="filled" type='submit'>
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
