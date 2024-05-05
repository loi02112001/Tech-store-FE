import React, { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import ScrollToTop from "./components/ScrollToTop/Index"
import { routes } from "./configs/routes"
import MainLayout from "./layouts/MainLayout"
import ListBrand from "./pages/Brand/ListBrand"
import ListCategory from "./pages/Category/ListCategory"
import AddEmployee from "./pages/Employee/AddEmployee"
import PageNotFound from "./pages/PageNotFound/PageNotFound"
import AddProduct from "./pages/Product/AddProduct"
import UpdateShop from "./pages/Shop"
import ProtectedRoute from "./routes/ProtectedRoute"
import { isCustomer, isManage } from "./utils"

const LoginPage = React.lazy(() => import("./pages/LoginPage/Index"))
const ManageHomePage = React.lazy(() => import("./pages/HomePage/ManageHomePage"))
const RegisterPage = React.lazy(() => import("./pages/RegisterPage/Index"))
const ListProduct = React.lazy(() => import("./pages/Product/ListProduct"))
const CustomerHomePage = React.lazy(() => import("./pages/HomePage/CustomerHomePage"))

export default function App() {
  return (
    <React.Fragment>
      <ScrollToTop />
      <Suspense fallback={<></>}>
        <Routes>
          <Route path={routes.auth.login} element={<LoginPage />} />
          <Route path={routes.auth.register} element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path={routes.auth.home} element={isManage() ? <ManageHomePage /> : <CustomerHomePage />} />
            {isManage() && (
              <Route element={<MainLayout />}>
                <>
                  <Route path={routes.shop.shop} element={<UpdateShop />} />
                  <Route path={routes.product.add} element={<AddProduct />} />
                  <Route path={routes.product.list} element={<ListProduct />} />
                  <Route path={routes.product.edit} element={<AddProduct />} />
                  <Route path={routes.category.list} element={<ListCategory />} />
                  <Route path={routes.brand.list} element={<ListBrand />} />
                  <Route path={routes.employee.add} element={<AddEmployee />} />
                </>
              </Route>
            )}

            {isCustomer() && <></>}
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </React.Fragment>
  )
}
