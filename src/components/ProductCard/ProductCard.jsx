import { useId } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { constants } from '@/constants'
import useCartStore from '@/store/cartStore'
import { formatMoneyVND, getToken, handleNotification, isManage, removeToken } from '@/utils'

function ProductCard({ product }) {
  const { addToCart } = useCartStore()
  const navigate = useNavigate()
  const id = useId()

  const handleAddToCart = () => {
    if (isManage()) {
      removeToken('token')
      navigate('/login')
      return
    }

    if (!getToken()) {
      handleNotification(constants.NOTIFICATION_WARNING, { message: 'Bạn cần đăng nhập để mua hàng' })
      return
    }

    addToCart({ quantity: 1, idProduct: product.id })
  }

  return (
    <div className="flex flex-col h-full m-1 rounded-lg shadow overflow-hidden" key={id}>
      <Link to={`/product/detail/${product.id}`} className="relative overflow-hidden border-b">
        <img
          alt={product.name}
          className="w-full aspect-square hover:scale-105 transition duration-500 ease-in-out"
          src={`${product.productImage ? product.productImage : 'https://via.placeholder.com/144'} `}
        />
      </Link>
      <div className="flex flex-col justify-between flex-1 p-4 font-medium">
        <Link to={`/product/detail/${product.id}`}>
          <h6 className="text-sm mb-1">{product.name}</h6>
        </Link>
        <div className="flex flex-col">
          <span
            className={` ${product.priceAfterDiscount < product.price ? 'text-sm line-through' : 'text-lg font-semibold'}`}>
            {formatMoneyVND(product.price)}
          </span>
          {product.priceAfterDiscount < product.price && (
            <span className="text-lg font-semibold text-red">{formatMoneyVND(product.priceAfterDiscount)}</span>
          )}
        </div>
      </div>
      <div className="flex justify-between px-5 py-3 mt-auto border-t">
        <a href={`/product/detail/${product.id}`} className="text-sm">
          <i className="fas fa-eye text-red mr-1"></i>Chi tiết
        </a>
        <button className="text-sm" onClick={handleAddToCart}>
          <i className="fas fa-shopping-cart text-red mr-1"></i>Mua hàng
        </button>
      </div>
    </div>
  )
}

export default ProductCard
