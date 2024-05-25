import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import useAuthStore from '@/store/authStore'
import useCartStore from '@/store/cartStore'

import userSvg from '../../assets/images/user.svg'
import SearchInputHeader from '../common/SearchInputHeader'
import { UserDropdown } from '../UserDropDown/Index'

function CustomerHeader() {
  const { profile, getProfile } = useAuthStore()
  const { carts, getCarts } = useCartStore()

  useEffect(() => {
    Promise.all([getProfile(), getCarts()])
  }, [])

  return (
    <nav className="sticky top-0 z-[1] py-4 bg-[#f6f7fa]">
      <div className="container flex justify-between">
        <Link className="text-3xl font-semibold text-[#737a90]" to="/">
          TechStore<span className="opacity-40">.</span>
        </Link>
        <SearchInputHeader />
        <ul className="flex items-center gap-6">
          <li>
            <Link
              className="relative after:content-[''] after:absolute after:-top-2 after:-right-1 after:w-4 after:h-4 after:bg-[#3874ff] after:rounded-full"
              to="/cart">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#737a90"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-shopping-cart ">
                <g>
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </g>
              </svg>
              <span className="absolute -top-2 -right-0 z-[1] text-xs text-white">{carts?.length}</span>
            </Link>
          </li>
          <li>
            {profile == null ? (
              <a className="flex items-center gap-3" href="/login">
                <img src={userSvg} alt="" />
                <span className="text-sm text-[#737a90] font-semibold">Đăng nhập</span>
              </a>
            ) : (
              <UserDropdown />
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default CustomerHeader
