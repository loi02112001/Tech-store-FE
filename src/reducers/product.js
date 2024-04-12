import { constants } from "@/constants"

const initialState = {
  loading: true,
  productList: [],
  page: 1,
  totalPage: 1,
  totalProduct: 0,
  productInfo: {},
}

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_PRODUCTS_REQUEST:
    case constants.UPDATE_PRODUCT_REQUEST:
    case constants.GET_PRODUCT_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case constants.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        productList: action.data.content,
        page: action.data.pageable.pageNumber + 1,
        totalProduct: action.data.totalElements,
        totalPage: action.data.totalPages,
        loading: false,
      }
    case constants.GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        productInfo: action.data,
        loading: false,
      }
    default:
      return state
  }
}
