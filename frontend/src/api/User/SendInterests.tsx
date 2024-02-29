import Cookies from 'js-cookie'
import { intetrestModel } from './schema'
import axios from 'axios'

const baseUrl = 'https://localhost:44360/api/account/sendinterest'

export const sendInterests = async (userData: intetrestModel) => {
  try {
    const response = await axios.patch(baseUrl, JSON.stringify(userData), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookies.get('token')?.toString(),
      },
      withCredentials: true,
      responseType: 'text',
    })
    if (response.request?.status === 200) {
      return response
    } else {
      const errorData = await response
      throw new Error(
        `Edit profile failed: ${JSON.stringify(errorData.headers)}`
      )
    }
  } catch (error: any) {
    throw new Error('Failed operation')
  }
}
