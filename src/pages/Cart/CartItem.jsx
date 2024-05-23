import { formatMoneyVND } from '@/utils'

import { DeleteOutlined } from '@ant-design/icons'

function CartItem({ cart }) {
  return (
    <div key={cart.id} className="flex gap-10 py-8 border-t first:border-t-0 first:pt-0 last:pb-0">
      <img
        src={`${cart.productImage ? cart.productImage : 'https://via.placeholder.com/100'} `}
        alt="product"
        className="w-[100px] object-cover aspect-square"
      />
      <div className="flex flex-col justify-between w-full">
        <div className="flex justify-between w-full">
          <h3 className="text-lg font-medium capitalize">{cart.productName}</h3>
          <span className="font-bold text-gray-900">{formatMoneyVND(cart?.productPrice)}</span>
        </div>
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center">
            <span className="mr-2 font-medium">Số lượng:</span>
            <button type="button" className="px-2 bg-gray-100 rounded-l-md">
              -
            </button>
            <input className="w-10 text-center bg-gray-100 border-x" type="number" min="1" value="2" />
            <button type="button" className="px-2 bg-gray-100 rounded-r-md">
              +
            </button>
          </div>
          <button className="flex items-center gap-2 text-gray-700 link">
            <DeleteOutlined />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
