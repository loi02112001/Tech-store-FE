import { constants as c } from "../constants"

const initialState = {
  loading: true,
  data: [],
}
export function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case c.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        data: action.data,
      }
    default:
      return state
  }
}
