import { httpDelete, httpGet, httpPost, httpPut } from '../configs/api'

const getSuppliers = (data) => {
  return httpGet(`/supplier/get${data?.page ? `?page=${data.page}` : ''}${data?.limit ? `&limit=${data.limit}` : ''}`)
}

const createSupplier = (data) => {
  return httpPost('/supplier/add', data)
}

const updateSupplier = (id, data) => {
  return httpPut(`/supplier/update/${id}`, data)
}

const deleteSupplier = (id) => {
  return httpDelete(`/supplier/delete/${id}`)
}

export const supplierService = { getSuppliers, createSupplier, updateSupplier, deleteSupplier }
