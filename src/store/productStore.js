import { constants } from '@/constants'
import { productService } from '@/services/products'
import { handleNotification } from '@/utils'

import { create } from 'zustand'

const useProductStore = create((set, get) => ({
  products: [],
  productsTopView: [],
  productTopSold: [],
  product: null,
  page: 1,
  totalPages: 0,
  totalProducts: 0,
  isLoading: false,

  addProduct: async (payload, onSuccess = () => {}) => {
    set({ isLoading: true })
    try {
      const res = await productService.addProduct(payload)
      handleNotification(constants.NOTIFICATION_SUCCESS, res)
      onSuccess()
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  },

  getProducts: async (params = {}) => {
    set({ isLoading: true, error: null })
    try {
      const res = await productService.getProducts(params)
      const { content, totalPages, totalElements } = res.data
      set({ products: content, totalPages, totalProducts: totalElements })
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  },

  getProductById: async (id) => {
    set({ isLoading: true })
    try {
      const res = await productService.getProductById(id)
      set({ product: res.data })
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  },

  getProductTopView: async () => {
    set({ isLoading: true })
    try {
      const res = await productService.getProductTopView()
      set({ productsTopView: res.data.list })
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  },

  getProductTopSold: async () => {
    set({ isLoading: true })
    try {
      const res = await productService.getProductTopSold()
      set({ productTopSold: res.data.list })
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  },

  updateProduct: async (id, data, onSuccess) => {
    set({ isLoading: true })
    try {
      const res = await productService.updateProduct(id, data)
      handleNotification(constants.NOTIFICATION_SUCCESS, res)
      onSuccess()
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  },

  changeProductStatus: async (id, status) => {
    set({ isLoading: true })
    try {
      await productService.changeProductStatus(id, status)
      get().getProducts()
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  }
}))

export default useProductStore
