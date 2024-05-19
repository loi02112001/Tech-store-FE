import { getToken } from '@/utils'

import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL

const axiosClient = axios.create({
  baseURL
})

axiosClient.interceptors.request.use(
  (config) => {
    const token = getToken('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data'
    } else {
      config.headers['Content-Type'] = 'application/json'
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response?.data) {
      return Promise.reject(error.response.data)
    }
    return Promise.reject(error)
  }
)

export default axiosClient
