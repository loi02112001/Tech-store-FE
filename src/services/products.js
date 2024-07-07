import { httpDelete, httpGet, httpPost, httpPut } from '../configs/api'

const addProduct = (data) => {
  return httpPost('/product/create', data)
}

const getListProducts = (data) => {
  return httpGet(`/product/getListProduct?page=${data.page}&limit=${data.limit}`)
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

const getProductTopView = () => {
  return httpGet(`/product/top-view`)
}

const getProductTopSold = () => {
  return httpGet(`/product/top-sold`)
}

const deleteProduct = (id) => {
  return httpDelete(`/product/delete/${id}`)
}

const ratingProduct = (data) => {
  return httpPost('/product/rating', data)
}

export const productService = {
  addProduct,
  getListProducts,
  getProductByName,
  getProductById,
  updateProduct,
  changeProductStatus,
  getProductTopView,
  getProductTopSold,
  deleteProduct,
  ratingProduct
}
