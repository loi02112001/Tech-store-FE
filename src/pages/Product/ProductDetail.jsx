import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import useProductStore from '@/store/productStore'

function ProductDetail() {
  const { id } = useParams()
  console.log('🚀 ~ ProductDetail ~ id:', id)
  const { isLoading, product, getProductById } = useProductStore()
  console.log('🚀 ~ ProductDetail ~ product:', product)

  useEffect(() => {
    getProductById(id)
  }, [])
  return (
    !isLoading && (
      <div className="container mx-auto py-5">
        <div className="flex flex-wrap justify-between px-4 xl:px-0">
          <div className="w-full lg:w-2/5 overflow-hidden">
            <img
              alt={product?.name}
              className="w-full aspect-square  hover:scale-105 transition duration-500 ease-in-out"
              src={`${product?.productImage ? product?.productImage : 'https://via.placeholder.com/144'} `}
            />
          </div>

          <div className="w-full lg:w-3/5 pb-5">
            <h3 className="font-semibold mb-2 text-3xl">{product?.name}</h3>
            <div className="flex mb-3">
              <div className="text-primary mr-2">
                <small className="fas fa-star"></small>
                <small className="fas fa-star"></small>
                <small className="fas fa-star"></small>
                <small className="fas fa-star-half-alt"></small>
                <small className="far fa-star"></small>
              </div>
              <small className="pt-1">{product?.view} reviews</small>
            </div>
            <h3 className="font-semibold mb-4">${product?.price}</h3>
            <p className="mb-4">{product?.description}</p>
            <div className="flex items-center mb-4 pt-2">
              <div className="input-group quantity mr-3 w-32">
                <div className="input-group-prepend">
                  <button className="btn btn-primary btn-minus">
                    <i className="fa fa-minus"></i>
                  </button>
                </div>
                <input type="text" className="form-control bg-gray-200 text-center" value="1" />
                <div className="input-group-append">
                  <button className="btn btn-primary btn-plus">
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </div>
              <button className="btn btn-primary px-3">
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
