// src/App.js
import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import ScrollToTop from './components/ScrollToTop/Index'
import { routes } from './configs/routes'
import AdminLayout from './layouts/AdminLayout/Index'
import CustomerLayout from './layouts/CustomerLayout/Index'
import ProtectedRoute from './routes/ProtectedRoute'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

const LoginPage = React.lazy(() => import('./pages/LoginPage/Index'))
const RegisterPage = React.lazy(() => import('./pages/RegisterPage/Index'))
const CustomerHomePage = React.lazy(() => import('./pages/HomePage/CustomerHomePage'))
const CustomerProductDetailPage = React.lazy(() => import('./pages/Product/ProductDetail'))
const CustomerProductListPage = React.lazy(() => import('./pages/AllProductsPage/AllProductsPage'))
const PageNotFound = React.lazy(() => import('./pages/PageNotFound/PageNotFound'))

// Trang Admin
const adminRoutes = [
  { path: routes.auth.homeAdmin, element: React.lazy(() => import('./pages/HomePage/ManageHomePage')) },
  { path: routes.product.add, element: React.lazy(() => import('./pages/Product/AddProduct')) },
  { path: routes.product.list, element: React.lazy(() => import('./pages/Product/ListProduct')) },
  { path: routes.product.edit, element: React.lazy(() => import('./pages/Product/AddProduct')) },
  { path: routes.category.list, element: React.lazy(() => import('./pages/Category/ListCategory')) },
  { path: routes.brand.list, element: React.lazy(() => import('./pages/Brand/ListBrand')) },
  { path: routes.supplier.list, element: React.lazy(() => import('./pages/Supplier/ListSupplier')) },
  { path: routes.productBatch.list, element: React.lazy(() => import('./pages/ProductBatch/ListProductBatch')) },
  { path: routes.promotion.list, element: React.lazy(() => import('./pages/Promotion/ListPromotion')) },
  { path: routes.voucher.list, element: React.lazy(() => import('./pages/Voucher/ListVoucher')) },
  { path: routes.employee.list, element: React.lazy(() => import('./pages/Employee/ListEmployee')) },
  { path: routes.employee.add, element: React.lazy(() => import('./pages/Employee/AddEditEmployee')) },
  { path: routes.employee.edit, element: React.lazy(() => import('./pages/Employee/AddEditEmployee')) },
  { path: routes.employee.profile, element: React.lazy(() => import('./pages/Profile/Profile')) }
]

// Trang Customer
const customerRoutes = [
  { path: routes.cart.list, element: React.lazy(() => import('./pages/Cart/CartPage')) },
  { path: routes.cart.checkout, element: React.lazy(() => import('./pages/Cart/CartCheckout')) },
  { path: routes.purchase.list, element: React.lazy(() => import('./pages/Purchase/Purchase')) },
  { path: routes.user.profile, element: React.lazy(() => import('./pages/Profile/Profile')) }
]

const loadingIndicator = <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} fullscreen />

function App() {
  return (
    <React.Fragment>
      <ScrollToTop />
      <Suspense fallback={loadingIndicator}>
        <Routes>
          <Route path={routes.auth.login} element={<LoginPage />} />
          <Route path={routes.auth.register} element={<RegisterPage />} />
          <Route element={<CustomerLayout />}>
            <Route path={routes.auth.home} element={<CustomerHomePage />} />
            <Route path={routes.product.detail} element={<CustomerProductDetailPage />} />
            <Route path={routes.product.all} element={<CustomerProductListPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              {adminRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={<route.element />} />
              ))}
            </Route>
            <Route element={<CustomerLayout />}>
              {customerRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={<route.element />} />
              ))}
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </React.Fragment>
  )
}

export default App
