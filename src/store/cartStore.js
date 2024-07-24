import { constants } from '@/constants'
import { cartService } from '@/services/cart'
import { handleNotification } from '@/utils'

import { create } from 'zustand'

const useCartStore = create((set, get) => ({
  carts: [],
  isLoading: false,

  getCarts: async () => {
    set({ isLoading: true })
    try {
      const res = await cartService.getCarts()
      set({ carts: res.data.map((item) => ({ ...item, checked: false })) })
    } catch (error) {
      console.error(error.message)
    } finally {
      set({ isLoading: false })
    }
  },
  setCartItems: (data) => {
    set({ carts: data })
  },

  addToCart: async (data, onSuccess = () => {}) => {
    set({ isLoading: true })
    try {
      const res = await cartService.addToCart(data)
      handleNotification(constants.NOTIFICATION_SUCCESS, res)
      await get().getCarts()
      onSuccess()
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  },

  updateCart: async (data, onSuccess = () => {}) => {
    set({ isLoading: true })
    try {
      await cartService.updateCart(data)
      await get().getCarts()
      onSuccess()
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  }
}))

export default useCartStore
