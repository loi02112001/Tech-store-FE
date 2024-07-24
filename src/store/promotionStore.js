import { constants } from '@/constants'
import { promotionService } from '@/services/promotion'
import { handleNotification } from '@/utils'

import { create } from 'zustand'

const usePromotionStore = create((set, get) => ({
  promotions: [],
  pages: 0,
  totalItems: 0,
  isLoading: false,

  getPromotions: async (data) => {
    set({ isLoading: true })
    try {
      const res = await promotionService.getPromotions(data)
      const { list, pages, total } = res.data
      set({ promotions: list, pages, totalItems: total })
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  },

  createPromotion: async (data, onSuccess = () => {}) => {
    set({ isLoading: true })
    try {
      await promotionService.createPromotion(data)
      await get().getPromotions()
      onSuccess()
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  },

  updatePromotion: async (id, data, onSuccess = () => {}) => {
    set({ isLoading: true })
    try {
      const res = await promotionService.updatePromotion(id, data)
      handleNotification(constants.NOTIFICATION_SUCCESS, res)
      await get().getPromotions()
      onSuccess()
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  },

  updatePromotionStatus: async (id, data) => {
    set({ isLoading: true })
    try {
      await promotionService.updatePromotionStatus(id, data)
      await get().getPromotions()
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  }
}))

export default usePromotionStore
