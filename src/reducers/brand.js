import { constants } from "@/constants"

const initialState = {
  loading: false,
  data: [],
}

export const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_BRAND_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case constants.GET_BRAND_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      }
    case constants.GET_BRAND_FAILURE:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
