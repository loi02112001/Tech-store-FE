import { httpGet, httpPost } from '../configs/api'

const getProductBatches = () => {
  return httpGet('/product-batch/get')
}

const createProductBatch = (data) => {
  return httpPost('/product-batch/create', data)
}

export const productBatchService = { getProductBatches, createProductBatch }
