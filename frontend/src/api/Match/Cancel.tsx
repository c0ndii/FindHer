import Cookies from 'js-cookie'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'
import { useTranslation } from 'react-i18next'

const baseUrl = 'https://localhost:44360/api/match/canceluser/'

export const cancelUser = async (userId: number) => {
  try {
    const response = await axios.post(
      baseUrl + userId,
      JSON.stringify(userId),
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
      return response.data
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

export const useCancelUser = () => {
  const queryClient = useQueryClient()
  const { t, i18n } = useTranslation()
  return useMutation({
    mutationKey: ['cancelUser'],
    mutationFn: (user: number) => cancelUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getMatched'] })
      notifications.show({
        withCloseButton: true,
        autoClose: 5000,
        title: t('home.matches.matchRemovalPopup'),
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
