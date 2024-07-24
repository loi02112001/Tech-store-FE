import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

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
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState('')

  useEffect(() => {
    const type = searchParams.get('type') || ''
    setActiveKey(type.toUpperCase())
  }, [searchParams])

  useEffect(() => {
    getAllOrders(activeKey)
  }, [activeKey, getAllOrders])

  const handleTabChange = (key) => {
    navigate(`?type=${key.toUpperCase()}`)
  }

  const items = useMemo(
    () =>
      [
        { label: 'Tất cả', key: '' },
        { label: 'Chờ thanh toán', key: 'PENDING' },
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
        <Tabs activeKey={activeKey} items={items} onChange={handleTabChange} />
      </div>
    </div>
  )
}

export default Purchase
