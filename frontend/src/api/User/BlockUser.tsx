import Cookies from 'js-cookie'
import { userModel } from './schema'
import axios from 'axios'

const baseUrl = 'https://localhost:44360/api/account/blockuser/'

export const blockUser = async (userData: number) => {
  try {
    const response = await axios.post(
      baseUrl + userData,
      JSON.stringify({ id: userData }),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + Cookies.get('token')?.toString(),
        },
        withCredentials: true,
        responseType: 'text',
      }
    )
    if (response.request?.status === 200) {
      return response
    } else {
      const errorData = await response
      throw new Error(`Block user failed: ${JSON.stringify(errorData.headers)}`)
    }
  } catch (error: any) {
    throw new Error('Failed operation')
  }
}
