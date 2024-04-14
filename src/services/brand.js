import { httpGet, httpPost, httpPut } from "../configs/api"

const getBrands = () => {
  return httpGet("/brand/get")
}

const createBrand = (data) => {
  return httpPost("/brand/create", data)
}

const updateBrand = (id, data) => {
  return httpPut(`/brand/update/${id}`, data)
}

export const brandService = { getBrands, createBrand, updateBrand }
