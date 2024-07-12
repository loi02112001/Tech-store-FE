import { useEffect } from 'react'

import DefaultImage from '@/assets/icons/DefaultImage'
import useProductBatchStore from '@/store/productBatchStore'

import AddProductBatch from './AddProductBatch'
import { Skeleton, Table } from 'antd'
import dayjs from 'dayjs'
import { formatMoneyVND } from '@/utils'

function ListProductBatch() {
  const { loading, productBatches, getProductBatches } = useProductBatchStore()
  const supplierTables = [
    {
      title: '',
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
      key: 'importPrice',
      render: (price) => formatMoneyVND(price)
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
      <AddProductBatch textButton="Thêm lô hàng" classButton="btn btn-blue mb-5" />
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
