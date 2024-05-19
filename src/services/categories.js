import { httpGet, httpPost, httpPut } from '../configs/api'

const getCategories = () => {
  return httpGet('/category/get')
}

const getCategoryById = (id) => {
  return httpGet(`/category/${id}`)
}

const createCategory = (data) => {
  return httpPost('/category/create', data)
}

const updateCategory = (id, data) => {
  return httpPut(`/category/update/${id}`, data)
}

export const categoryService = { getCategories, getCategoryById, createCategory, updateCategory }
