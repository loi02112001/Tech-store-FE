import { httpDelete, httpGet, httpPost, httpPut } from "../configs/api"

const addProduct = (data) => {
  return httpPost("/product/create", data)
}

const getProducts = () => {
  return httpGet("/product/get")
}

const updateProduct = (id, data) => {
  return httpPut(`/product/${id}`, data)
}

const getProductByName = (name) => {
  return httpGet(`/product?search=${name}`)
}

const getProductById = (id) => {
  return httpGet(`/product/${id}`)
}

const changeProductStatus = (id, data) => {
  return httpPut(`/product/status/${id}`, data)
}

export const productService = {
  addProduct,
  getProducts,
  getProductByName,
  getProductById,
  updateProduct,
  changeProductStatus,
}
