import { httpGet, httpPost, httpPut } from '../configs/api'

const addProduct = (data) => {
  return httpPost('/product/create', data)
}

const getProducts = () => {
  return httpGet('/product/getAllProduct')
}

const updateProduct = (id, data) => {
  return httpPut(`/product/update/${id}`, data)
}

const getProductByName = (name) => {
  return httpGet(`/product?search=${name}`)
}

const getProductById = (id) => {
  return httpGet(`/product/detail/${id}`)
}

const changeProductStatus = (id, data) => {
  return httpPut(`/product/status/${id}`, data)
}

const getProductTopViewed = () => {
  return httpGet(`/product/top-viewed`)
}

const getProductTopSellers = () => {
  return httpGet(`/product/top-sellers`)
}

export const productService = {
  addProduct,
  getProducts,
  getProductByName,
  getProductById,
  updateProduct,
  changeProductStatus,
  getProductTopViewed,
  getProductTopSellers
}
