import CustomSwiper from '@/components/common/CustomSwiper/CustomSwiper'
import ProductCard from '@/components/ProductCard/ProductCard'

function ProductSlider({ title, products }) {
  return products.length === 0 ? null : (
    <div className="container">
      <div className="relative pt-12 text-center">
        <h2 className="relative inline-block px-5 font-bold text-3xl before:absolute before:content-[''] before:top-1/2 before:left-0 before:bg-[#1C1C1C] before:w-full before:h-0.5">
          <span className="relative z-[1] px-2 bg-white">{title}</span>
        </h2>
      </div>
      <CustomSwiper items={products} renderItem={(product) => <ProductCard product={product} />} />
    </div>
  )
}

export default ProductSlider
