import { httpGet, httpPost, httpPut } from '../configs/api'

const getCarts = () => {
  return httpGet('/cart/get')
}

const addToCart = (data) => {
  return httpPost('/cart/addToCart', data)
}

const updateCart = (data) => {
  return httpPut(`/cart/update`, data)
}

export const cartService = {
  getCarts,
  addToCart,
  updateCart
}
