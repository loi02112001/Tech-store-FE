import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'

const menuData = [
  { key: '/', label: 'Tổng quan', path: '' },
  { key: '/product', label: 'Sản phẩm', path: '/product' },
  { key: '/category', label: 'Danh mục', path: '/category' },
  { key: '/brand', label: 'Thương hiệu', path: '/brand' },
  { key: '/supplier', label: 'Nhà cung cấp', path: '/supplier' },
  { key: '/product-batch', label: 'Lô hàng', path: '/product-batch' },
  { key: '/employee', label: 'Nhân viên', path: '/employee' },
  { key: '/promotion', label: 'Khuyến mãi', path: '/promotion' }
]

const createMenuItem = ({ key, label, path }) => ({
  key,
  label: (
    <Link className="flex justify-between" to={path}>
      {label}
    </Link>
  )
})

const menuSidebar = menuData.map(createMenuItem)

const Sidebar = ({ collapsed }) => {
  const [activePath, setActivePath] = useState(window.location.pathname)

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} width={300} style={{ backgroundColor: '#001f3f' }}>
      <a href="/" className="no-underline">
        <h1 className="my-4 text-center text-5xl font-semibold">TechStore</h1>
      </a>
      <Menu
        items={menuSidebar}
        theme="light"
        mode="inline"
        defaultSelectedKeys={[activePath]}
        selectedKeys={[activePath]}
        onClick={({ key }) => setActivePath(key)}
        style={{
          margin: '16px 0'
        }}
      />
    </Sider>
  )
}

export default Sidebar
