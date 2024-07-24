import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import useCategoryStore from '@/store/categoryStore'
import useProductStore from '@/store/productStore'

import ProductSlider from './components/ProductSlider'

function CustomerHomePage() {
  const { products, productsTopView, productsTopSold, getProductsTopSold, getProductTopView, getListProducts } =
    useProductStore()
  const { categories, getCategories } = useCategoryStore()

  const productSliders = [
    {
      title: 'Sản phẩm bán chạy',
      products: productsTopSold
    },
    {
      title: 'Sản phẩm xem nhiều',
      products: productsTopView
    },
    {
      title: 'Sản phẩm mới',
      products: products
    }
  ]

  useEffect(() => {
    Promise.all([getProductTopView(), getProductsTopSold(), getCategories(), getListProducts()])
  }, [])

  return (
    <>
      <div className="container flex gap-5 py-12">
        <div className="shadow rounded-lg lg:w-1/4">
          <div className="flex items-center justify-between h-16 bg-customBackground w-full p-8">
            <h6 className="font-bold">Categories</h6>
          </div>
          <div className="flex flex-col w-full overflow-hidden">
            <div className="border h-100 overscroll-y-auto">
              {categories.map((category) => (
                <Link
                  to={`/products?category=${category.id}`}
                  key={category.id}
                  className="flex items-center justify-between w-full px-8 py-3 capitalize border-t first:border-t-0 hover:text-red">
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:w-3/4 overflow-hidden rounded">
          <img
            className="w-full aspect-[1280/531] hover:scale-105 duration-500 ease-in-out"
            src="	https://hanoicomputercdn.com/media/banner/05_Julbdb3d9af0372cc0da1d98058bd509a1e.jpg"
            alt="banner"
          />
        </div>
      </div>

      {productSliders.map((productSlider) => (
        <ProductSlider
          key={productSlider.title}
          title={productSlider.title}
          products={productSlider.products}
          url={productSlider.url}
        />
      ))}
    </>
  )
}

export default CustomerHomePage
