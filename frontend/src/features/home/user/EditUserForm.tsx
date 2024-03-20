import {
  Button,
  Group,
  TextInput,
  Text,
  Modal,
  NumberInput,
  FileInput,
  Textarea,
} from '@mantine/core'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { userModel, userSchema } from '../../../api/User/schema'
import { editUser } from '../../../api/User/Edit'
import { useDisclosure } from '@mantine/hooks'
import { t } from 'i18next'
interface UserData {
  age: number
  description: string
  image: string
  interests: string[] | null
  name: string
  sex: string
  userId: number
}

interface EditUserFormProps {
  data?: UserData
}

export const EditUserForm = ({ data }: EditUserFormProps) => {
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
        {t('account.editButton')}
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        title={t('account.editForm.title')}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}
        >
          <TextInput
            label={t('account.editForm.name')}
            placeholder={t('account.editForm.name')}
            {...register('name')}
            error={errors.name?.message}
            defaultValue={data?.name}
          ></TextInput>

          <NumberInput
            label={t('account.editForm.age')}
            placeholder={t('account.editForm.age')}
            value={age}
            onChange={setAge}
            allowDecimal={false}
            allowNegative={false}
            error={errors.age?.message}
            defaultValue={data?.age}
          ></NumberInput>

          <Textarea
            label={t('account.editForm.description')}
            placeholder={t('account.editForm.description')}
            {...register('description')}
            error={errors.description?.message}
            defaultValue={data?.description}
          />

          <TextInput
            label={t('account.editForm.gender')}
            placeholder={t('account.editForm.gender')}
            {...register('sex')}
            error={errors.sex?.message}
            defaultValue={data?.sex}
          ></TextInput>

          <FileInput
            label={t('account.editForm.picture')}
            placeholder={t('account.editForm.picture')}
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
              {t('account.editForm.button')}
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  )
}
