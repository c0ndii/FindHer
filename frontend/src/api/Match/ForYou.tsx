import Cookies from 'js-cookie'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { personModel } from './schema'

const baseUrl = 'https://localhost:44360/api/match/getmatchedusers'

export const getForYou = async () => {
  try {
    const response = await axios.get(baseUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      withCredentials: true,
      responseType: 'json',
    })
    if (response.request?.status === 200) {
      return response.data as personModel[]
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

export const useMatched = () => {
  return useQuery({
    queryKey: ['getMatched'],
    queryFn: getForYou,
  })
}
