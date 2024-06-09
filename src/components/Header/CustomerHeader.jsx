import { useEffect } from 'react'

import useAuthStore from '@/store/authStore'
import useCartStore from '@/store/cartStore'

import { UserDropdown } from '../UserDropDown/Index'

function CustomerHeader() {
  const { getProfile } = useAuthStore()
  const { carts, getCarts } = useCartStore()

  useEffect(() => {
    Promise.all([getProfile(), getCarts()])
  }, [])

  return (
    <div className="flex items-center py-3 px-6 xl:px-20 sticky top-0 z-[2] bg-white border-b">
      <div className="hidden lg:block lg:w-1/4">
        <a href="###" className="no-underline">
          <h1 className="m-0 text-5xl font-semibold">TechStore</h1>
        </a>
      </div>
      <div className="w-1/2 lg:w-2/4 text-left">
        <form action="">
          <div className="flex">
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tìm kiếm sản phẩm"
            />
            <div className="flex items-center">
              <span className="px-4 py-2 bg-transparent text-blue-500 border border-l-0 border-gray-300 rounded-r">
                <i className="fa fa-search"></i>
              </span>
            </div>
          </div>
        </form>
      </div>
      <div className="w-1/2 lg:w-1/4 flex gap-2 justify-end">
        <a href="/cart" className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">
          <i className="fas fa-shopping-cart text-primary"></i>
          <span className=" bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {carts?.length}
          </span>
        </a>
        <a href="###" className="flex items-center px-4 py-2  border border-gray-300 rounded hover:bg-gray-100">
          <UserDropdown />
        </a>
      </div>
    </div>
  )
}

export default CustomerHeader
