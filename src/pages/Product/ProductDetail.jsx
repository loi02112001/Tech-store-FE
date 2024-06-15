import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import useCartStore from '@/store/cartStore'
import useProductStore from '@/store/productStore'
import { formatMoneyVND } from '@/utils'

import { Flex, Modal, Rate } from 'antd'
const desc = ['Tệ hại', 'Tồi tệ', 'Bình thường', 'Tốt', 'Tuyệt vời']

function ProductDetail() {
  const { id } = useParams()
  const { isLoading, product, getProductById, ratingProduct } = useProductStore()
  const { addToCart } = useCartStore()
  const [quantity, setQuantity] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [value, setValue] = useState(product?.userRating)

  const handleAddToCart = () => {
    console.log('add')
    addToCart({ quantity: quantity, idProduct: product.id })
  }

  const handleIncrement = () => {
    setQuantity(quantity + 1)
  }

  const handleDecrement = () => {
    setQuantity(quantity - 1)
  }

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value)
    if (!isNaN(value)) {
      setQuantity(value)
    }
  }

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleOk = () => {
    ratingProduct({ productId: product.id, rating: value })
    setIsModalOpen(false)
  }
  useEffect(() => {
    getProductById(id)
  }, [])
  return (
    !isLoading && (
      <div className="container mx-auto py-12">
        <div className="flex justify-between gap-8 px-4 xl:px-0">
          <div className="w-full lg:w-2/5 overflow-hidden">
            <img
              alt={product?.name}
              className="w-full aspect-square  hover:scale-105 transition duration-500 ease-in-out"
              src={`${product?.productImage ? product?.productImage : 'https://via.placeholder.com/144'} `}
            />
          </div>

          <div className="w-full lg:flex-1 pb-5">
            <h3 className="font-semibold mb-2 text-3xl">{product?.name}</h3>
            <div className="flex gap-4 mb-3">
              <div className="text-primary mr-2 cursor-pointer" onClick={showModal}>
                <Rate disabled allowHalf value={product?.productRating} />
              </div>
              <small className="text-sm">{product?.totalUserRating} đánh giá</small>
            </div>
            <Modal title="Đánh giá của bạn" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <Flex gap="middle" vertical className="mt-5">
                <Rate tooltips={desc} onChange={setValue} value={value || product?.userRating} />
                {value ? <span>{desc[value - 1]}</span> : null}
              </Flex>
            </Modal>
            <span
              className={`text-2xl font-semibold mb-4 ${product?.priceAfterDiscount < product?.price ? 'line-through' : ''}`}>
              {formatMoneyVND(product?.price)}
            </span>
            {product?.priceAfterDiscount < product?.price && (
              <span className="pl-5 text-2xl font-semibold text-[#D19C97]">
                {formatMoneyVND(product?.priceAfterDiscount)}
              </span>
            )}
            <p className="text-indigo-500 mb-4">{product?.description}</p>
            <div className="flex items-center gap-5 mb-4 pt-2">
              <div className="flex items-center w-48">
                <div className="input-group-prepend">
                  <button className="btn btn-primary btn-minus" onClick={handleDecrement} disabled={quantity === 1}>
                    <i className="fa fa-minus"></i>
                  </button>
                </div>
                <input
                  type="text"
                  className="form-control !bg-secondary text-center"
                  value={quantity}
                  onChange={handleInputChange}
                />
                <div className="input-group-append">
                  <button className="btn btn-primary btn-plus" onClick={handleIncrement}>
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </div>
              <button className="btn btn-primary px-3" onClick={handleAddToCart}>
                <i className="fa fa-shopping-cart mr-1"></i> Add To Cart
              </button>
            </div>
            <div className="flex pt-2">
              <p className="text-dark font-medium mb-0 mr-2">Share on:</p>
              <div className="flex">
                <a className="text-dark px-2" href="">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a className="text-dark px-2" href="">
                  <i className="fab fa-twitter"></i>
                </a>
                <a className="text-dark px-2" href="">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a className="text-dark px-2" href="">
                  <i className="fab fa-pinterest"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default ProductDetail
