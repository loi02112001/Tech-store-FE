import { useEffect } from 'react'

import useVoucherStore from '@/store/voucherStore'
import { formatMoneyVND } from '@/utils'

import AddEditVoucher from './AddEditVoucher'
import { Skeleton, Table } from 'antd'
import dayjs from 'dayjs'

function ListVoucher() {
  const { loading, vouchers, getAllVoucher } = useVoucherStore()

  const voucherTables = [
    {
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (index) => {
        return index
      }
    },
    {
      title: 'Mã voucher',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      align: 'center'
    },
    {
      title: 'Số lượng',
      dataIndex: 'totalQuantity',
      key: 'totalQuantity',
      align: 'center'
    },
    {
      title: 'Số lượng đã sử dụng',
      dataIndex: 'usedQuantity',
      key: 'usedQuantity',
      align: 'center'
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discountPrice',
      key: 'discountPrice',
      align: 'center',
      render: (price) => {
        return formatMoneyVND(price)
      }
    },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'endTime',
      key: 'endTime',
      align: 'center',
      render: (date) => {
        return dayjs(date).format('DD/MM/YYYY')
      }
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'startTime',
      key: 'startTime',
      align: 'center',
      render: (date) => {
        return dayjs(date).format('DD/MM/YYYY')
      }
    },
    {
      title: 'Điều kiện sử dụng',
      dataIndex: 'voucherCondition',
      key: 'voucherCondition',
      align: 'center',
      render: (condition) => {
        return formatMoneyVND(condition)
      }
    }
  ]

  useEffect(() => {
    getAllVoucher()
  }, [])

  return loading ? (
    <Skeleton />
  ) : (
    <>
      <AddEditVoucher textButton="Tạo voucher" classButton="mb-4 btn btn-primary" />
      <Table
        rowClassName="editable-row"
        columns={voucherTables}
        size="middle"
        dataSource={vouchers?.length > 0 ? vouchers : []}
        loading={loading}
        rowKey={(voucher) => voucher.id}
      />
    </>
  )
}

export default ListVoucher
