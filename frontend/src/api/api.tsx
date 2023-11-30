import axios from 'axios'

const BASE_URL = 'https://localhost:7055'

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

export default api
