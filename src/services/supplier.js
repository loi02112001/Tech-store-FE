import { httpGet, httpPost, httpPut } from '../configs/api'

const getSuppliers = () => {
  return httpGet('/supplier/get')
}

const createSupplier = (data) => {
  return httpPost('/supplier/add', data)
}

const updateSupplier = (id, data) => {
  return httpPut(`/supplier/update/${id}`, data)
}

export const supplierService = { getSuppliers, createSupplier, updateSupplier }
