import { Link } from 'react-router-dom'

import { constants } from '@/constants'
import { formatMoneyVND } from '@/utils'

const PurchaseItem = (props) => {
  console.log('🚀 ~ PurchaseItem ~ props:', props)
  return (
    <div className="py-6 bg-white">
      <div className="flex flex-col gap-4 px-6">
        {props.order.listOrderItem.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      {props.order.orderStatus === constants.ORDER_STATUS.PENDING && (
        <div className="px-6 mt-4 border-t">
          <span className="block pt-4 text-right">
            Thành tiền: <span className="text-xl text-primary">{formatMoneyVND(props.order.totalPrice)}</span>
          </span>
          <div className="flex items-center justify-end gap-3 mt-4">
            <Link to={`/purchase/detail/${props.order.id}`} className="btn btn-primary">
              Thanh toán ngay
            </Link>
            <button className="btn btn-outline">Huỷ</button>
          </div>
        </div>
      )}
    </div>
  )
}

const ProductItem = ({ product }) => (
  <div className="flex items-center pt-4 border-t first:border-t-0 first:pt-0">
    <div className="flex items-center flex-1 gap-4">
      <img
        src={product.productImage || 'https://via.placeholder.com/100'}
        alt="product"
        className="object-cover w-20 aspect-square"
      />
      <div className="flex flex-col gap-2">
        <span className="text-base">{product?.productName}</span>
        <span>x {product?.quantity}</span>
      </div>
    </div>
    <span className="">{formatMoneyVND(product?.priceAtOrderTime)}</span>
  </div>
)

export default PurchaseItem
