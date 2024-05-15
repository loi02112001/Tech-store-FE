import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'

function ProductCard({ product }) {
  return (
    <div className="bg-white border shadow-md rounded-lg overflow-hidden">
      <img
        src={`${product.imageUrl ? product.imageUrl : 'https://via.placeholder.com/144'} `}
        alt="product"
        className="w-full object-cover aspect-square"
      />
      <div className="p-4">
        <h3 className="text-lg uppercase">{product.name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-2xl font-semibold text-red-600">{product.price}₫</span>
          <span className="flex items-center justify-center p-1 rounded-full bg-red-600">
            <ShoppingCartOutlined style={{ fontSize: '20px', color: '#fff' }} />
          </span>
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
