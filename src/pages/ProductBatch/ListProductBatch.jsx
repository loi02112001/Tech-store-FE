import { useEffect, useState } from 'react'

import DefaultImage from '@/assets/icons/DefaultImage'
import CustomPagination from '@/components/CustomPagination/CustomPagination'
import useProductBatchStore from '@/store/productBatchStore'
import { formatMoneyVND } from '@/utils'

import AddProductBatch from './AddProductBatch'
import { Skeleton, Table } from 'antd'
import dayjs from 'dayjs'

function ListProductBatch() {
  const { loading, totalItems, productBatches, getProductBatches } = useProductBatchStore()
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0
  })

  const supplierTables = [
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (_, record, index) => index + 1 + (pagination.current - 1) * pagination.pageSize
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

  const fetchData = async (page = 1, limit) => {
    await getProductBatches({ page, limit })

    setPagination((prev) => ({
      ...prev,
      current: page
    }))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleTableChange = (page) => fetchData(page)

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
        pagination={false}
      />
      <CustomPagination current={pagination.current} total={totalItems} onChange={handleTableChange} />
    </div>
  )
}

export default ListProductBatch
