import { toast } from 'react-toastify'

import { constants } from '@/constants'
import { handleNotification, setToken } from '@/utils'

import { userService } from '../services/user'
import { create } from 'zustand'

const useUserStore = create((set, get) => ({
  user: null,
  isLoading: false,

  register: async (data, onSuccess = () => {}) => {
    set({ isLoading: true })
    try {
      const res = await userService.register(data)
      handleNotification(constants.NOTIFICATION_SUCCESS, res)
      onSuccess()
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  },

  verify: async (data, onSuccess = () => {}) => {
    set({ isLoading: true })
    try {
      await userService.verify(data)
      toast.success('Xác thực thành công')
      onSuccess()
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  },

  login: async (payload) => {
    set({ isLoading: true })
    try {
      const res = await userService.login(payload)
      setToken(res.data.accessToken)
      window.location.href = '/'
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  },

  getProfile: async () => {
    set({ isLoading: true })
    try {
      const res = await userService.getProfile()
      set({ user: res.data })
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  },

  updateProfile: async (data) => {
    set({ isLoading: true })
    try {
      await userService.updateProfile(data)
      await get().getProfile()
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  }
}))

export default useUserStore
