import { constants } from '@/constants'
import { brandService } from '@/services/brand'
import { handleNotification } from '@/utils'

import { create } from 'zustand'

const useBrandStore = create((set, get) => ({
  brands: [],
  isLoading: false,

  getBrands: async () => {
    set({ isLoading: true })
    try {
      const res = await brandService.getBrands()
      set({ brands: res.data })
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  },

  createBrand: async (data, onSuccess = () => {}) => {
    set({ isLoading: true })
    try {
      const res = await brandService.createBrand(data)
      handleNotification(constants.NOTIFICATION_SUCCESS, res)
      await get().getBrands()
      onSuccess()
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  },

  updateBrand: async (id, data, onSuccess = () => {}) => {
    set({ isLoading: true })
    try {
      const res = await brandService.updateBrand(id, data)
      handleNotification(constants.NOTIFICATION_SUCCESS, res)
      await get().getBrands()
      onSuccess()
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  }
}))

export default useBrandStore
