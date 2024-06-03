import Cookies from 'js-cookie'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { interest } from './getAll'

const baseUrl = 'https://localhost:44360/api/interests/user'

export const getUserInterests = async () => {
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
      const interests = response.data as interest[]
      return interests
      /*  return interests.reduce(
        (acc: Record<number, Set<number>>, p: interest) => {
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

    throw new Error('Failed operation')
  }
}

export const useGetUserInterests = () => {
  return useQuery({
    queryKey: ['getUserinterestIds'],
    queryFn: getUserInterests,
  })
}
