import { Link } from 'react-router-dom'

import { constants } from '@/constants'
import { formatMoneyVND } from '@/utils'

const PurchaseItem = (props) => {
  return (
    <div className="p-6 border-t first:pt-0 first:border-t-0" key={props.order.id}>
      <div className="flex flex-col">
        {props.order.listOrderItem.map((product) => (
          <ProductItem key={`purchase-${product.id}`} product={product} />
        ))}
      </div>
      {props.order.orderStatus == constants.ORDER_STATUS.PENDING && (
        <div className="px-6 mt-4 border-t">
          <span className="block pt-4 text-right">
            Thành tiền: <span className="text-xl text-red">{formatMoneyVND(props.order.totalPrice)}</span>
          </span>
          <div className="flex items-center justify-end gap-3 mt-4">
            <Link to={`/purchase/detail/${props.order.id}`} className="btn btn-primary">
              Thanh toán ngay
            </Link>
            <button className="btn btn-outline">Huỷ</button>
          </div>
        </div>
      )}
      {props.order.orderStatus == constants.ORDER_STATUS.SUCCESS && (
        <div className="flex items-center justify-end gap-3 pt-4 mt-4 border-t">
          <Link to={`/purchase/detail/${props.order.id}`} className="btn btn-primary">
            Mua lại
          </Link>
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
        <span>Số lượng: x {product?.quantity}</span>
      </div>
    </div>
    <span className="">{formatMoneyVND(product?.priceAtOrderTime)}</span>
  </div>
)

export default PurchaseItem
