import { constants } from "../constants"

const initialState = {
  loading: true,
  data: [],
}
export function brandReducer(state = initialState, action) {
  switch (action.type) {
    case constants.GET_BRAND_REQUEST:
    case constants.ADD_BRAND_REQUEST:
    case constants.UPDATE_BRAND_REQUEST:
      return {
        loading: true,
      }
    case constants.GET_BRAND_SUCCESS:
    case constants.ADD_BRAND_SUCCESS:
    case constants.UPDATE_BRAND_SUCCESS:
      return {
        loading: false,
        data: action.data,
      }
    case constants.GET_BRAND_FAILURE:
    case constants.ADD_BRAND_FAILURE:
    case constants.UPDATE_BRAND_FAILURE:
      return {
        loading: false,
      }
    default:
      return state
  }
}
