import { useEffect } from 'react'

import DefaultImage from '@/assets/icons/DefaultImage'
import useProductBatchStore from '@/store/productBatchStore'

import AddProductBatch from './AddProductBatch'
import { Skeleton, Table } from 'antd'
import dayjs from 'dayjs'

function ListProductBatch() {
  const { loading, productBatches, getProductBatches } = useProductBatchStore()
  const supplierTables = [
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
      render: (_, record) => {
        return (
          <>
            {record.productImage ? (
              <img alt={record.name} src={record.productImage} className="w-12 object-cover rounded-sm aspect-square" />
            ) : (
              <DefaultImage />
            )}
          </>
        )
      }
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      key: 'productName'
    },
    {
      title: 'Nhà cung cấp',
      dataIndex: 'supplierName',
      key: 'supplierName'
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: 'Giá nhập',
      dataIndex: 'importPrice',
      key: 'importPrice'
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => {
        return dayjs(date).format('DD/MM/YYYY')
      }
    }
  ]

  useEffect(() => {
    getProductBatches()
  }, [])

  return loading ? (
    <Skeleton />
  ) : (
    <div className="relative">
      <h1 className="mb-10 text-3xl font-semibold">Lô Hàng</h1>
      <AddProductBatch textButton="Thêm lô hàng" classButton="absolute right-0 top-5 btn btn-primary" />
      <Table
        columns={supplierTables}
        size="middle"
        dataSource={productBatches?.length > 0 ? productBatches : []}
        loading={loading}
        rowKey={(supplier) => supplier.id}
      />
    </div>
  )
}

export default ListProductBatch
