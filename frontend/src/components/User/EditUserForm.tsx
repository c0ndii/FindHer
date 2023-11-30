import {
  Button,
  Group,
  TextInput,
  Text,
  Modal,
  NumberInput,
  FileInput,
  Textarea
} from '@mantine/core'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { userModel, userSchema } from '../../api/User/schema'
import { editUser } from './../../api/User/Edit'
import { useDisclosure } from '@mantine/hooks'

export const EditUserForm = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<userModel>({
    resolver: zodResolver(userSchema),
  })
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<userModel> = async (data) => {
    try {
      await editUser(data)
      navigate('/app/account')
    } catch (error: any) {
      setErrorMessage(error.message)
    }
  }
  const [age, setAge] = useState<string | number>(0)
  const [file, setFile] = useState<File | null>(null)
  useEffect(() => {
    setValue('age', age as number)
  }, [age, register])
  useEffect(() => {
    setValue('image', file?.name as string)
  }, [file, register])
  return (
    <>
      <Button onClick={open} color="red" style={{ width: '150px' }}>
        Edytuj profil
      </Button>
      <Modal opened={opened} onClose={close} title="Edytuj profil">
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}
        >
          <TextInput
            label="Imie"
            placeholder="Imie"
            {...register('name')}
            error={errors.name?.message}
          ></TextInput>

          <NumberInput
            label="Wiek"
            placeholder="Wiek"
            value={age}
            onChange={setAge}
            allowDecimal={false}
            allowNegative={false}
            error={errors.age?.message}
          ></NumberInput>

          <Textarea
            label="Opis"
            placeholder="Opis"
            {...register('description')}
            error={errors.description?.message}
          />

          <TextInput
            label="Płeć"
            placeholder="Płeć"
            {...register('sex')}
            error={errors.sex?.message}
          ></TextInput>

          <FileInput
            label="Obraz"
            placeholder="Obraz"
            value={file}
            onChange={setFile}
            error={errors.image?.message}
          ></FileInput>
          {errorMessage && (
            <Text size="xs" color="red">
              {errorMessage}
            </Text>
          )}
          <Group mb="sm">
            <Button color="red" variant="filled" type="submit">
              Zatwierdź
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  )
}
