import { Outlet } from 'react-router-dom'

import CustomerFooter from '@/components/Footer'
import CustomerHeader from '@/components/Header/CustomerHeader'

const CustomerLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <CustomerHeader />
      <Outlet />
      <CustomerFooter />
    </div>
  )
}

export default CustomerLayout
