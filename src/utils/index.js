export const removeToken = () => {
  localStorage.removeItem("token")
}

export const setToken = (token) => {
  localStorage.setItem("token",token)
}

export const getToken = () => {
  return localStorage.getItem("token")
}
