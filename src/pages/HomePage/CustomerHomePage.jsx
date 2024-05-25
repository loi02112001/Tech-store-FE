import { useEffect } from 'react'

import CustomerHero from '@/components/Header/CustomerHero'
import useProductStore from '@/store/productStore'
import ProductSlider from './components/ProductSlider'

function CustomerHomePage() {
  const { productsTopView, productTopSold, getProductTopSold, getProductTopView } = useProductStore()

  useEffect(() => {
    Promise.all([getProductTopView(), getProductTopSold()])
  }, [])

  return (
    <>
      <CustomerHero />
      <ProductSlider title="Top sold" products={productTopSold} />
      <ProductSlider title="Top view" products={productsTopView} />
    </>
  )
}

export default CustomerHomePage
