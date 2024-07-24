import { decodeToken } from 'react-jwt'
import { Link, useLocation } from 'react-router-dom'

import { getToken } from '@/utils'

import {
  BankOutlined,
  ContainerOutlined,
  DashboardOutlined,
  GiftOutlined,
  ShopOutlined,
  TagOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'

const { Sider } = Layout

const menuData = [
  {
    key: 'admin',
    icon: <DashboardOutlined />,
    label: <Link to="/admin">Tổng quan</Link>,
    roles: ['ADMIN']
  },
  {
    key: 'admin-product',
    icon: <UnorderedListOutlined />,
    label: <Link to="/admin/product">Danh sách sản phẩm</Link>,
    roles: ['ADMIN', 'EMPLOYEE']
  },
  {
    key: 'admin-category',
    icon: <ContainerOutlined />,
    label: <Link to="/admin/category">Danh mục sản phẩm</Link>,
    roles: ['ADMIN', 'EMPLOYEE']
  },
  {
    key: 'admin-brand',
    icon: <ShopOutlined />,
    label: <Link to="/admin/brand">Thương hiệu</Link>,
    roles: ['ADMIN', 'EMPLOYEE']
  },
  {
    key: 'admin-supplier',
    icon: <BankOutlined />,
    label: <Link to="/admin/supplier">Nhà cung cấp</Link>,
    roles: ['ADMIN']
  },
  {
    key: 'admin-product-batch',
    icon: <ShopOutlined />,
    label: <Link to="/admin/product-batch">Lô hàng</Link>,
    roles: ['ADMIN', 'EMPLOYEE']
  },
  {
    key: 'admin-employee',
    icon: <TeamOutlined />,
    label: <Link to="/admin/employee">Nhân viên</Link>,
    roles: ['ADMIN']
  },
  {
    key: 'admin-promotion',
    icon: <GiftOutlined />,
    label: <Link to="/admin/promotion">Khuyến mãi</Link>,
    roles: ['ADMIN', 'EMPLOYEE']
  },
  {
    key: 'admin-voucher',
    icon: <TagOutlined />,
    label: <Link to="/admin/voucher">Voucher</Link>,
    roles: ['ADMIN', 'EMPLOYEE']
  },
  {
    key: 'admin-employee-profile',
    icon: <UserOutlined />,
    label: <Link to="/admin/employee/profile">Thông tin cá nhân</Link>,
    roles: ['EMPLOYEE']
  }
]

const filterMenuByRole = (menuItems, userRoles) => {
  return menuItems.filter((item) => item.roles.some((role) => userRoles.includes(role)))
}

const AdminSidebar = () => {
  const location = useLocation()
  const token = getToken()
  const dataFromToken = decodeToken(token)

  const getSelectedKeys = () => {
    const path = location.pathname.split('/').filter((i) => i)
    return path.length > 0 ? [path.join('-')] : ['/']
  }

  const generateMenuItems = (data) => {
    return filterMenuByRole(data, dataFromToken.roles).map((item) => ({
      key: item.key,
      icon: item.icon,
      label: item.label
    }))
  }

  return (
    <Sider width={250}>
      <Menu
        mode="inline"
        selectedKeys={getSelectedKeys()}
        style={{ height: '100%', borderRight: 0 }}
        items={generateMenuItems(menuData)}
      />
    </Sider>
  )
}

export default AdminSidebar
