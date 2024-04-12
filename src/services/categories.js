import { httpGet } from "../configs/api"

const getCategories = () => {
  return httpGet("/category/get")
}

export const categoryService = { getCategories }
