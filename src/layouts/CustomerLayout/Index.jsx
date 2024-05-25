import React from 'react'
import { Outlet } from 'react-router-dom'

import CustomerFooter from '@/components/Footer'
import CustomerHeader from '@/components/Header/CustomerHeader'

const CustomerLayout = () => {
  return (
    <React.Fragment>
      <CustomerHeader />
      <Outlet />
      <CustomerFooter />
    </React.Fragment>
  )
}

export default CustomerLayout
