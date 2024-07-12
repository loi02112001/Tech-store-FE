import { httpGet, httpPost, httpPut } from '../configs/api'

const register = (data) => {
  return httpPost('/register', data)
}

const login = (data) => {
  return httpPost('/login', data)
}

const refreshToken = (data) => {
  return httpPost('/refreshToken', data)
}

const getProfile = () => {
  return httpGet('/user/getProfile')
}

const updateProfile = (data) => {
  return httpPut('/user/update', data)
}

const verify = (data) => {
  return httpPost('/verifyUserAccount', data)
}

export const userService = { register, login, refreshToken, getProfile, verify, updateProfile }
