import { useEffect } from 'react'

import useCategoryStore from '@/store/categoryStore'
import useProductStore from '@/store/productStore'

import ProductSlider from './components/ProductSlider'

function CustomerHomePage() {
  const { productsTopView, productTopSold, getProductTopSold, getProductTopView } = useProductStore()
  const { categories, getCategories } = useCategoryStore()

  useEffect(() => {
    Promise.all([getProductTopView(), getProductTopSold(), getCategories()])
  }, [])

  return (
    <>
      <div className="flex gap-5 py-5 px-5 xl:px-20">
        <div className="hidden lg:block lg:w-1/4">
          <div className="flex items-center justify-between h-16 bg-[#D19C97] w-full p-8">
            <h6 className="font-bold">Categories</h6>
          </div>
          <div className="flex flex-col w-full overflow-hidden">
            <div className="border h-100 overscroll-y-auto">
              {categories.map((category) => (
                <a
                  href="##"
                  key={category.id}
                  className="flex items-center justify-between w-full px-8 py-3 capitalize border-t first:border-t-0 hover:text-[#D19C97]">
                  {category.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:w-3/4 overflow-hidden">
          <img
            className="w-full h-[400px] hover:scale-105 duration-500 ease-in-out"
            src="https://themewagon.github.io/eshopper/img/carousel-2.jpg"
            alt="banner"
          />
        </div>
      </div>

      <ProductSlider title="Sản phẩm bán chạy" products={productTopSold} />
      <ProductSlider title="Sản phẩm được xem nhiều nhất" products={productsTopView} />
    </>
  )
}

export default CustomerHomePage
