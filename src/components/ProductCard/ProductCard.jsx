import useCartStore from '@/store/cartStore'
import { formatMoneyVND } from '@/utils'

function ProductCard({ product }) {
  const { addToCart } = useCartStore()

  const handleAddToCart = () => {
    addToCart({ quantity: 1, idProduct: product.id })
  }

  return (
    <div className="card product-item border-0 mb-4">
      <div className="card-header product-img relative overflow-hidden bg-transparent border p-0">
        <img
          alt={product.name}
          className="img-fluid w-full hover:scale-105 transition duration-500 ease-in-out"
          src={`${product.productImage ? product.productImage : 'https://via.placeholder.com/144'} `}
        />
      </div>
      <div className="card-body border-l border-r text-center p-0 pt-4 pb-3">
        <h6 className="font-medium  truncate mb-3">{product.name}</h6>
        <div className="flex justify-center">
          <h6>{formatMoneyVND(product.price)}</h6>
        </div>
      </div>
      <div className="flex justify-between bg-light border px-5 py-3">
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
