import { useEffect } from 'react'

import PurchaseItem from '@/components/common/PurchaseItem'
import useOrderStore from '@/store/orderStore'

import { Tabs } from 'antd'

import './Purchase.css'

function Purchase() {
  const items = [
    {
      label: 'Tất cả',
      key: 'all',
      children: <AllOrder />
    },
    {
      label: 'Chờ gian hàng',
      key: 'pending',
      children: `Content of Tab Pane 2`
    },
    {
      label: 'Hoàn thành',
      key: 'success',
      children: `Content of Tab Pane 3`
    },
    {
      label: 'Đã hủy',
      key: 'cancel',
      children: `Content of Tab Pane 3`
    }
  ]
  return (
    <div className="container py-4 bg-white-500">
      <div className="sticky top-0">
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  )
}

const AllOrder = () => {
  const { orders, getAllOrders } = useOrderStore()

  useEffect(() => {
    getAllOrders()
  }, [])
  return (
    <div className="flex flex-col gap-4">
      {orders.map((order) => (
        <PurchaseItem key={order.id} order={order} />
      ))}
    </div>
  )
}

export default Purchase
