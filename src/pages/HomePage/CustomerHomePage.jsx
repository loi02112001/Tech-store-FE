import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import CustomerHeader from '@/components/Header/CustomerHeader'
import CustomerHero from '@/components/Header/CustomerHero'
import { constants } from '@/constants'
import { productService } from '@/services/products'
import { handleNotification } from '@/utils'

import ProductSlider from './components/ProductSlider'

function CustomerHomePage() {
  const [productTopViewed, setProductTopViewed] = useState([])

  const getProductTopViewed = async () => {
    try {
      const res = await productService.getProductTopViewed()
      setProductTopViewed(res.data?.content)
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    }
  }

  useEffect(() => {
    getProductTopViewed()
  }, [])

  return (
    <>
      <CustomerHeader />
      <Outlet />
      <CustomerHero />
      <ProductSlider products={productTopViewed} />
    </>
  )
}

export default CustomerHomePage
