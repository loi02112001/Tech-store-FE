import React, { Suspense, useEffect } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"

import ScrollToTop from "./components/ScrollToTop/Index"
import { routes } from "./configs/routes"
import MainLayout from "./layouts/MainLayout"
import ListCategory from "./pages/Category/ListCategory"
import AddProduct from "./pages/Product/AddProduct"
import UpdateShop from "./pages/Shop"
import ProtectedRoute from "./routes/ProtectedRoute"
import { getToken } from "./utils"
import ListBrand from "./pages/Brand/ListBrand"

const LoginPage = React.lazy(() => import("./pages/LoginPage/Index"))
const HomePage = React.lazy(() => import("./pages/HomePage/Index"))
const RegisterPage = React.lazy(() => import("./pages/RegisterPage/Index"))
const ListProduct = React.lazy(() => import("./pages/Product/ListProduct"))

export default function App() {
  const token = getToken()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { auth, product, shop, category, brand } = routes

  useEffect(() => {
    if (token) {
      if (pathname === routes.login || pathname === routes.register) {
        navigate("/")
      }
    }
  }, [token])

  return (
    <React.Fragment>
      <ScrollToTop />
      <Suspense fallback={<></>}>
        <Routes>
          <Route path={auth.login} element={<LoginPage />} />
          <Route path={auth.register} element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainLayout />}>
              <Route path={auth.home} element={<HomePage />} />
              <Route path={shop.shop} element={<UpdateShop />} />
              <Route path={product.add} element={<AddProduct />} />
              <Route path={product.list} element={<ListProduct />} />
              <Route path={product.edit} element={<AddProduct />} />
              <Route path={category.list} element={<ListCategory />} />
              <Route path={brand.list} element={<ListBrand />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </React.Fragment>
  )
}
