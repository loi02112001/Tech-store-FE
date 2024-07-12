import { httpGet, httpPost, httpPut } from '../configs/api'

const getOrders = () => {
  return httpGet('/order/get')
}

const createOrder = (data) => {
  return httpPost('/order/create', data)
}

const getAllOrders = (data) => {
  return httpGet(`/order/getAll?status=${data}`)
}
const updateOrder = (id, data) => {
  return httpPut(`/order/update/${id}`, data)
}

const getStatisticOrder = () => httpGet('/order/statistic/order')

export const orderService = {
  getOrders,
  getAllOrders,
  createOrder,
  updateOrder,
  getStatisticOrder
}
