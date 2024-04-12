import { toast } from "react-toastify"

import { constants } from "@/constants"
import { brandService } from "@/services/brand"

const getBrands = () => {
  return async (dispatch) => {
    dispatch({ type: constants.GET_BRAND_REQUEST })
    try {
      const response = await brandService.getBrands()
      const { code, data } = response.data
      if (code === 200) dispatch({ type: constants.GET_BRAND_SUCCESS, data })
    } catch (error) {
      dispatch({ type: constants.GET_BRAND_FAILURE })
      toast.error("Có lỗi xảy ra")
    }
  }
}

export const brandAction = {
  getBrands,
}
