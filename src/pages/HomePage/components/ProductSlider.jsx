import ProductCard from '@/components/ProductCard/ProductCard'

function ProductSlider({ title, products }) {
  return (
    <div className="container">
      <div className="pt-12 mb-4 text-center border-t border-gray-200">
        <h2 className="relative inline-block px-5 font-bold text-[#1C1C1C] text-3xl before:absolute before:content-[''] before:top-1/2 before:left-0 before:bg-[#1C1C1C] before:w-full before:h-0.5">
          <span className="relative z-[1] px-2 bg-white">{title}</span>
        </h2>
      </div>
      <div className="grid grid-cols-4 gap-5 mt-6 pb-12 2xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  )
}

export default ProductSlider
