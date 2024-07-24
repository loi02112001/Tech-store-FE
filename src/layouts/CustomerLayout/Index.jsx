import { Navigate, Outlet } from 'react-router-dom'

import CustomerFooter from '@/components/Footer'
import CustomerHeader from '@/components/Header/CustomerHeader'
import { isManage, removeToken } from '@/utils'

const CustomerLayout = () => {
  if (isManage()) {
    removeToken('token')
    return <Navigate to="/login" />
  }
  return (
    <>
      <CustomerHeader />
      <Outlet />
      <CustomerFooter />
    </>
  )
}

export default CustomerLayout
