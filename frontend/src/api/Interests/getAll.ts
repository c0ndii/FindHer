import Cookies from 'js-cookie'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export type interest = {
  id: number
  name: string
  categoryId: number
}

const baseUrl = 'https://localhost:44360/api/interests'

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
      const Interests =
        (response.data as interest[]) ??
        console.error('Invalid return format')

      return Interests.reduce(
        (acc: Record<number, interest[]>, p: interest) => {
          const key = p.categoryId

          if (!acc[key]) {
            acc[key] = []
          }
          acc[key].push(p)
          return acc
        },
        {} as Record<number, interest[]>
      )
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

export const useGetAllInterests = () => {
  return useQuery({
    queryKey: ['getAllInterests'],
    queryFn: getAll,
  })
}
