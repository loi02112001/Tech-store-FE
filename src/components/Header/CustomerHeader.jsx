import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useCartStore from '@/store/cartStore'
import useProductStore from '@/store/productStore'
import useUserStore from '@/store/userStore'
import { getToken } from '@/utils'

import SearchDropdown from '../common/SearchDropdown'
import { UserDropdown } from '../UserDropDown/Index'
import { debounce } from 'lodash'

function CustomerHeader() {
  const navigate = useNavigate()
  const [options, setOptions] = useState([])
  const [searchText, setSearchText] = useState('')
  const token = getToken()

  const { getProfile } = useUserStore()
  const { carts, getCarts } = useCartStore()
  const { products, getListProducts } = useProductStore()

  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const debouncedSearch = useCallback(
    debounce((value) => {
      setLoading(true)
      getListProducts({ page: 1, name: value }).finally(() => setLoading(false))
    }, 500),
    []
  )

  const handleSearch = (value) => {
    setSearchTerm(value)
    debouncedSearch(value)
    setSearchText(value)
  }

  const handleClick = () => {
    navigate(`/products?name=${searchText}`)
  }

  useEffect(() => {
    token && Promise.all([getProfile(), getCarts()])
  }, [])

  useEffect(() => {
    const filteredOptions = products.map((product) => ({
      value: product.id,
      label: (
        <div className="flex items-center">
          <img src={product.productImage} alt={product.name} className="w-12 h-12 rounded-full" />
          <div className="ml-4">
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="text-xs text-gray-500">{product.price.toLocaleString()}đ</p>
          </div>
        </div>
      )
    }))

    setOptions(filteredOptions)
  }, [products])

  return (
    <div className="sticky top-0 z-[2] flex items-center py-3 px-20 bg-customBackground border-b">
      <a href="/" className=" hidden lg:block lg:w-1/4 no-underline">
        <h1 className="m-0 text-5xl font-semibold">TechStore</h1>
      </a>
      <div className="w-1/2 text-left lg:w-2/4">
        <SearchDropdown
          onSearch={handleSearch}
          value={searchTerm}
          loading={loading}
          options={options}
          handleClick={handleClick}
          placeholder={'Nhập tên sản phẩm'}
        />
      </div>
      <div className="flex justify-end w-1/2 gap-10 lg:w-1/4">
        <a href="/cart" className="relative flex items-center gap-2">
          <i className="fas fa-shopping-cart text-blue-500 text-2xl"></i>
          <span className="absolute bottom-0 -right-2 flex justify-center items-center w-4 h-4 bg-red text-white text-xs font-medium rounded-full">
            {carts?.length}
          </span>
        </a>
        <div className="flex items-center px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">
          <UserDropdown />
        </div>
      </div>
    </div>
  )
}

export default CustomerHeader
