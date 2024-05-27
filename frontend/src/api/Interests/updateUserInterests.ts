import Cookies from 'js-cookie'
import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'
import { t } from 'i18next'

const baseUrl = 'https://localhost:44360/api/interests/user'

interface UpdateInterestsRequst {
  interestIds: string[]
}

export const updateUserInterests = async (request: UpdateInterestsRequst) => {
  try {
    const response = await axios.put(
      baseUrl,
      request.interestIds.map((s) => Number(s)),
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
        `Interests update failed: ${JSON.stringify(errorData.headers)}`
      )
    }
  } catch (error: any) {
    throw new Error('Failed operation')
  }
}

export const useUpdateUserInterests = () => {
  return useMutation({
    mutationKey: ['sendScore'],
    mutationFn: (request: UpdateInterestsRequst) =>
      updateUserInterests(request),
    onSuccess: () => {
      notifications.show({
        withCloseButton: true,
        autoClose: 5000,
        title: t('preferences_interests.interestsUpdatePopup'),
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
        title: t('pairs.connectionError'),
        color: 'red',
        className: 'my-notification-class',
        loading: false,
        message: '',
      })
    },
  })
}
