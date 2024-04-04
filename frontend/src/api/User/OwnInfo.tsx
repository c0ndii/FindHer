import Cookies from 'js-cookie'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

interface UserData {
  age: number
  description: string
  image: string
  interests: string[] | null
  name: string
  sex: string
  userId: number
}

const baseUrl = 'https://localhost:44360/api/account/getownprofile'

export const getOwnInfo = async () => {
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
      return response.data as UserData
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

export const useOwnInfo = () => {
  return useQuery({
    queryKey: ['ownInfo'],
    queryFn: getOwnInfo,
  })
}
