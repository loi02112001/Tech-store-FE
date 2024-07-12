import { useEffect } from 'react'

import useCartStore from '@/store/cartStore'
import useUserStore from '@/store/userStore'

import { UserDropdown } from '../UserDropDown/Index'

function CustomerHeader() {
  const { getProfile } = useUserStore()
  const { carts, getCarts } = useCartStore()

  useEffect(() => {
    Promise.all([getProfile(), getCarts()])
  }, [])

  return (
    <div className="flex items-center py-3 px-6 xl:px-20 sticky top-0 z-[2] bg-customBackground border-b">
      <div className="hidden lg:block lg:w-1/4">
        <a href="/" className="no-underline">
          <h1 className="m-0 text-5xl font-semibold">TechStore</h1>
        </a>
      </div>
      <div className="w-1/2 text-left lg:w-2/4">
        <form action="">
          <div className="flex">
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tìm kiếm sản phẩm"
            />
            <div className="flex items-center">
              <span className="px-4 py-2 text-blue-500 bg-transparent border border-l-0 border-gray-300 rounded-r">
                <i className="fa fa-search"></i>
              </span>
            </div>
          </div>
        </form>
      </div>
      <div className="flex justify-end w-1/2 gap-10 lg:w-1/4">
        <a href="/cart" className="relative flex items-center gap-2">
          <i className="fas fa-shopping-cart text-blue-500 text-2xl"></i>
          <span className="absolute bottom-0 -right-2 flex justify-center items-center w-4 h-4 bg-red text-white text-xs font-medium rounded-full">
            {carts?.length}
          </span>
        </a>
        <a href="###" className="flex items-center px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">
          <UserDropdown />
        </a>
      </div>
    </div>
  )
}

export default CustomerHeader
