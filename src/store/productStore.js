import { constants } from '@/constants'
import { productService } from '@/services/products'
import { handleNotification } from '@/utils'

import { create } from 'zustand'

const useProductStore = create((set, get) => ({
  products: [],
  productsTopView: [],
  productsTopSold: [],
  product: null,
  page: 1,
  pages: 0,
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

  getListProducts: async (data = {}) => {
    set({ isLoading: true, error: null })
    try {
      const res = await productService.getListProducts(data)
      const { list, pages, total } = res.data
      set({ products: list, pages, totalProducts: total })
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

  getProductsTopSold: async () => {
    set({ isLoading: true })
    try {
      const res = await productService.getProductsTopSold()
      set({ productsTopSold: res.data.list })
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
      get().getListProducts()
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  },

  deleteProduct: async (id) => {
    set({ isLoading: true })
    try {
      const res = await productService.deleteProduct(id)
      handleNotification(constants.NOTIFICATION_SUCCESS, res)
      get().getListProducts()
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  },

  ratingProduct: async (data) => {
    set({ isLoading: true })
    try {
      await productService.ratingProduct(data)
      get().getProductById(data.productId)
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  }
}))

export default useProductStore
