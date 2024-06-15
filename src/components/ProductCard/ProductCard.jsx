import { Link } from 'react-router-dom'

import useCartStore from '@/store/cartStore'
import { formatMoneyVND } from '@/utils'

function ProductCard({ product }) {
  const { addToCart } = useCartStore()

  const handleAddToCart = () => {
    addToCart({ quantity: 1, idProduct: product.id })
  }

  return (
    <div className="flex flex-col border rounded">
      <div className="relative overflow-hidden bg-transparent border-b">
        <Link to={`/product/detail/${product.id}`}>
          <img
            alt={product.name}
            className="w-full aspect-square hover:scale-105 transition duration-500 ease-in-out"
            src={`${product.productImage ? product.productImage : 'https://via.placeholder.com/144'} `}
          />
        </Link>
      </div>
      <div className="flex flex-col justify-between flex-1 p-4 font-medium">
        <Link className="mb-3" to={`/product/detail/${product.id}`}>
          <h6>{product.name}</h6>
        </Link>
        <div className="flex items-center gap-4">
          <span className={` ${product.priceAfterDiscount < product.price ? 'line-through' : ''}`}>
            {formatMoneyVND(product.price)}
          </span>
          {product.priceAfterDiscount < product.price && (
            <span className="text-[#D19C97]">{formatMoneyVND(product.priceAfterDiscount)}</span>
          )}
        </div>
      </div>
      <div className="flex justify-between px-5 py-3 mt-auto border-t">
        <a href={`/product/detail/${product.id}`} className="text-sm">
          <i className="fas fa-eye text-[#D19C97] mr-1"></i>View Detail
        </a>
        <button className="text-sm" onClick={handleAddToCart}>
          <i className="fas fa-shopping-cart text-[#D19C97] mr-1"></i>Add To Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
