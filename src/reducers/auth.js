import { constants } from "@/constants"

const initialState = {
  loading: false,
  data: [],
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_PROFILE_REQUEST:
    case constants.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case constants.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case constants.GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      }
    case constants.LOGIN_FAILURE:
    case constants.GET_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
      }
    default:
      return {...state}
  }
}
