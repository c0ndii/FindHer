import Cookies from 'js-cookie'
import { userModel } from './schema'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'

const baseUrl = 'https://localhost:44360/api/account/editprofile'

export const editUser = async (userData: userModel) => {
  try {
    const formData = new FormData()
    formData.append('name', userData.name)
    formData.append('age', userData.age.toString())
    formData.append('description', userData.description)
    formData.append('sex', userData.sex)
    if (userData.image) {
      formData.append('image', userData.image)
    }

    const response = await axios.put(baseUrl, formData, {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token')?.toString(),
      },
      withCredentials: true,
      responseType: 'text',
    })
    if (response.request?.status === 200) {
      return response
    } else {
      const errorData = await response
      throw new Error(
        `Edit profile failed: ${JSON.stringify(errorData.headers)}`
      )
    }
  } catch (error: any) {
    throw new Error('Failed operation')
  }
}

export const useEditOwn = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['editNote'],
    mutationFn: (user: userModel) => editUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ownInfo'] })
      notifications.show({
        withCloseButton: true,
        autoClose: 5000,
        title: 'User info edited',
        color: 'red',
        className: 'my-notification-class',
        loading: false,
        message: '',
      })
    },
    onError: () => {
      notifications.show({
        withCloseButton: true,
        autoClose: 5000,
        title: 'Server connection error',
        color: 'red',
        className: 'my-notification-class',
        loading: false,
        message: '',
      })
    },
  })
}
