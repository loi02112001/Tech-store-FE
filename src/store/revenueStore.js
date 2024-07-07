import { constants } from '@/constants'
import { revenueService } from '@/services/revenue'
import { handleNotification } from '@/utils'

import { create } from 'zustand'

const useRevenueStore = create((set) => ({
  revenues: [],
  page: 1,
  isLoading: false,

  getRevenueByWeek: async (data) => {
    set({ isLoading: true })
    try {
      const res = await revenueService.getRevenueByWeek(data)
      set({ revenues: res.data })
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  },
  getRevenueByYear: async (data) => {
    set({ isLoading: true })
    try {
      const res = await revenueService.getRevenueByYear(data)
      set({ revenues: res.data })
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  }
}))

export default useRevenueStore
