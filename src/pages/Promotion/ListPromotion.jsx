import { useEffect } from 'react'

import usePromotionStore from '@/store/promotionStore'

import AddEditPromotion from './AddEditPromotion'
import { Skeleton, Switch, Table } from 'antd'
import DefaultImage from '@/assets/icons/DefaultImage'
import { render } from 'react-dom'
import { formatMoneyVND } from '@/utils'

function ListPromotion() {
  const { loading, promotions, getPromotions, updatePromotion } = usePromotionStore()
  console.log('🚀 ~ ListPromotion ~ promotions:', promotions)

  const promotionTables = [
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
      title: 'Giá giảm',
      dataIndex: 'discountPrice',
      key: 'discountPrice',
      render: (discountPrice) => formatMoneyVND(discountPrice)
    },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'startTime',
      key: 'startTime'
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'endTime',
      key: 'endTime'
    },
    {
      title: 'Áp dụng',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive, record) => (
        <Switch
          value={isActive}
          onChange={() => {
            updatePromotion(record.id, { ...record, isActive: !isActive })
          }}></Switch>
      )
    },
    {
      title: 'Hành động',
      dataIndex: '',
      key: 'x',
      render: (_, record) => (
        <AddEditPromotion promotion={record} title="Cập nhật khuyến mãi" classButton="link no-underline" />
      )
    }
  ]

  useEffect(() => {
    getPromotions()
  }, [])

  return loading ? (
    <Skeleton />
  ) : (
    <>
      <AddEditPromotion title="Tạo khuyến mãi" textButton="Tạo khuyến mãi" classButton="mb-4 btn btn-primary" />
      <Table
        rowClassName="editable-row"
        columns={promotionTables}
        size="middle"
        dataSource={promotions?.length > 0 ? promotions : []}
        loading={loading}
        rowKey={(promotion) => promotion.id}
      />
    </>
  )
}

export default ListPromotion
