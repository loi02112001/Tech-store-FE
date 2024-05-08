import { toast } from "react-toastify"

import { constants } from "@/constants"
import { brandService } from "@/services/brand"

const getBrands = () => {
  return async (dispatch) => {
    dispatch({ type: constants.GET_BRAND_REQUEST })
    try {
      const {
        data: { code, data },
      } = await brandService.getBrands()

      if (code === 200) dispatch({ type: constants.GET_BRAND_SUCCESS, data })
    } catch (error) {
      dispatch({ type: constants.GET_BRAND_FAILURE })
      toast.error("Có lỗi xảy ra")
    }
  }
}

const createBrand = (data, onSuccess = () => {}) => {
  return async (dispatch) => {
    dispatch({ type: constants.ADD_BRAND_REQUEST })
    try {
      const {
        data: { code },
      } = await brandService.createBrand(data)
      if (code === 201) {
        dispatch({ type: constants.ADD_BRAND_SUCCESS })
        dispatch(getBrands())
        onSuccess()
      }
    } catch (error) {
      dispatch({ type: constants.ADD_BRAND_FAILURE })
      toast.error("Có lỗi xảy ra")
    }
  }
}

const updateBrand = (id, data, onSuccess = () => {}) => {
  return async (dispatch) => {
    dispatch({ type: constants.UPDATE_BRAND_REQUEST })
    try {
      const {
        data: { code },
      } = await brandService.updateBrand(id, data)
      if (code === 200) {
        dispatch({ type: constants.UPDATE_BRAND_SUCCESS })
        dispatch(getBrands())
        onSuccess()
      }
    } catch (error) {
      dispatch({ type: constants.UPDATE_BRAND_FAILURE })
      toast.error("Có lỗi xảy ra")
    }
  }
}

export const brandAction = {
  getBrands,
  createBrand,
  updateBrand,
}
