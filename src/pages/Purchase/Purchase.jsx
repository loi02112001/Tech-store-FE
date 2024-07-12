import { useEffect, useMemo } from 'react'

import PurchaseItem from '@/components/common/PurchaseItem'
import useOrderStore from '@/store/orderStore'

import { Tabs } from 'antd'

import './Purchase.css'

const AllOrder = ({ orders, status = '' }) => {
  return orders.length === 0 ? (
    <div className="flex flex-col justify-center items-center min-h-24">
      <p className="text-lg uppercase">Không có đơn hàng nào</p>
    </div>
  ) : (
    orders.map((order) => <PurchaseItem key={`order-${order.id}`} order={order} status={status} />)
  )
}

function Purchase() {
  const { orders, getAllOrders } = useOrderStore()

  useEffect(() => {
    getAllOrders('')
  }, [getAllOrders])

  const items = useMemo(
    () =>
      [
        { label: 'Tất cả', key: '' },
        { label: 'Chờ gian hàng', key: 'PENDING' },
        { label: 'Hoàn thành', key: 'SUCCESS' },
        { label: 'Đã hủy', key: 'CANCEL' }
      ].map((item) => ({
        ...item,
        children: <AllOrder orders={orders} status={item.key} />
      })),
    [orders]
  )

  return (
    <div className="container py-10 flex-1">
      <div className="sticky top-0 flex flex-col h-full bg-white-100 border rounded shadow-2xl overflow-hidden">
        <Tabs defaultActiveKey="" items={items} onChange={getAllOrders} />
      </div>
    </div>
  )
}

export default Purchase
