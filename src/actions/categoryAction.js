import { toast } from "react-toastify"

import { constants } from "@/constants"
import { categoryService } from "@/services/categories"

const getCategories = () => {
  return async (dispatch) => {
    dispatch({ type: constants.GET_CATEGORIES_REQUEST })
    try {
      const {
        data: { code, data },
      } = await categoryService.getCategories()

      if (code === 200) dispatch({ type: constants.GET_CATEGORIES_SUCCESS, data })
    } catch (error) {
      dispatch({ type: constants.GET_CATEGORIES_FAILURE })
      toast.error("Có lỗi xảy ra")
    }
  }
}

const createCategory = (data, onSuccess = () => {}) => {
  return async (dispatch) => {
    dispatch({ type: constants.ADD_CATEGORY_REQUEST })
    try {
      const {
        data: { code },
      } = await categoryService.createCategory(data)
      if (code === 201) {
        dispatch({ type: constants.ADD_CATEGORY_SUCCESS })
        dispatch(getCategories())
        onSuccess()
      }
    } catch (error) {
      dispatch({ type: constants.ADD_CATEGORY_FAILURE })
      toast.error("Có lỗi xảy ra")
    }
  }
}

const updateCategory = (id, data, onSuccess = () => {}) => {
  return async (dispatch) => {
    dispatch({ type: constants.UPDATE_CATEGORY_REQUEST })
    try {
      const {
        data: { code },
      } = await categoryService.updateCategory(id, data)
      if (code === 200) {
        dispatch({ type: constants.UPDATE_CATEGORY_SUCCESS })
        dispatch(getCategories())
        onSuccess()
      }
    } catch (error) {
      dispatch({ type: constants.UPDATE_CATEGORY_FAILURE })
      toast.error("Có lỗi xảy ra")
    }
  }
}

export const categoryAction = {
  getCategories,
  createCategory,
  updateCategory,
}
