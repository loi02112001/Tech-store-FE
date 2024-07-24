import { constants } from '@/constants'
import { productBatchService } from '@/services/productBatch'
import { handleNotification } from '@/utils'

import { create } from 'zustand'

const useProductBatchStore = create((set, get) => ({
  productBatches: [],
  pages: 0,
  totalItems: 0,
  isLoading: false,

  getProductBatches: async (data) => {
    set({ isLoading: true })
    try {
      const res = await productBatchService.getProductBatches(data)
      const { list, pages, total } = res.data
      set({ productBatches: list, pages, totalItems: total })
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  },

  createProductBatch: async (data, onSuccess = () => {}) => {
    set({ isLoading: true })
    try {
      await productBatchService.createProductBatch(data)
      await get().getProductBatches()
      onSuccess()
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  }
}))

export default useProductBatchStore
