import { httpGet, httpPost } from '../configs/api'

const createVoucher = (data) => {
  return httpPost('/voucher/create', data)
}

const getVoucherValid = () => {
  return httpGet('/voucher/getVoucherValid')
}

const getAllVoucher = () => {
  return httpGet('/voucher/getAll')
}

const getVoucherByCode = (data) => {
  return httpGet('/voucher/getByCode', data)
}

export const voucherService = { createVoucher, getVoucherValid, getAllVoucher, getVoucherByCode }
