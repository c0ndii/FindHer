import Cookies from 'js-cookie'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'
import { useTranslation } from 'react-i18next'

const baseUrl = 'https://localhost:44360/api/pair/blockuser/'

export const blockUser = async (userData: number) => {
  try {
    const response = await axios.post(
      baseUrl + userData,
      JSON.stringify({ id: userData }),
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
      throw new Error(`Block user failed: ${JSON.stringify(errorData.headers)}`)
    }
  } catch (error: any) {
    throw new Error('Failed operation')
  }
}

export const useBlockUser = () => {
  const queryClient = useQueryClient()
  const { t, i18n } = useTranslation()
  return useMutation({
    mutationKey: ['blockUser'],
    mutationFn: (user: number) => blockUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPairs'] })
      notifications.show({
        withCloseButton: true,
        autoClose: 5000,
        title: t('home.pairs.blockPopup'),
        color: 'green',
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
