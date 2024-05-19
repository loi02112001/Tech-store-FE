import { constants } from '@/constants'
import { categoryService } from '@/services/categories'
import { handleNotification } from '@/utils'

import { create } from 'zustand'

const useCategoryStore = create((set, get) => ({
  categories: [],
  isLoading: false,

  getCategories: async () => {
    set({ isLoading: true })
    try {
      const res = await categoryService.getCategories()
      set({ categories: res.data })
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  },

  createCategory: async (data, onSuccess = () => {}) => {
    set({ isLoading: true })
    try {
      await categoryService.createCategory(data)
      await get().getCategories()
      onSuccess()
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  },

  updateCategory: async (id, data, onSuccess = () => {}) => {
    set({ isLoading: true })
    try {
      await categoryService.updateCategory(id, data)
      await get().getCategories()
      onSuccess()
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  }
}))

export default useCategoryStore
