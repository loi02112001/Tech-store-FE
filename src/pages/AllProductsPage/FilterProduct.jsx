import { Checkbox, Skeleton } from 'antd'

function FilterProduct(props) {
  return (
    <div className="flex-1">
      <h3 className="pb-2 mb-2 text-lg font-semibold uppercase border-b">Thương hiệu</h3>
      <div className="flex flex-col gap-4">
        {!props.loading ? (
          props?.brands.map((brand) => <Checkbox key={brand.id}>{brand.name}</Checkbox>)
        ) : (
          <Skeleton active={true} />
        )}
      </div>

      <h3 className="pt-4 pb-2 mb-2 text-lg font-semibold uppercase border-b">Danh Mục</h3>
      <div className="flex flex-col gap-4">
        {!props.loading ? (
          props?.categories.map((category) => <Checkbox key={category.id}>{category.name}</Checkbox>)
        ) : (
          <Skeleton active={true} />
        )}
      </div>
    </div>
  )
}

export default FilterProduct
