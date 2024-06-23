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
    <div key={cart.id} className="flex gap-10 py-8 border-t first:border-t-0 first:pt-0 last:pb-0">
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
      <div className="flex flex-col justify-between w-full">
        <div className="flex justify-between w-full">
          <Link to={`/product/detail/${cart.productId}`}>
            <h3 className="text-lg font-medium capitalize">{cart.productName}</h3>
          </Link>
          <span className="font-bold text-gray-900">{formatMoneyVND(cart?.productPrice)}</span>
        </div>
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center">
            <span className="mr-2 font-medium">Số lượng:</span>
            <button
              type="button"
              className="px-2 bg-gray-100 rounded-l-md"
              onClick={handleDecrement}
              disabled={quantity === 0}>
              -
            </button>
            <input
              className="w-10 text-center bg-gray-100 border-x"
              type="text"
              value={quantity}
              pattern="[0-9]*"
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="px-2 bg-gray-100 rounded-r-md"
              onClick={handleIncrement}
              disabled={quantity === 0}>
              +
            </button>
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
