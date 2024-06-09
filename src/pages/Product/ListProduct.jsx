import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import DefaultImages from '@/assets/icons/DefaultImage'
import SearchInput from '@/components/common/SearchInput'
import useProductStore from '@/store/productStore'

import { Button, Layout, Table } from 'antd'

const ListProduct = () => {
  const { loading, products: productList, totalProducts, getListProducts } = useProductStore()

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const productsTable = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center'
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'productImage',
      key: 'productImage',
      align: 'center',
      render: (_, record) => {
        return (
          <>
            {record.productImage ? (
              <img alt={record.name} src={record.productImage} className="w-12 object-cover rounded-sm aspect-square" />
            ) : (
              <DefaultImages width={48} height={48} />
            )}
          </>
        )
      }
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      render: (name, product) => (
        <p className="link no-underline">
          <Link to={`/product/edit/${product.id}`}>{name}</Link>
        </p>
      )
    },
    {
      title: 'Giá bán',
      dataIndex: 'price',
      key: 'price',
      render: (price) => formatPrice(price)
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: 'Đã bán',
      dataIndex: 'sold',
      key: 'sold'
    },
    {
      title: 'Lượt xem',
      dataIndex: 'view',
      key: 'view'
    },
    {
      title: 'Hành động',
      dataIndex: 'hasShow',
      key: 'hasShow',
      align: 'center',
      render: (_, record) => <i className="fa-regular fa-trash-can text-blue" onClick={() => console.log(record)}></i>
    }
  ]

  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    getListProducts()
  }, [])

  const fetchDataTable = (value) => {
    console.log('🚀 ~ value:', value)
  }

  return (
    <Layout.Content>
      <div className="flex justify-between my-6">
        <div className="flex items-center gap-4">
          <SearchInput
            loading={loading}
            placeholder="Tìm kiếm..."
            keyword={searchValue}
            onChange={setSearchValue}
            onSearch={fetchDataTable}
          />
          {!loading && <p className="text-[#CF5763] font-medium">{totalProducts} sản phẩm</p>}
        </div>
        <Link to="/product/create">
          <Button type="primary">Thêm sản phẩm</Button>
        </Link>
      </div>
      <Table
        rowClassName="editable-row"
        columns={productsTable}
        scroll={{ x: true }}
        size="middle"
        dataSource={totalProducts > 0 ? productList : []}
        loading={loading}
        rowKey={(product) => product.id}
      />
    </Layout.Content>
  )
}

export default ListProduct
