import { useEffect } from 'react'

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
    <div className="container py-10 bg-white-500">
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  )
}

const AllOrder = () => {
  const { orders, getAllOrders } = useOrderStore()

  useEffect(() => {
    getAllOrders()
  }, [])
  return (
    <div className="container bg-white rounded">
      {orders.map((order) => (
        <OrderItem key={order._id} order={order} />
      ))}
    </div>
  )
}

const OrderItem = ({ order }) => {
  return (
    <div className="p-6 mt-5 bg-white rounded">
      {/* <OrderHeader order={order} />
      <OrderList order={order} /> */}
    </div>
  )
}

export default Purchase
