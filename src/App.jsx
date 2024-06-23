import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import ScrollToTop from './components/ScrollToTop/Index'
import { routes } from './configs/routes'
import AdminLayout from './layouts/AdminLayout/Index'
import CustomerLayout from './layouts/CustomerLayout/Index'
// import PageNotFound from './pages/PageNotFound/PageNotFound'
import ProtectedRoute from './routes/ProtectedRoute'
import { isCustomer, isManage } from './utils'

const LoginPage = React.lazy(() => import('./pages/LoginPage/Index'))
const RegisterPage = React.lazy(() => import('./pages/RegisterPage/Index'))
// admin
const ManageHomePage = React.lazy(() => import('./pages/HomePage/ManageHomePage'))
const ListProduct = React.lazy(() => import('./pages/Product/ListProduct'))
const AddProduct = React.lazy(() => import('./pages/Product/AddProduct'))
const ListBrand = React.lazy(() => import('./pages/Brand/ListBrand'))
const ListCategory = React.lazy(() => import('./pages/Category/ListCategory'))
const ListSupplier = React.lazy(() => import('./pages/Supplier/ListSupplier'))
const ListProductBatch = React.lazy(() => import('./pages/ProductBatch/ListProductBatch'))
const ListPromotion = React.lazy(() => import('./pages/Promotion/ListPromotion'))
const ListVoucher = React.lazy(() => import('./pages/Voucher/ListVoucher'))
const AddEditEmployee = React.lazy(() => import('./pages/Employee/AddEditEmployee'))
const ListEmployee = React.lazy(() => import('./pages/Employee/ListEmployee'))
const CartCheckout = React.lazy(() => import('./pages/Cart/CartCheckout'))
const Purchase = React.lazy(() => import('./pages/Purchase/Purchase'))

// customer
const AllProductsPage = React.lazy(() => import('./pages/AllProductsPage/AllProductsPage'))
const CustomerHomePage = React.lazy(() => import('./pages/HomePage/CustomerHomePage'))
const CartPage = React.lazy(() => import('./pages/Cart/CartPage'))
const ProductDetail = React.lazy(() => import('./pages/Product/ProductDetail'))

export default function App() {
  return (
    <React.Fragment>
      <ScrollToTop />
      <Suspense fallback={<></>}>
        <Routes>
          <Route path={routes.auth.login} element={<LoginPage />} />
          <Route path={routes.auth.register} element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            {isManage() && (
              <Route element={<AdminLayout />}>
                <>
                  <Route path={routes.auth.home} element={<ManageHomePage />} />
                  <Route path={routes.product.add} element={<AddProduct />} />
                  <Route path={routes.product.list} element={<ListProduct />} />
                  <Route path={routes.product.edit} element={<AddProduct />} />
                  <Route path={routes.category.list} element={<ListCategory />} />
                  <Route path={routes.brand.list} element={<ListBrand />} />
                  <Route path={routes.supplier.list} element={<ListSupplier />} />
                  <Route path={routes.productBatch.list} element={<ListProductBatch />} />
                  <Route path={routes.promotion.list} element={<ListPromotion />} />
                  <Route path={routes.voucher.list} element={<ListVoucher />} />
                  <Route path={routes.employee.list} element={<ListEmployee />} />
                  <Route path={routes.employee.add} element={<AddEditEmployee />} />
                  <Route path={routes.employee.edit} element={<AddEditEmployee />} />
                </>
              </Route>
            )}

            {isCustomer() && (
              <Route element={<CustomerLayout />}>
                <Route path={routes.auth.home} element={<CustomerHomePage />} />
                <Route path={routes.cart.list} element={<CartPage />} />
                <Route path={routes.cart.checkout} element={<CartCheckout />} />
                <Route path={routes.allProducts} element={<AllProductsPage />} />
                <Route path={routes.product.detail} element={<ProductDetail />} />
                <Route path={routes.purchase.list} element={<Purchase />} />
              </Route>
            )}
            {/* <Route path="*" element={<PageNotFound />} /> */}
          </Route>
        </Routes>
      </Suspense>
    </React.Fragment>
  )
}
