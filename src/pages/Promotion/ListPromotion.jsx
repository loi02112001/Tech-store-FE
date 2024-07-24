import { useEffect, useState } from 'react'

import DefaultImage from '@/assets/icons/DefaultImage'
import CustomPagination from '@/components/CustomPagination/CustomPagination'
import usePromotionStore from '@/store/promotionStore'
import { formatMoneyVND } from '@/utils'

import AddEditPromotion from './AddEditPromotion'
import { Skeleton, Switch, Table } from 'antd'
import dayjs from 'dayjs'

function ListPromotion() {
  const { loading, promotions, totalItems, getPromotions, updatePromotionStatus } = usePromotionStore()

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0
  })

  const promotionTables = [
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
      title: 'Giá giảm',
      dataIndex: 'discountPrice',
      key: 'discountPrice',
      render: (discountPrice) => formatMoneyVND(discountPrice)
    },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (date) => {
        return dayjs(date).format('DD/MM/YYYY')
      }
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (date) => {
        return dayjs(date).format('DD/MM/YYYY')
      }
    },
    {
      title: 'Áp dụng',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive, record) => (
        <Switch
          value={isActive}
          onChange={() => {
            updatePromotionStatus(record.id, { isActive: !isActive })
          }}></Switch>
      )
    },
    {
      title: 'Hành động',
      dataIndex: '',
      key: 'x',
      align: 'center',
      render: (_, record) => (
        <AddEditPromotion
          promotion={record}
          title="Cập nhật khuyến mãi"
          classButton="text-gray-500 link no-underline"
          textButton={<i className="cursor-pointer fa-regular fa-pen-to-square text-blue"></i>}
        />
      )
    }
  ]

  const fetchData = async (page = 1, limit) => {
    await getPromotions({ page, limit })
    setPagination((prev) => ({
      ...prev,
      current: page
    }))
  }

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize)
  }, [pagination.current])

  const handleTableChange = (page) => {
    setPagination((prev) => ({
      ...prev,
      current: page
    }))
  }

  return loading ? (
    <Skeleton />
  ) : (
    <>
      <AddEditPromotion title="Tạo khuyến mãi" textButton="Tạo khuyến mãi" classButton="mb-4 btn btn-blue" />
      <Table
        rowClassName="editable-row"
        columns={promotionTables}
        size="middle"
        dataSource={promotions?.length > 0 ? promotions : []}
        loading={loading}
        rowKey={(promotion) => promotion.id}
        pagination={false}
      />

      <CustomPagination
        current={pagination.current}
        total={totalItems}
        pageSize={pagination.pageSize}
        onChange={handleTableChange}
      />
    </>
  )
}

export default ListPromotion
