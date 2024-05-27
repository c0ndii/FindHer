import Cookies from 'js-cookie'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'
import { t } from 'i18next'

const baseUrl = 'https://localhost:44360/api/meeting/decline/'

export const declineMeeting = async (userId: number) => {
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

export const useDeclineMeeting = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['declineMeeting'],
    mutationFn: (userId: number) => declineMeeting(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPending'] })
      notifications.show({
        withCloseButton: true,
        autoClose: 5000,
        title: t('home.pendingMeetings.declinePopup'),
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
