import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import CustomerHeader from '@/components/Header/CustomerHeader'
import CustomerHero from '@/components/Header/CustomerHero'
import { productService } from '@/services/products'

import ProductSlider from './components/ProductSlider'

function CustomerHomePage() {
  const [productTopViewed, setProductTopViewed] = useState([])

  const getProductTopViewed = async () => {
    try {
      const response = await productService.getProductTopViewed()
      const { code, data } = response
      if (code === 200) {
        setProductTopViewed(data?.content)
      }
    } catch (error) {
      console.error(error)
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
