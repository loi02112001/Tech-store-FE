import { constants } from '@/constants'
import { orderService } from '@/services/order'
import { handleNotification } from '@/utils'

import { create } from 'zustand'

const useOrderStore = create((set, get) => ({
  orders: [],
  orderStatus: [],
  isLoading: false,

  getAllOrders: async () => {
    set({ isLoading: true })
    try {
      const res = await orderService.getAllOrders()
      set({ orders: res.data })
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  },
  setOrderItems: (data) => {
    set({ orders: data })
  },

  createOrder: async (data, onSuccess = () => {}) => {
    set({ isLoading: true })

    try {
      await orderService.createOrder(data)
      await get().getAllOrders()
      onSuccess()
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  },

  updateOrder: async (data, onSuccess = () => {}) => {
    set({ isLoading: true })
    try {
      await orderService.updateOrder(data)
      await get().getOrders()
      onSuccess()
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  },

  getStatisticOrder: async () => {
    set({ isLoading: true })
    try {
      const res = await orderService.getStatisticOrder()
      set({ orderStatus: res.data })
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  }
}))

export default useOrderStore
