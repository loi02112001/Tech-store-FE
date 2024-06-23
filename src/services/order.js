import { httpGet, httpPost, httpPut } from '../configs/api'

const getOrders = () => {
  return httpGet('/order/get')
}

const createOrder = (data) => {
  return httpPost('/order/create', data)
}

const getAllOrders = () => {
  return httpGet('/order/getAll')
}
const updateOrder = (id, data) => {
  return httpPut(`/order/update/${id}`, data)
}

export const orderService = { getOrders, getAllOrders, createOrder, updateOrder }
