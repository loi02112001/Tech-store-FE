import { constants } from "../constants"

const initialState = {
  loading: true,
  data: [],
}
export function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case constants.GET_CATEGORIES_REQUEST:
    case constants.ADD_CATEGORY_REQUEST:
    case constants.UPDATE_CATEGORY_REQUEST:
      return {
        loading: true,
      }
    case constants.GET_CATEGORIES_SUCCESS:
    case constants.ADD_CATEGORY_SUCCESS:
    case constants.UPDATE_CATEGORY_SUCCESS:
      return {
        loading: false,
        data: action.data,
      }
    case constants.GET_CATEGORIES_FAILURE:
    case constants.ADD_CATEGORY_FAILURE:
    case constants.UPDATE_CATEGORY_FAILURE:
      return {
        loading: false,
      }
    default:
      return state
  }
}
