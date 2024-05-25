import CustomerFooter from '@/components/Footer'
import CustomerHeader from '@/components/Header/CustomerHeader'
import React from 'react'
import { Outlet } from 'react-router-dom'

const CustomerLayout = () => {
  return (
    <React.Fragment>
      <CustomerHeader />
      <Outlet />
      <CustomerFooter/>
    </React.Fragment>
  )
}

export default CustomerLayout
