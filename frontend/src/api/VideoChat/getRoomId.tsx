import Cookies from 'js-cookie'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { personModel } from '../Match/schema'

const baseUrl = 'https://localhost:44360/api/pair/getroomid/'

export const getRoomId = async (targetId: number) => {
  try {
    const response = await axios.get(baseUrl + targetId, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      withCredentials: true,
      responseType: 'json',
    })
    if (response.request?.status === 200) {
      return response.data as string
    } else {
      const errorData = await response
      throw new Error(
        `Profiles load failed: ${JSON.stringify(errorData.headers)}`
      )
    }
  } catch (error: any) {
    throw new Error('Failed operation')
  }
}

export const useRoomId = (targetId: number) => {
  return useQuery({
    queryKey: ['getRoomId'],
    queryFn: () => getRoomId(targetId),
  })
}
