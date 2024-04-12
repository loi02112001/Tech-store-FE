import { toast } from "react-toastify"

import { shopService } from "@/services/shop"

const getInfoShop = () => {
  return async (dispatch) => {
    try {
      const response = await shopService.getInfoShop()
      const { code } = response.data
      if (code === 200) {
        dispatch({ type: "GET_SHOP_SUCCESS", data: response.data })
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
}


export const shopAction = {
  getInfoShop
}
