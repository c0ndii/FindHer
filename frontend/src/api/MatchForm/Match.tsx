import Cookies from 'js-cookie'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'

const baseUrl = 'https://localhost:44360/api/matchform/sendscore/'

export const matchPost = async (score: number) => {
  try {
    const response = await axios.post(baseUrl + score, JSON.stringify(score), {
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
  return useMutation({
    mutationKey: ['sendScore'],
    mutationFn: (score: number) => matchPost(score),
    onSuccess: () => {
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
