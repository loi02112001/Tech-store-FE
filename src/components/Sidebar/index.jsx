import { Link, useLocation } from 'react-router-dom'

import {
  AppstoreOutlined,
  BankOutlined,
  ContainerOutlined,
  DashboardOutlined,
  GiftOutlined,
  ShopOutlined,
  TagOutlined,
  TeamOutlined,
  UnorderedListOutlined
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'

const { Sider } = Layout

const menuData = [
  {
    key: '/',
    icon: <DashboardOutlined />,
    label: <Link to="/">Tổng quan</Link>
  },
  {
    key: 'product',
    icon: <AppstoreOutlined />,
    label: 'Sản phẩm',
    children: [
      { key: 'product-list', icon: <UnorderedListOutlined />, label: <Link to="/product">Danh sách sản phẩm</Link> },
      { key: 'category', icon: <ContainerOutlined />, label: <Link to="/category">Danh mục sản phẩm</Link> },
      { key: 'brand', icon: <ShopOutlined />, label: <Link to="/brand">Thương hiệu</Link> },
      { key: 'supplier', icon: <BankOutlined />, label: <Link to="/supplier">Nhà cung cấp</Link> },
      { key: '/product-batch', icon: <ShopOutlined />, label: <Link to="/product-batch">Lô hàng</Link> }
    ]
  },
  {
    key: 'staff',
    icon: <TeamOutlined />,
    label: <Link to="/staff">Nhân viên</Link>
  },
  {
    key: 'promotion',
    icon: <GiftOutlined />,
    label: <Link to="/promotion">Khuyến mãi</Link>
  },
  {
    key: 'voucher',
    icon: <TagOutlined />,
    label: <Link to="/voucher">Voucher</Link>
  }
]

const AdminSidebar = () => {
  const location = useLocation()

  const getOpenKeys = () => {
    const path = location.pathname.split('/').filter((i) => i)
    return path.length > 1 ? [path[0]] : []
  }

  const getSelectedKeys = () => {
    const path = location.pathname.split('/').filter((i) => i)
    return path.length > 1 ? [path.join('-')] : [path[0]]
  }

  const generateMenuItems = (data) => {
    return data.map((item) => {
      if (item.children) {
        return {
          key: item.key,
          icon: item.icon,
          label: item.label,
          children: generateMenuItems(item.children)
        }
      }
      return {
        key: item.key,
        icon: item.icon,
        label: item.label
      }
    })
  }

  return (
    <Sider width={250}>
      <Menu
        mode="inline"
        selectedKeys={getSelectedKeys()}
        defaultOpenKeys={getOpenKeys()}
        style={{ height: '100%', borderRight: 0 }}
        items={generateMenuItems(menuData)}
      />
    </Sider>
  )
}

export default AdminSidebar
