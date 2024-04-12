import { constants } from "@/constants"

const initialState = {
  loading: false,
  data: [],
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case constants.GET_PROFILE_SUCCESS:
      return {
        ...state,
        data: action.data,
      }
    default:
      return state
  }
}
