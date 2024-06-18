import { decodeToken } from 'react-jwt'
import { toast } from 'react-toastify'

export const removeToken = () => {
  localStorage.removeItem('token')
}

export const setToken = (token) => {
  localStorage.setItem('token', token)
}

export const getToken = () => {
  return localStorage.getItem('token')
}

const getRolesFromToken = () => {
  const token = getToken()
  const dataFromToken = decodeToken(token)
  return dataFromToken?.roles || []
}

export const isManage = () => {
  const roles = getRolesFromToken()
  return roles.some((role) => role === 'ADMIN' || role === 'EMPLOYEE')
}

export const isCustomer = () => {
  const roles = getRolesFromToken()
  return roles.includes('CUSTOMER')
}

export const handleNotification = (type, res) => {
  toast[type](res.message)
}

export const formatMoneyVND = (amount = 0) => {
  let amountStr = amount.toString().replace(/[^0-9.-]+/g, '')
  let [whole, decimal] = amountStr.split('.')
  whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  if (!decimal) {
    decimal = '00'
  } else if (decimal.length === 1) {
    decimal = decimal + '0'
  }

  return `${whole}.${decimal} đ`
}

export const isEmptyUsingKeys = (obj) => Object.keys(obj).length === 0
