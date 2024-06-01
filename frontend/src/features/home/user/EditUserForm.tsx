import {
  Button,
  Group,
  TextInput,
  Modal,
  NumberInput,
  FileInput,
  Textarea,
} from '@mantine/core'
import { useState } from 'react'
import { useEditOwn } from '../../../api/User/Edit'
import { useDisclosure } from '@mantine/hooks'
import { t } from 'i18next'
import { isInRange, useForm } from '@mantine/form'
import { userModel } from '../../../api/User/schema'
interface UserData {
  age: number
  description: string
  image: string
  name: string
  sex: string
  userId: number
}

interface EditUserFormProps {
  data: UserData
}

interface FormProps {
  name: string
  age: number
  description: string
  gender: string
  picture: File | null
  userId: number
}

export const EditUserForm = ({ data }: EditUserFormProps) => {
  const [opened, { open, close }] = useDisclosure(false)
  const form = useForm<FormProps, (values: FormProps) => userModel>({
    initialValues: {
      name: data.name,
      age: data.age,
      description: data.description,
      gender: data.sex,
      picture: null,
      userId: data.userId,
    },
    validate: {
      age: isInRange({ min: 18 }, 'Your age needs to be at least 18 years old'),
      picture: (value) => {
        if (
          value !== null &&
          !['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)
        ) {
          return 'Only jpeg or png files are allowed'
        }
      },
    },
    transformValues: (values: FormProps): userModel => ({
      name: values.name,
      age: values.age,
      description: values.description,
      sex: values.gender,
      image: values.picture,
      userId: values.userId,
    }),
  })
  const { mutateAsync: editUserProfile } = useEditOwn()
  const handleSubmit = (data: userModel) => {
    editUserProfile(data)
    close()
  }

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
          encType="multipart/form-data"
          style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <TextInput
            label={t('account.editForm.name')}
            placeholder={t('account.editForm.name')}
            {...form.getInputProps('name')}
          ></TextInput>

          <NumberInput
            label={t('account.editForm.age')}
            placeholder={t('account.editForm.age')}
            allowDecimal={false}
            allowNegative={false}
            {...form.getInputProps('age')}
          ></NumberInput>

          <Textarea
            label={t('account.editForm.description')}
            placeholder={t('account.editForm.description')}
            {...form.getInputProps('description')}
          />

          <TextInput
            label={t('account.editForm.gender')}
            placeholder={t('account.editForm.gender')}
            {...form.getInputProps('gender')}
          ></TextInput>

          <FileInput
            label={t('account.editForm.picture')}
            placeholder={t('account.editForm.picture')}
            {...form.getInputProps('picture')}
          ></FileInput>

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
