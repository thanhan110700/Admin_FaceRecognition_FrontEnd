import axios from 'axios'
import isEmpty from 'lodash/isEmpty'
import state from '../utils/localStorage'

const baseUrl = 'http://127.0.0.1:8002/api/'

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

const addAuthToken = (config) => {
  const { headers } = config
  const authToken = state.getToken()
  if (!isEmpty(authToken)) {
    headers.Authorization = `Bearer ${authToken}`
  }

  return { ...config, headers }
}

const handleError = (error) => {
  return Promise.reject(error)
}

axiosInstance.interceptors.request.use(addAuthToken, handleError)

export default axiosInstance
