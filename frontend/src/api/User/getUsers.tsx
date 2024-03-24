import Cookies from 'js-cookie'
import axios from 'axios'

const baseUrl = 'https://localhost:44360/api/account/getUsers'

export const getUsers = async () => {
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
      return response
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
