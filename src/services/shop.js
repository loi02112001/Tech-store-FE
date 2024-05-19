import { httpGet, httpPost, httpPut } from '@/configs/api'

const getInfoShop = () => {
  return httpGet('/shop')
}

const addShop = () => {
  return httpPost('/shop')
}

const updateShop = (data) => {
  return httpPut('/shop', data)
}

export const shopService = { getInfoShop, addShop, updateShop }
