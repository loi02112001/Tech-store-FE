import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useAuthStore from '@/store/authStore'
import useCartStore from '@/store/cartStore'
import useOrderStore from '@/store/orderStore'
import useVoucherStore from '@/store/voucherStore'
import { formatMoneyVND, isEmptyUsingKeys } from '@/utils'

import { Input } from 'antd'

function CartCheckout() {
  const { carts } = useCartStore()
  const { voucher, getVoucherByCode } = useVoucherStore()
  const { profile, getProfile } = useAuthStore()
  const { createOrder } = useOrderStore()

  const navigate = useNavigate()
  const [voucherCode, setVoucherCode] = useState('')

  useEffect(() => {
    if (carts.length === 0) {
      navigate('/cart')
    }
    getProfile()
  }, [carts.length, navigate, getProfile])

  const checkedCarts = useMemo(() => carts.filter((cart) => cart?.checked), [carts])

  const totalPrice = useMemo(
    () => checkedCarts.reduce((acc, item) => acc + item.productPriceAfterDiscount * item.quantity, 0),
    [checkedCarts]
  )

  const handleOrder = () => {
    createOrder({
      address: profile?.address,
      phoneNumber: profile?.phoneNumber,
      voucherCode,
      listCartItemId: checkedCarts.map((item) => item.id)
    })
    navigate('/purchase')
  }

  return (
    <div className="container py-10 bg-white-500">
      <AddressInfo profile={profile} />
      <ProductList checkedCarts={checkedCarts} />
      <OrderVoucher getVoucherByCode={getVoucherByCode} voucherCode={voucherCode} setVoucherCode={setVoucherCode} />
      <OrderSummary totalPrice={totalPrice} voucher={voucher} handleOrder={handleOrder} />
    </div>
  )
}

const AddressInfo = ({ profile }) => (
  <div className="flex items-end gap-4 p-6 capitalize bg-white rounded">
    <span className="text-lg text-[#ee4d2d]">Địa chỉ nhận hàng:</span>
    <span className="font-bold">
      {profile?.name} {profile?.phoneNumber}
    </span>
    <span>{profile?.address}</span>
  </div>
)

const ProductList = ({ checkedCarts }) => (
  <div className="p-6 mt-5 bg-white rounded">
    <ProductHeader />
    {checkedCarts.map((cart) => (
      <ProductItem key={cart.id} cart={cart} />
    ))}
  </div>
)

export const ProductHeader = () => (
  <div className="flex items-center pb-5 text-sm">
    <div className="flex-1">
      <h2>Sản phẩm</h2>
    </div>
    <div className="w-[15%] text-[#0000008a]">Đơn giá</div>
    <div className="w-[15%] text-[#0000008a] text-center">Số lượng</div>
    <div className="w-[15%] text-[#0000008a] text-right">Thành tiền</div>
  </div>
)

export const ProductItem = ({ cart }) => (
  <div className="py-5 border-t last:pb-0">
    <div className="flex items-center text-sm">
      <div className="flex items-center flex-1 gap-4">
        <img
          src={cart.productImage || 'https://via.placeholder.com/100'}
          alt="product"
          className="w-[100px] border rounded object-cover aspect-square"
        />
        <span>{cart?.productName}</span>
      </div>
      <div className="flex flex-col gap-1 w-[15%]">
        <span className="line-through">{formatMoneyVND(cart?.productPrice)}</span>
        <span className="text-red-300">{formatMoneyVND(cart?.productPriceAfterDiscount)}</span>
      </div>
      <div className="w-[15%] text-center">{cart?.quantity}</div>
      <div className="w-[15%] text-right">{formatMoneyVND(cart?.productPriceAfterDiscount * cart?.quantity)}</div>
    </div>
  </div>
)

const OrderVoucher = (props) => {
  const { getVoucherByCode } = props
  const handleGetVoucher = () => {
    getVoucherByCode(props.voucherCode)
  }
  return (
    <div className="flex flex-col gap-2 p-6 mt-5 bg-white rounded">
      <div className="flex items-center justify-between">
        <span className=" text-black-600">Khuyến mại:</span>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Nhập mã khuyến mại"
            className="w-[300px]"
            onChange={(e) => props.setVoucherCode(e.target.value)}
          />
          <button className="text-blue-100" onClick={handleGetVoucher} disabled={!props.voucherCode}>
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  )
}

const OrderSummary = ({ totalPrice, voucher, handleOrder }) => {
  const finalPrice = useMemo(() => {
    const discountPrice = voucher?.discountPrice || 0
    return Math.max(0, totalPrice - discountPrice)
  }, [totalPrice, voucher])

  return (
    <div className="flex flex-col gap-2 p-6 mt-5 text-sm bg-white rounded">
      <h3 className="pb-3 mb-3 text-base border-b">Thanh toán</h3>
      <table className="w-64 ml-auto border-separate border-spacing-3">
        <tbody>
          <tr className="mb-3">
            <td className="text-black-700">Tổng tiền hàng:</td>
            <td className="text-black-600">{formatMoneyVND(totalPrice)}</td>
          </tr>
          {!isEmptyUsingKeys(voucher) && (
            <tr className="mb-3">
              <td className="text-black-700">Khuyến mại:</td>
              <td className="text-black-600">-{formatMoneyVND(voucher?.discountPrice)}</td>
            </tr>
          )}
          <tr className="mb-3">
            <td className="text-black-700">Tổng thanh toán:</td>
            <td className="text-black-600">{formatMoneyVND(finalPrice)}</td>
          </tr>
          <tr>
            <td colSpan="2">
              <button onClick={handleOrder} className="block w-full btn btn-primary">
                Đặt hàng
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CartCheckout
