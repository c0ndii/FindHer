import Cookies from 'js-cookie'
import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { preference } from './getAll'
import { notifications } from '@mantine/notifications'

const baseUrl = 'https://localhost:44360/api/preferences/user'

interface UpdatePreferencesRequst {
  preferenceIds: string[]
}

export const updateUserPreferences = async (
  request: UpdatePreferencesRequst
) => {
  try {
    const response = await axios.put(
      baseUrl,
      request.preferenceIds.map((s) => Number(s)),
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
      throw new Error(
        `Preferences update failed: ${JSON.stringify(errorData.headers)}`
      )
    }
  } catch (error: any) {
    throw new Error('Failed operation')
  }
}

export const useUpdateUserPreferences = () => {
  return useMutation({
    mutationKey: ['sendScore'],
    mutationFn: (request: UpdatePreferencesRequst) =>
      updateUserPreferences(request),
    onSuccess: () => {
      notifications.show({
        withCloseButton: true,
        autoClose: 5000,
        title: 'Preferences updated successfully',
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
