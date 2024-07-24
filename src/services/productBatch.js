import { httpGet, httpPost } from '../configs/api'

const getProductBatches = (data) =>
  httpGet(`/product-batch/get${data?.page ? `?page=${data.page}` : ''}${data?.limit ? `&limit=${data.limit}` : ''}`)

const createProductBatch = (data) => {
  return httpPost('/product-batch/create', data)
}

export const productBatchService = { getProductBatches, createProductBatch }
