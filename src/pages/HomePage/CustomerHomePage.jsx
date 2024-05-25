import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import CustomerHeader from '@/components/Header/CustomerHeader'
import CustomerHero from '@/components/Header/CustomerHero'
import useProductStore from '@/store/productStore'

import ProductSlider from './components/ProductSlider'

function CustomerHomePage() {
  const { productsTopViewed, getProductTopViewed } = useProductStore()

  useEffect(() => {
    getProductTopViewed()
  }, [])

  return (
    <>
      <CustomerHeader />
      <Outlet />
      <CustomerHero />
      <ProductSlider products={productsTopViewed} />
    </>
  )
}

export default CustomerHomePage
