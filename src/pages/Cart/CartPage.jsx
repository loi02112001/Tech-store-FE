import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { constants } from '@/constants'
import useCartStore from '@/store/cartStore'
import { formatMoneyVND, handleNotification } from '@/utils'

import CartItem from './CartItem'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Checkbox } from 'antd'

function CartPage() {
  let { carts, getCarts, setCartItems } = useCartStore()
  const [items, setItems] = useState([])
  const [allChecked, setAllChecked] = useState(false)
  const navigate = useNavigate()

  const total = useMemo(() => {
    return carts.reduce((acc, item) => {
      const { productPriceAfterDiscount, quantity } = item
      return acc + productPriceAfterDiscount * quantity
    }, 0)
  }, [carts])

  const handleAllCheck = (event) => {
    const newItems = items.map((item) => ({
      ...item,
      checked: event.target.checked
    }))
    setAllChecked(event.target.checked)
    setItems(newItems)
    setCartItems(newItems)
  }

  const handleItemCheck = (id) => {
    const newItems = items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    setAllChecked(newItems.every((item) => item.checked))
    setItems(items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
    setCartItems(newItems)
  }

  const handleCheckout = () => {
    if (items.some((item) => item.checked)) {
      navigate('/cart/checkout')
      sessionStorage.setItem('checkoutItems', JSON.stringify(items.filter((item) => item.checked)))
    } else {
      handleNotification(constants.NOTIFICATION_WARNING, 'Bạn chưa chọn sản phầm nào để mua')
    }
  }

  useEffect(() => {
    getCarts()
  }, [])

  useEffect(() => {
    setItems(carts)
  }, [carts])

  return (
    <div className="container py-10 flex-1">
      <h1 className="text-2xl font-semibold capitalize mb-7">Giỏ hàng</h1>
      {carts.length > 0 && (
        <div className="flex items-center gap-8 px-8 pb-4">
          <Checkbox checked={allChecked} onChange={handleAllCheck} />
          <span>Chọn tất cả</span>
        </div>
      )}
      {carts.length > 0 ? (
        <div className="flex gap-8">
          <div className="flex flex-col w-full p-8 overflow-hidden bg-white border rounded-md h-fit">
            {items.map((cart) => (
              <CartItem key={cart.id} cart={cart} checked={cart.checked} handleItemCheck={handleItemCheck} />
            ))}
          </div>
          <div className="flex flex-col w-2/5 gap-6">
            <div className="w-full p-8 bg-white border rounded-lg">
              <h2 className="mb-5 text-xl font-semibold capitalize">Thông tin giỏ hàng</h2>
              <div className="flex flex-col gap-1 mb-5">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Giá trị đơn hàng: </span>
                  <span className="font-semibold text-gray-500">{formatMoneyVND(total)}</span>
                </div>
              </div>
              <div className="flex justify-between pt-5 font-bold border-t">
                <span>Tổng tiền:</span> {formatMoneyVND(total)}
              </div>
              <button onClick={handleCheckout} className="block w-full mt-8 btn btn-primary">
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <ShoppingCartOutlined style={{ fontSize: '50px' }} />
          <h3 className="text-xl text-center w-fit">Không có sản phẩm nào trong giỏ hàng</h3>
          <a href="/products" className="btn btn-primary w-fit">
            Mua ngay
          </a>
        </div>
      )}
    </div>
  )
}

export default CartPage
