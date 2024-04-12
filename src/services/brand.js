import { httpGet } from "../configs/api"

const getBrands = () => {
  return httpGet("/brand/get")
}

export const brandService = { getBrands }