import Cookies from 'js-cookie'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export type preference = {
  id: number
  name: string
  categoryId: number
}

const baseUrl = 'https://localhost:44360/api/preferences'

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
      const preferences =
        (response.data as preference[]) ??
        console.error('Invalid return format')

      console.log(preferences)
      return preferences.reduce(
        (acc: Record<number, preference[]>, p: preference) => {
          const key = p.categoryId

          console.log(key)
          if (!acc[key]) {
            acc[key] = []
          }
          acc[key].push(p)
          return acc
        },
        {} as Record<number, preference[]>
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

export const useGetAllPreferences = () => {
  return useQuery({
    queryKey: ['getAllPreferences'],
    queryFn: getAll,
  })
}
