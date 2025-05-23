import { toast } from "react-toastify"

import { setToken } from "@/utils"

import { authService } from "../services/auth"
import { constants } from "@/constants"

const register = (data, onSuccess = () => {}) => {
  return async (dispatch) => {
    dispatch({ type: constants.REGISTER_REQUEST })
    try {
      const response = await authService.register(data)
      const { code } = response.data
      if (code === 200) {
        dispatch({ type: constants.REGISTER_SUCCESS })
        toast.success("Đăng ký thành công")
        onSuccess()
      }
    } catch (error) {
      console.log(error)
      dispatch({ type: constants.REGISTER_FAILURE })
      toast.error(error?.data?.message)
    }
  }
}

const verify = (data, onSuccess = () => {}) => {
  return async (dispatch) => {
    dispatch({ type: constants.VERIFY_REQUEST })
    try {
      const response = await authService.verify(data)
      const { code } = response.data
      if (code === 200) {
        dispatch({ type: constants.VERIFY_SUCCESS })
        toast.success("Xác thực thành công")
        onSuccess()
      }
    } catch (error) {
      console.log(error)
      dispatch({ type: constants.VERIFY_FAILURE })
      toast.error(error?.data?.message)
    }
  }
}

const login = (payload, onSuccess = () => {}) => {
  return async (dispatch) => {
    dispatch({ type: constants.LOGIN_REQUEST })
    try {
      const response = await authService.login(payload)
      const { data, code } = response.data
      if (code === 200) {
        setToken(data.accessToken)
        dispatch({ type: constants.LOGIN_SUCCESS })
        toast.success("Đăng nhập thành công")
        onSuccess()
      }
    } catch (error) {
      console.error(error)
      dispatch({ type: constants.LOGIN_FAILURE })
      toast.error(error?.data?.message)
    }
  }
}

const getProfile = () => {
  return async (dispatch) => {
    dispatch({ type: constants.GET_PROFILE_REQUEST })
    try {
      const response = await authService.getProfile()
      const { data, code } = response.data
      if (code === 200) {
        dispatch({ type: constants.GET_PROFILE_SUCCESS, data })
      }
    } catch (error) {
      console.log(error)
      dispatch({ type: constants.GET_PROFILE_FAILURE })
      toast.error(error?.data?.message)
    }
  }
}

export const authAction = { register, login, getProfile, verify }
