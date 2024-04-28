import Cookies from 'js-cookie'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { preference } from './getAll'

const baseUrl = 'https://localhost:44360/api/preferences/user'

export const getUserPreferences = async () => {
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
      const preferences = response.data as preference[]
      return preferences
      /*  return preferences.reduce(
        (acc: Record<number, Set<number>>, p: preference) => {
          const key = p.categoryId

          if (!acc[key]) {
            acc[key] = new Set<number>()
          }
          acc[key].add(p.id)
          return acc
        },
        {} as Record<number, Set<number>>
      ) */
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

export const useGetUserPreferences = () => {
  return useQuery({
    queryKey: ['getUserPreferenceIds'],
    queryFn: getUserPreferences,
  })
}
