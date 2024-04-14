import { getToken, removeToken } from "@/utils"

import axios from "axios"

const baseURL = import.meta.env.VITE_API_BASE_URL

const axiosClient = axios.create({
  baseURL,
})

axiosClient.interceptors.request.use(
  (config) => {
    const token = getToken("token")
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data"
    } else {
      config.headers["Content-Type"] = "application/json"
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axios.interceptors.response.use(
  (response) => {
    const { data } = response
    return {
      data,
    }
  },
  (error) => {
    if (error.response.code === 401) {
      removeToken()
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// let isRefreshing = false

// axiosClient.interceptors.response.use(
//   (response) => {
//     return response.data
//   },
//   async (error) => {
//     const originalRequest = error.config
//     const refreshToken = localStorage.getItem("token")

//     if (error.response.code === 401 && refreshToken) {
//       if (!isRefreshing) {
//         isRefreshing = true

//         try {
//           const { data: res } = await axios.post(
//             `${baseURL}/refreshToken`,
//             { refresh_token: refreshToken },
//             { headers: { token } },
//           )

//           if (res.code !== 401) {
//             const { token: newToken, refresh_token: newRefreshToken } = res.data

//             Cookies.set("token", newToken)
//             Cookies.set("refreshToken", newRefreshToken)

//             originalRequest.headers.token = newToken

//             return axiosClient(originalRequest)
//           }
//         } catch (error) {
//           removeToken()
//           window.location.href = "/login"
//         } finally {
//           isRefreshing = false
//         }
//       }

//       return new Promise((resolve, reject) => {
//         const retryOriginalRequest = () => {
//           axiosClient(originalRequest).then(resolve).catch(reject)
//         }

//         const intervalId = setInterval(() => {
//           if (!isRefreshing) {
//             clearInterval(intervalId)
//             retryOriginalRequest()
//           }
//         }, 100)
//       })
//     } else if (error.response.code === 401) {
//       removeToken()
//       window.location.href = "/login"
//     }
//     return Promise.reject(error.response)
//   },
// )

export default axiosClient
