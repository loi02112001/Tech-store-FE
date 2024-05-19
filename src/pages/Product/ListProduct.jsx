import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import DefaultImages from '@/assets/icons/DefaultImage'
import SearchInput from '@/components/common/SearchInput'
import useProductStore from '@/store/productStore'

import { Button, Layout, Switch, Table } from 'antd'

const ListProduct = () => {
  const { loading, products: productList, totalProducts, getProducts, changeProductStatus } = useProductStore()

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
              <img
                alt={record.name}
                src={record.productImage}
                width={50}
                height={50}
                className="inline object-cover rounded-sm"
              />
            ) : (
              <DefaultImages width={50} height={50} />
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
        <p className="text-[#0e2482] font-medium cursor-pointer">
          <Link to={`/product/edit/${product.id}`}>{name}</Link>
        </p>
      )
    },
    {
      title: 'Giá nhập',
      dataIndex: 'importPrice',
      key: 'importPrice',
      render: (importPrice) => formatPrice(importPrice)
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
      title: 'Trạng thái',
      dataIndex: 'hasShow',
      key: 'hasShow',
      render: (hasShow, record) => (
        <Switch
          value={!hasShow}
          onChange={() => {
            changeProductStatus(record.id, { status: !hasShow })
          }}></Switch>
      )
    }
  ]

  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    getProducts()
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
