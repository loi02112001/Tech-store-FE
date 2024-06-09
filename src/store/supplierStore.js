import { constants } from '@/constants'
import { supplierService } from '@/services/supplier'
import { handleNotification } from '@/utils'

import { create } from 'zustand'

const useSupplierStore = create((set, get) => ({
  suppliers: [],
  page: 1,
  pages: 0,
  totalItems: 0,
  isLoading: false,

  getSuppliers: async () => {
    set({ isLoading: true })
    try {
      const res = await supplierService.getSuppliers()
      const { list, pages, total } = res.data
      set({ suppliers: list, pages, totalItems: total })
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  },

  createSupplier: async (data, onSuccess = () => {}) => {
    set({ isLoading: true })
    try {
      await supplierService.createSupplier(data)
      await get().getSuppliers()
      onSuccess()
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  },

  updateSupplier: async (id, data, onSuccess = () => {}) => {
    set({ isLoading: true })
    try {
      await supplierService.updateSupplier(id, data)
      await get().getSuppliers()
      onSuccess()
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  }
}))

export default useSupplierStore
