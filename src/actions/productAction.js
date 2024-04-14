import { toast } from "react-toastify"

import { constants } from "@/constants"
import { productService } from "@/services/products"

const addProduct = (payload, onSuccess = () => {}) => {
  return async (dispatch) => {
    dispatch({ type: constants.ADD_PRODUCT_REQUEST })
    try {
      const response = await productService.addProduct(payload)
      const { code } = response.data
      if (code === 200) {
        dispatch({ type: constants.ADD_PRODUCT_SUCCESS })
        toast.success("Thêm sản phẩm thành công")
        onSuccess()
      }
    } catch (error) {
      dispatch({ type: constants.ADD_PRODUCT_FAILURE })
      toast.error("Có lỗi xảy ra")
    }
  }
}

const getProducts = () => {
  return async (dispatch) => {
    dispatch({ type: constants.GET_PRODUCTS_REQUEST })
    try {
      const response = await productService.getProducts()
      const { data, code } = response.data
      if (code === 200) dispatch({ type: constants.GET_PRODUCTS_SUCCESS, data })
    } catch (error) {
      console.error(error)
      dispatch({ type: constants.GET_PRODUCTS_FAILURE })
      toast.error("Có lỗi xảy ra")
    }
  }
}

const getProductById = (id) => {
  return async (dispatch) => {
    dispatch({ type: constants.GET_PRODUCT_BY_ID_REQUEST })
    try {
      const response = await productService.getProductById(id)
      const { code, data } = response.data
      if (code === 200) dispatch({ type: constants.GET_PRODUCT_BY_ID_SUCCESS, data })
    } catch (error) {
      console.error(error)
      dispatch({ type: constants.GET_PRODUCT_BY_ID_FAILURE })
      toast.error("Có lỗi xảy ra")
    }
  }
}

const updateProduct = (id, data, onSuccess) => {
  return async (dispatch) => {
    dispatch({ type: constants.UPDATE_PRODUCT_REQUEST })
    try {
      const response = await productService.updateProduct(id, data)
      const { code } = response.data
      if (code === 200) {
        dispatch({ type: constants.UPDATE_PRODUCT_SUCCESS })
        toast.success("Cập nhật sản phẩm thành công")
        onSuccess()
      }
    } catch (error) {
      console.error(error)
      dispatch({ type: constants.UPDATE_PRODUCT_FAILURE })
      toast.error("Có lỗi xảy ra")
    }
  }
}

const changeProductStatus = (id, status) => {
  return async (dispatch) => {
    dispatch({ type: constants.CHANGE_PRODUCT_STATUS_REQUEST })
    try {
      const response = await productService.changeProductStatus(id, status)
      const { code } = response.data
      if (code === 200) {
        dispatch({ type: constants.CHANGE_PRODUCT_STATUS_SUCCESS })
        dispatch(getProducts())
      }
    } catch (error) {
      dispatch({ type: constants.CHANGE_PRODUCT_STATUS_FAILURE })
      console.error(error)
      toast.error("Có lỗi xảy ra")
    }
  }
}

export const productActions = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  changeProductStatus,
}
