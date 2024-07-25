import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import DefaultImages from '@/assets/icons/DefaultImage'
import CustomPagination from '@/components/CustomPagination/CustomPagination'
import useProductStore from '@/store/productStore'

import { Button, Input, Layout, Modal, Table } from 'antd'
const { Search } = Input

const ListProduct = () => {
  const { loading, products: productList, totalProducts, getListProducts, deleteProduct } = useProductStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [productIdToDelete, setProductIdToDelete] = useState('')
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0
  })

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const productsTable = [
    {
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (_, record, index) => index + 1 + (pagination.current - 1) * pagination.pageSize
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
        <p className="text-gray-500 link no-underline">
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
      render: (_, record) => (
        <div className="flex items-center justify-center gap-10">
          <Link to={`/admin/product/edit/${record.id}`}>
            <i className="fa-regular fa-pen-to-square text-blue"></i>
          </Link>

          <i
            className="fa-regular fa-trash-can text-red-500 cursor-pointer"
            onClick={() => {
              setIsModalOpen(true)
              setProductIdToDelete(record.id)
            }}></i>
        </div>
      )
    }
  ]
  const fetchData = async (page = 1, limit) => {
    await getListProducts({ page, limit })

    setPagination((prev) => ({
      ...prev,
      current: page
    }))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleTableChange = (page) => fetchData(page)

  const fetchDataTable = (value) => {
    getListProducts({ page: 1, name: value })
  }

  return (
    <Layout.Content>
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-4 w-1/3">
          <Search placeholder="Tìm kiếm..." allowClear enterButton="Tìm kiếm" size="small" onSearch={fetchDataTable} />
          {!loading && <p className="text-red shrink-0 font-medium">{totalProducts} sản phẩm</p>}
        </div>
        <Link to="/admin/product/create">
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
        pagination={false}
      />

      <CustomPagination current={pagination.current} total={totalProducts} onChange={handleTableChange} />

      <Modal
        title="Xoá sản phẩm"
        okText="Đồng ý"
        cancelText="Hủy"
        open={isModalOpen}
        centered
        onOk={() => {
          deleteProduct(productIdToDelete)
          setIsModalOpen(false)
        }}
        onCancel={() => setIsModalOpen(false)}>
        <p>Bạn có chắc muốn xoá sản phẩm này</p>
      </Modal>
    </Layout.Content>
  )
}

export default ListProduct
