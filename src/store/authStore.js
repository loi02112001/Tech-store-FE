import { toast } from 'react-toastify'

import { constants } from '@/constants'
import { handleNotification, setToken } from '@/utils'

import { authService } from '../services/auth'
import { create } from 'zustand'

const useAuthStore = create((set) => ({
  isLoading: false,
  profile: null,

  register: async (data, onSuccess = () => {}) => {
    set({ isLoading: true })
    try {
      const res = await authService.register(data)
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
      await authService.verify(data)
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
      const response = await authService.login(payload)
      const { data } = response.data
      setToken(data.accessToken)
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
      const response = await authService.getProfile()
      const { data } = response.data
      set({ profile: data })
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  }
}))

export default useAuthStore
