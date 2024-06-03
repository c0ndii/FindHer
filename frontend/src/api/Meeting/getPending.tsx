import Cookies from 'js-cookie'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export type pendingMeeting = {
  meetingId: number
  meetingName: string
  meetingPlace: string
  meetingDate: Date
  creatorId: number
  canAccept: boolean
}

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
      return response.data as pendingMeeting[]
    } else {
      throw new Error(
        `Edit profile failed: ${JSON.stringify(response.headers)}`
      )
    }
  } catch (error: any) {
    throw new Error('Failed operation')
  }
}

export const useGetPending = () => {
  return useQuery({
    queryKey: ['getPending'],
    queryFn: getPending,
  })
}
