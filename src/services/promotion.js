import { httpGet, httpPost, httpPut } from '../configs/api'

const getPromotions = (data) =>
  httpGet(`/promotion/get${data?.page ? `?page=${data.page}` : ''}${data?.limit ? `&limit=${data.limit}` : ''}`)

const createPromotion = (data) => {
  return httpPost('/promotion/create', data)
}

const updatePromotion = (id, data) => {
  return httpPut(`/promotion/update/${id}`, data)
}

const updatePromotionStatus = (id, data) => {
  return httpPut(`/promotion/update/status/${id}`, data)
}

export const promotionService = {
  getPromotions,
  createPromotion,
  updatePromotion,
  updatePromotionStatus
}
