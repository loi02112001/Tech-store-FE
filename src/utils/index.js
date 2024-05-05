import { decodeToken } from "react-jwt"

export const removeToken = () => {
  localStorage.removeItem("token")
}

export const setToken = (token) => {
  localStorage.setItem("token", token)
}

export const getToken = () => {
  return localStorage.getItem("token")
}

const getRolesFromToken = () => {
  const token = getToken()
  const dataFromToken = decodeToken(token)
  return dataFromToken?.roles || []
}

export const isManage = () => {
  const roles = getRolesFromToken()
  return roles.some((role) => role === "ADMIN" || role === "EMPLOYEE")
}

export const isCustomer = () => {
  const roles = getRolesFromToken()
  return roles.includes("CUSTOMER")
}
