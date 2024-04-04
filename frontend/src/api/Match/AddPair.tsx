import Cookies from 'js-cookie'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'

const baseUrl = 'https://localhost:44360/api/pair/addusertopair/'

export const addToPair = async (userId: number) => {
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

export const useAddToPair = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['addToPair'],
    mutationFn: (user: number) => addToPair(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getMatched'] })
      notifications.show({
        withCloseButton: true,
        autoClose: 5000,
        title: 'Added user to pair',
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
