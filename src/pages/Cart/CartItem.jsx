import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import useCartStore from '@/store/cartStore'
import { formatMoneyVND } from '@/utils'

import { DeleteOutlined } from '@ant-design/icons'
import { Checkbox } from 'antd'

function CartItem({ cart, checked, handleItemCheck }) {
  const [quantity, setQuantity] = useState(cart.quantity)
  const [check, setCheck] = useState(checked)
  const { updateCart } = useCartStore()

  const updateQuantity = (value) => {
    setQuantity(value)
    updateCart({ cartItemId: cart.id, quantity: value })
  }

  const handleIncrement = () => {
    updateQuantity(quantity + 1)
  }

  const handleDecrement = () => {
    updateQuantity(quantity - 1)
  }

  const handleDeleteCart = () => {
    updateQuantity(0)
  }

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value)
    if (!isNaN(value)) {
      updateQuantity(value)
    }
  }

  useEffect(() => {
    setCheck(checked)
  }, [checked])

  return (
    <div key={cart.id} className="flex gap-2 py-6 border-t first:border-t-0 first:pt-0 last:pb-0">
      <Checkbox
        checked={check}
        onChange={() => {
          setCheck(!check)
          handleItemCheck(cart.id)
        }}
      />
      <Link to={`/product/detail/${cart.productId}`}>
        <img
          src={`${cart.productImage ? cart.productImage : 'https://via.placeholder.com/100'}`}
          alt="product"
          className="w-[100px] object-cover aspect-square"
        />
      </Link>
      <div className="flex flex-col justify-between gap-4 w-full">
        <div className="flex justify-between gap-10 w-full">
          <Link to={`/product/detail/${cart.productId}`} className="flex flex-1">
            <h3 className="text-lg font-medium capitalize">{cart.productName}</h3>
          </Link>
          <div className="flex flex-col">
            <span
              className={` ${cart.productPriceAfterDiscount < cart.productPrice ? 'text-sm line-through' : 'text-lg font-semibold'}`}>
              {formatMoneyVND(cart.productPrice)}
            </span>
            {cart?.productPriceAfterDiscount < cart.productPrice && (
              <span className="text-lg font-semibold text-red">{formatMoneyVND(cart.productPriceAfterDiscount)}</span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center">
            <span className="mr-2 font-medium">Số lượng:</span>

            <div className="flex items-center">
              <button
                className="w-8 h-8 flex items-center justify-center border border-gray-300 transition-colors duration-200"
                onClick={handleDecrement}
                disabled={quantity <= 1}>
                <i className="fa fa-minus text-gray-500"></i>
              </button>
              <input
                type="text"
                className="w-10 h-8 text-center text-gray-500 border-y border-gray-300 focus:outline-none"
                value={quantity}
                pattern="[0-9]*"
                onChange={handleInputChange}
              />
              <button
                className="w-8 h-8 flex items-center justify-center border border-gray-300 transition-colors duration-200"
                onClick={handleIncrement}>
                <i className="fa fa-plus text-gray-500"></i>
              </button>
            </div>
          </div>
          <button className="flex items-center gap-2 text-gray-700 link" onClick={handleDeleteCart}>
            <DeleteOutlined />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
