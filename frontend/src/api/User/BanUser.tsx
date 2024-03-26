import Cookies from 'js-cookie'
import { userModel } from './schema'
import axios from 'axios'
import { notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'

const baseUrl = 'https://localhost:44360/api/account/banuser/'

export const banUser = async (userData: number) => {
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
      showNotification()
      return response
    } else {
      const errorData = await response
      throw new Error(`Ban user failed: ${JSON.stringify(errorData.headers)}`)
    }
  } catch (error: any) {
    throw new Error('Failed operation')
  }
}

const showNotification = () => {
  notifications.show({
    withCloseButton: true,
    autoClose: 5000,
    title: 'User has been banned',
    color: 'red',
    className: 'my-notification-class',
    loading: false,
    message: '',
  })
}
