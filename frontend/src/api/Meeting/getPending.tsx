import Cookies from 'js-cookie'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { meetingModel } from '../../pages/users/schema'

const baseUrl = 'https://localhost:44360/api/meeting/getallpendingmeetings'

export const getPending = async () => {
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
      return response.data as meetingModel[]
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

export const useGetPending = () => {
  return useQuery({
    queryKey: ['getPending'],
    queryFn: getPending,
  })
}
