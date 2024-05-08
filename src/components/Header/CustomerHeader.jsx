import cartSvg from '../../assets/images/cart.svg'
import userSvg from '../../assets/images/user.svg'
import SearchInputHeader from '../common/SearchInputHeader'

function CustomerHeader() {
  return (
    <nav className="sticky top-0 z-[1] py-5 bg-[#E30019]">
      <div className="container flex justify-between">
        <a className="text-3xl font-semibold text-white" href="/">
          TechStore<span className="opacity-40">.</span>
        </a>
        <SearchInputHeader />
        <ul className="flex items-center gap-6">
          <li>
            <a className="flex items-center gap-2" href="/cart">
              <img src={cartSvg} alt="" />
              <span className="text-sm text-white font-semibold">Giỏ hàng</span>
            </a>
          </li>
          <li>
            <a className="flex items-center gap-3" href="/account">
              <img src={userSvg} alt="" />
              <span className="text-sm text-white font-semibold">Đăng nhập</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default CustomerHeader
