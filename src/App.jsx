import React, { Suspense, useEffect } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"

import ScrollToTop from "./components/ScrollToTop/Index"
import { routes } from "./configs/routes"
import MainLayout from "./layouts/MainLayout"
import AddProduct from "./pages/Product/AddProduct"
import UpdateShop from "./pages/Shop"
import ProtectedRoute from "./routes/ProtectedRoute"
import { getToken } from "./utils"


const LoginPage = React.lazy(() => import("./pages/LoginPage/Index"))
const HomePage = React.lazy(() => import("./pages/HomePage/Index"))
const RegisterPage = React.lazy(() => import("./pages/RegisterPage/Index"))
const ListProduct = React.lazy(() => import("./pages/Product/ListProduct"))

export default function App() {
  const token = getToken()
  const { pathname } = useLocation()
  const navigate = useNavigate()

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
          <Route path={routes.login} element={<LoginPage />}></Route>
          <Route path={routes.register} element={<RegisterPage />}></Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainLayout />}>
              <Route path={routes.home} element={<HomePage />}></Route>
              <Route path={routes.shop} element={<UpdateShop />}></Route>
              <Route path={routes.addProduct} element={<AddProduct />}></Route>
              <Route path={routes.listProduct} element={<ListProduct />}></Route>
              <Route path={routes.editProduct} element={<AddProduct />}></Route>
            </Route>
            {/* Viết các router cần đăng nhập vào đây */}
          </Route>
        </Routes>
      </Suspense>
    </React.Fragment>
  )
}
