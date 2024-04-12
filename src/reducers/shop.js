import { constants } from "@/constants"

const initialState = {
  loading: true,
  data: [],
}

export const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_SHOP_REQUEST:
    case constants.ADD_SHOP_REQUEST:
    case constants.UPDATE_SHOP_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case constants.GET_SHOP_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      }

    case constants.UPDATE_PRODUCT_SUCCESS:
    case constants.ADD_SHOP_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
