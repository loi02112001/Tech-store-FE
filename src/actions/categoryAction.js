import { toast } from "react-toastify"

import { constants } from "@/constants"
import { categoryService } from "@/services/categories"

const getCategories = () => {
  return async (dispatch) => {
    dispatch({ type: constants.GET_CATEGORIES_REQUEST })
    try {
      const response = await categoryService.getCategories()
      const { code,data } = response.data
      if (code === 200) dispatch({ type: constants.GET_CATEGORIES_SUCCESS, data})
    } catch (error) {
      dispatch({ type: constants.GET_CATEGORIES_FAILURE })
      toast.error("Có lỗi xảy ra")
    }
  }
}

export const categoryAction = {
  getCategories,
}
