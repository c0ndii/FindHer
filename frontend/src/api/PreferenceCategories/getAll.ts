import Cookies from 'js-cookie'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export type preferenceCategory = {
  id: number
  name: string
}

const baseUrl = 'https://localhost:44360/api/categories'

export const getAll = async () => {
  try {
    const response = await axios.get(baseUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      withCredentials: true,
      responseType: 'json',
    })

    if (response.status === 200) {
      return response.data as preferenceCategory[]
    } else {
      throw new Error(
        `Edit profile failed: ${JSON.stringify(response.headers)}`
      )
    }
  } catch (error: any) {
    console.error('Failed operation', error)
    throw new Error('Failed operation')
  }
}

export const useGetAllPreferenceCategories = () => {
  return useQuery({
    queryKey: ['getAllPreferenceCategories'],
    queryFn: getAll,
  })
}
