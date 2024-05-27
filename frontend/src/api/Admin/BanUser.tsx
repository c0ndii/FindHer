import Cookies from 'js-cookie'
import { userModel } from '../User/schema'
import axios from 'axios'
import { notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { t } from 'i18next'

const baseUrl = 'https://localhost:44360/api/admin/banuser/'

export const banUser = async (userId: number) => {
  try {
    const response = await axios.post(
      baseUrl + userId,
      JSON.stringify({ id: userId }),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + Cookies.get('token')?.toString(),
        },
        withCredentials: true,
        responseType: 'text',
      }
    )
    if (response.request?.status === 200) {
      return response
    } else {
      const errorData = await response
      throw new Error(`Ban user failed: ${JSON.stringify(errorData.headers)}`)
    }
  } catch (error: any) {
    throw new Error('Failed operation')
  }
}

export const useBanUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['banUser'],
    mutationFn: (user: number) => banUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUsers'] })
      notifications.show({
        withCloseButton: true,
        autoClose: 5000,
        title: t('users.banPopup'),
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
        title: t('home.pairs.connectionError'),
        color: 'red',
        className: 'my-notification-class',
        loading: false,
        message: '',
      })
    },
  })
}
