import Cookies from 'js-cookie'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export type interestCategory = {
  id: number
  name: string
}

const baseUrl = 'https://localhost:44360/api/categories/interests'

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
      return response.data as interestCategory[]
    } else {
      throw new Error(
        `Edit profile failed: ${JSON.stringify(response.headers)}`
      )
    }
  } catch (error: any) {
    throw new Error('Failed operation')
  }
}

export const useGetAllInterestCategories = () => {
  return useQuery({
    queryKey: ['getAllInterestCategories'],
    queryFn: getAll,
  })
}
