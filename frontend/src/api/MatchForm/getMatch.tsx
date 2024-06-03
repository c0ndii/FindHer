import Cookies from 'js-cookie'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

type Answer = {
  answerContent: string
  answerLetter: string
  answerWeight: number
}

type Question = {
  questionId: number
  questionContent: string
  answers: Answer[]
}

type MatchFormData = {
  questions: Question[]
}

const baseUrl = 'https://localhost:44360/api/matchform'

export const matchGet = async () => {
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
      return response.data as MatchFormData
    } else {
      throw new Error(
        `Edit profile failed: ${JSON.stringify(response.headers)}`
      )
    }
  } catch (error: any) {
    throw new Error('Failed operation')
  }
}

export const useMatchForm = () => {
  return useQuery({
    queryKey: ['getMatchForm'],
    queryFn: matchGet,
  })
}
