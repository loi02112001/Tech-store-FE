import { useEffect, useState } from 'react'

import ProductCard from '@/components/ProductCard/ProductCard'
import useBrandStore from '@/store/brandStore'
import useCategoryStore from '@/store/categoryStore'
import useProductStore from '@/store/productStore'

import FilterProduct from './FilterProduct'
import { Skeleton } from 'antd'

function AllProductsPage() {
  const [loading, setLoading] = useState(true)
  const { products, getListProducts } = useProductStore()
  const { categories, getCategories } = useCategoryStore()
  const { brands, getBrands } = useBrandStore()

  useEffect(() => {
    Promise.all([getListProducts(), getCategories(), getBrands()])
      .then(() => {
        setLoading(false)
      })
      .catch()
  }, [])

  return (
    <div className="flex gap-10 container py-8">
      <FilterProduct categories={categories} brands={brands} loading={loading} />
      <div className="grid grid-cols-4 gap-5 w-4/5 ">
        {!loading ? (
          products.map((product) => <ProductCard product={product} key={product.id} />)
        ) : (
          <>
            {[...Array(4)].map((index) => (
              <div className="flex flex-col" key={index}>
                <Skeleton active={true} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default AllProductsPage
