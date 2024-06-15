import { httpGet, httpPost, httpPut } from '../configs/api'

const getPromotions = () => {
  return httpGet('/promotion/get')
}

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
