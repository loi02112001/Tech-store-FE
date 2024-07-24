import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import useCartStore from '@/store/cartStore'
import useProductStore from '@/store/productStore'
import { formatMoneyVND } from '@/utils'

import { Flex, Modal, Rate } from 'antd'

import './index.css'

const desc = ['Tệ hại', 'Tồi tệ', 'Bình thường', 'Tốt', 'Tuyệt vời']

const ProductImage = ({ src, alt }) => (
  <div className="w-full overflow-hidden shadow lg:w-2/5">
    <img
      alt={alt}
      className="w-full transition duration-500 ease-in-out aspect-square hover:scale-105"
      src={src || 'https://via.placeholder.com/144'}
    />
  </div>
)

const ProductInfo = ({ name, rating, totalRating, description, onRateClick }) => (
  <div>
    <h1 className="mb-2 text-2xl font-medium">{name}</h1>
    <div className="flex gap-4 mb-3">
      <div className="mr-2 cursor-pointer text-primary" onClick={onRateClick}>
        <Rate disabled allowHalf value={rating} />
      </div>
      <span className="text-base text-gray-600">({totalRating} đánh giá)</span>
    </div>
    <p className="text-gray-500">{description}</p>
  </div>
)

const PriceDisplay = ({ price, priceAfterDiscount }) => {
  const isProductSale = priceAfterDiscount < price
  return (
    <div className="flex items-end gap-4 p-4 bg-gray-50">
      {isProductSale && <span className="text-2xl font-bold text-red-700">{formatMoneyVND(priceAfterDiscount)}</span>}
      <span className={`${isProductSale ? 'text-lg line-through' : 'text-2xl font-bold'}`}>
        {formatMoneyVND(price)}
      </span>
      {isProductSale && (
        <span className="text-sm text-red-700 font-medium">
          Tiết kiệm: {formatMoneyVND(price - priceAfterDiscount)}
        </span>
      )}
    </div>
  )
}

const QuantitySelector = ({ quantity, onIncrement, onDecrement, onChange, max }) => (
  <div className="flex items-center gap-2">
    <p className="text-sm font-semibold">Số lượng: </p>
    <div className="flex items-center">
      <button
        className="w-8 h-8 flex items-center justify-center border border-gray-300 transition-colors duration-200"
        onClick={onDecrement}
        disabled={quantity <= 1}>
        <i className="fa fa-minus text-gray-500"></i>
      </button>
      <input
        type="text"
        className="w-10 h-8 text-center text-gray-500 border-y border-gray-300 focus:outline-none"
        value={quantity}
        onChange={onChange}
      />
      <button
        className="w-8 h-8 flex items-center justify-center border border-gray-300 transition-colors duration-200"
        onClick={onIncrement}
        disabled={quantity >= max}>
        <i className="fa fa-plus text-gray-500"></i>
      </button>
    </div>
    {max === 0 ? (
      <p className="ml-3 font-medium text-red-500">Hết hàng</p>
    ) : (
      <p className="ml-3 font-medium text-gray-500">{max} sản phẩm có sẵn</p>
    )}
  </div>
)

function ProductDetail() {
  const { id } = useParams()
  const { isLoading, product, getProductById, ratingProduct } = useProductStore()
  const { addToCart } = useCartStore()

  const [quantity, setQuantity] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [value, setValue] = useState(product?.userRating)

  const handleAddToCart = useCallback(() => {
    addToCart({ quantity, idProduct: product.id })
  }, [addToCart, quantity, product])

  const handleIncrement = useCallback(() => {
    setQuantity((prev) => Math.min(prev + 1, product?.quantity))
  }, [product])

  const handleDecrement = useCallback(() => {
    setQuantity((prev) => Math.max(prev - 1, 1))
  }, [])

  const handleInputChange = useCallback(
    (e) => {
      const value = e.target.value
      const numValue = value === '' ? 0 : parseInt(value, 10)
      if (!isNaN(numValue) && numValue >= 0 && numValue <= product?.quantity) {
        setQuantity(numValue)
      }
    },
    [product]
  )

  const showModal = useCallback(() => setIsModalOpen(true), [])
  const handleCancel = useCallback(() => setIsModalOpen(false), [])

  const handleOk = useCallback(() => {
    ratingProduct({ productId: product.id, rating: value })
    setIsModalOpen(false)
  }, [ratingProduct, product, value])

  useEffect(() => {
    if (id) {
      getProductById(id)
    }
  }, [id, getProductById])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container py-12 mx-auto">
      <div className="flex justify-between gap-10">
        <ProductImage src={product?.productImage} alt={product?.name} />

        <div className="flex flex-col gap-5 w-full pb-5 lg:flex-1">
          <ProductInfo
            name={product?.name}
            rating={product?.productRating}
            totalRating={product?.totalUserRating}
            description={product?.description}
            onRateClick={showModal}
          />

          <Modal title="Đánh giá của bạn" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Flex gap="middle" vertical className="mt-5">
              <Rate tooltips={desc} onChange={setValue} value={value || product?.userRating} />
              {value ? <span>{desc[value - 1]}</span> : null}
            </Flex>
          </Modal>

          <PriceDisplay price={product?.price} priceAfterDiscount={product?.priceAfterDiscount} />

          <QuantitySelector
            quantity={quantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onChange={handleInputChange}
            max={product?.quantity}
          />

          <button className="btn btn-primary w-fit" onClick={handleAddToCart}>
            Thêm vào giỏ hàng
          </button>

          <div className="flex pt-2">
            <p className="mb-0 mr-2 font-medium text-dark">Share on:</p>
            <div className="flex">
              <a className="px-2 text-dark" href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="px-2 text-dark" href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a className="px-2 text-dark" href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a className="px-2 text-dark" href="#">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
