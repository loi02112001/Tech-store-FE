import { authReducer } from "./auth"
import { brandReducer } from "./brand"
import { categoryReducer } from "./category"
import { productReducer } from "./product"
import { shopReducer } from "./shop"
import { combineReducers } from "redux"

const rootReducer = combineReducers({
  auth: authReducer,
  shops: shopReducer,
  products: productReducer,
  categories: categoryReducer,
  brands: brandReducer
})

export default rootReducer
