import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import CustomPagination from '@/components/CustomPagination/CustomPagination'
import ProductCard from '@/components/ProductCard/ProductCard'
import useBrandStore from '@/store/brandStore'
import useCategoryStore from '@/store/categoryStore'
import useProductStore from '@/store/productStore'

import { Checkbox, Radio, Skeleton, Space } from 'antd'
import queryString from 'query-string'

function AllProductsPage() {
  const location = useLocation()

  const [loading, setLoading] = useState(true)
  const [selectedBrand, setSelectedBrand] = useState(0)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0
  })
  const query = queryString.parse(location.search)

  const { products, totalProducts, getListProducts } = useProductStore()
  const { categories, getCategories } = useCategoryStore()
  const { brands, getBrands } = useBrandStore()

  const handleBrandChange = (brandId) => {
    setSelectedBrand(brandId)
  }

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(categoryId)) {
        return prevSelectedCategories.filter((id) => id !== categoryId)
      } else {
        return [...prevSelectedCategories, categoryId]
      }
    })
  }

  const fetchData = async (page = 1, limit, name = query.name, brandId, categoryIds = query.category) => {
    await getListProducts({ page, limit, name, brandId, categoryIds })
    setPagination((prev) => ({
      ...prev,
      current: page
    }))
  }

  const handleTableChange = (page) => fetchData(page)

  const handleFilter = () => {
    const categoryIds = selectedCategories.length > 0 ? selectedCategories.join(',') : query.category
    fetchData(1, pagination.pageSize, query.name, selectedBrand, categoryIds)
  }

  useEffect(() => {
    Promise.allSettled([fetchData(), getCategories(), getBrands()])
      .then(() => {
        setLoading(false)
        setSelectedCategories([parseInt(query.category)])
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div className="container py-10">
      <div className="flex gap-10">
        <FilterProduct
          categories={categories}
          brands={brands}
          loading={loading}
          selectedBrand={selectedBrand}
          handleBrandChange={handleBrandChange}
          selectedCategories={selectedCategories}
          handleCategoryChange={handleCategoryChange}
          handleFilter={handleFilter}
        />
        <div className="grid grid-cols-4 gap-5 w-4/5 h-fit">
          {!loading ? (
            products.map((product) => <ProductCard product={product} key={`all-product-${product.id}`} />)
          ) : (
            <>
              {[...Array(4)].map((_, index) => (
                <div className="flex flex-col" key={index}>
                  <Skeleton active={true} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <CustomPagination
        current={pagination.current}
        total={totalProducts}
        onChange={handleTableChange}
        pageSize={pagination.pageSize}
      />
    </div>
  )
}

function FilterProduct({
  categories,
  brands,
  loading,
  selectedBrand,
  handleBrandChange,
  selectedCategories,
  handleCategoryChange,
  handleFilter
}) {
  return (
    <div className="flex-1">
      <h3 className="pb-2 mb-2 text-lg font-semibold uppercase border-b">Thương hiệu</h3>
      <div className="flex flex-col gap-4">
        {!loading ? (
          <Radio.Group onChange={(e) => handleBrandChange(e.target.value)} value={selectedBrand}>
            <Space direction="vertical">
              <Radio value={0}>Tất cả</Radio>
              {brands.map((brand) => (
                <Radio key={`product-page-brand-${brand.id}`} value={brand.id}>
                  {brand.name}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        ) : (
          <Skeleton active={true} />
        )}
      </div>

      <h3 className="pt-4 pb-2 mb-2 text-lg font-semibold uppercase border-b">Danh Mục</h3>
      <div className="flex flex-col gap-4">
        {!loading ? (
          categories.map((category) => (
            <Checkbox
              key={`product-page-category-${category.id}`}
              checked={selectedCategories.includes(category.id)}
              onChange={() => handleCategoryChange(category.id)}>
              {category.name}
            </Checkbox>
          ))
        ) : (
          <Skeleton active={true} />
        )}
      </div>

      <button className="btn btn-primary w-full mt-4" onClick={handleFilter}>
        Lọc
      </button>
    </div>
  )
}

export default AllProductsPage
