import useCartStore from '@/store/cartStore'
import { formatMoneyVND } from '@/utils'

import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Rate } from 'antd'

function ProductCard({ product }) {
  const { addToCart } = useCartStore()

  const handleAddToCart = () => {
    addToCart({ quantity: 1, idProduct: product.id })
  }

  return (
    <div className="bg-white border shadow-md rounded-lg overflow-hidden">
      <img
        src={`${product.productImage ? product.productImage : 'https://via.placeholder.com/144'} `}
        alt="product"
        className="w-full object-cover aspect-square"
      />
      <div className="p-4">
        <h3 className="text-base text-[#141824] font-semibold leading-4">{product.name}</h3>
        <span className="flex items-center mt-2">
          <Rate disabled defaultValue={4} style={{ color: '#ffcc85', fontSize: '15px' }} />{' '}
          <span className="ml-2 text-xs">(50 đánh giá)</span>
        </span>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-2xl font-semibold">{formatMoneyVND(product.price)}</span>
          <button className="flex items-center justify-center p-1 rounded-full" onClick={handleAddToCart}>
            <ShoppingCartOutlined style={{ fontSize: '20px', color: '#000' }} />
          </button>
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-grey-700">
          <span>Đã bán {product.sold}</span>
          <span>
            <EyeOutlined /> {product.view}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
