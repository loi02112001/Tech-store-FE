import { useEffect, useMemo } from 'react'

import useCartStore from '@/store/cartStore'
import { formatMoneyVND } from '@/utils'

import CartItem from './CartItem'
import { ShoppingCartOutlined } from '@ant-design/icons'

function CartPage() {
  const { carts, getCarts } = useCartStore()

  const total = useMemo(() => {
    return carts.reduce((acc, item) => {
      const { productPrice, quantity } = item
      return acc + productPrice * quantity
    }, 0)
  }, [carts])

  useEffect(() => {
    getCarts()
  }, [])

  return (
    <div className="container w-full h-screen py-20 bg-gray-100">
      <h1 className="mb-7 text-2xl font-semibold capitalize">Giỏ hàng</h1>
      {carts.length > 0 ? (
        <div className="flex gap-8">
          <div className="flex flex-col w-full h-fit p-8 bg-white border rounded-md overflow-hidden">
            {carts.map((cart) => (
              <CartItem key={cart.id} cart={cart} />
            ))}
          </div>
          <div className="flex flex-col gap-6 w-2/5">
            <div className="w-full p-8 bg-white border rounded-lg">
              <h2 className="mb-5 text-xl font-semibold capitalize">Tóm tắt giỏ hàng</h2>
              <div className="flex flex-col gap-1 mb-5">
                <div className="flex justify-between">
                  <span className="text-gray-700 font-medium">Giá trị đơn hàng: </span>
                  <span className="text-gray-500 font-semibold">{formatMoneyVND(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 font-medium">Giao hàng:</span>
                  <span className="text-gray-500 font-semibold">Free</span>
                </div>
              </div>
              <div className="flex justify-between pt-5 font-bold border-t">
                <span>Tổng tiền:</span> {formatMoneyVND(total)}
              </div>
            </div>
            <div className="promo-code w-full p-8 bg-white border rounded-lg">
              <h2 className="mb-5 text-xl font-semibold capitalize">Mã giảm giá</h2>
              <div className="flex flex-col gap-3">
                <input type="text" className="w-full p-3 border rounded-md" placeholder="Nhập mã giảm giá" />
                <button className="px-6 py-3 text-white bg-blue-500 rounded-md">Áp dụng</button>
              </div>
            </div>
            <div className="w-full p-8 bg-white border rounded-lg">
              <h2 className="mb-5 text-xl font-semibold capitalize">Thanh toán</h2>
              <button className="w-full px-6 py-3 text-white bg-blue-500 rounded-md">Thanh toán</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 h-full items-center justify-center">
          <ShoppingCartOutlined style={{ fontSize: '50px' }} />
          <h3 className="w-fit text-center text-xl">Không có sản phẩm nào trong giỏ hàng</h3>
          <a href="/" className="button-primary w-fit">
            Mua ngay
          </a>
        </div>
      )}
    </div>
  )
}

export default CartPage
