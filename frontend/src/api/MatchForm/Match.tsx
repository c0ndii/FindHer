import Cookies from 'js-cookie'
import { matchModel } from './schema'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'

const baseUrl = 'https://localhost:44360/api/matchform/'

export const matchPost = async (userData: matchModel) => {
  try {
    const response = await axios.put(baseUrl, JSON.stringify(userData), {
      headers: {
        'Content-Type': 'application/json',
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

export const useSendMatch = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['addToPair'],
    mutationFn: (match: matchModel) => matchPost(match),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getMatched'] })
      notifications.show({
        withCloseButton: true,
        autoClose: 5000,
        title: 'Form sent successfully',
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
        title: 'Server connection error',
        color: 'red',
        className: 'my-notification-class',
        loading: false,
        message: '',
      })
    },
  })
}
