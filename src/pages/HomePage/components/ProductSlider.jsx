import { Link } from 'react-router-dom'

import ProductCard from '@/components/ProductCard/ProductCard'

import userSvg from '../../../assets/images/no-product.svg'

function ProductSlider({ title, products }) {
  return (
    <div className="container py-6">
      <div className="grid grid-cols-3">
        <div></div>
        <h3 className="mb-6 h5 text-center uppercase">{title}</h3>
        <Link to="all-products" className="text-right link">
          Xem tất cả
        </Link>
      </div>
      {products.length > 0 ? (
        <div className=" grid grid-cols-5 gap-5">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2  items-center">
          <img src={userSvg} alt="no-product" />
          <h3 className="h5 text-center uppercase">No products</h3>
        </div>
      )}
    </div>
  )
}

export default ProductSlider
