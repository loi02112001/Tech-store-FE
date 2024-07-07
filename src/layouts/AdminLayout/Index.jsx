import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import Header from '@/components/Header/ManageHeader'
import Sidebar from '@/components/Sidebar'

import { Layout } from 'antd'

import './index.css'

const { Content } = Layout

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Layout style={{ minHeight: '100vh', overflow: 'hidden', background: '#fff4ea' }}>
      <Sidebar collapsed={collapsed} style={{ background: '#FFF' }} />
      <Layout className="site-layout" style={{ marginLeft: 40, background: '#fff4ea' }}>
        <Header
          className="site-layout-background"
          style={{ padding: 0, background: '#001f3f' }}
          collapsed={collapsed}
          changeCollapsed={toggleSidebar}></Header>
        <Content style={{ marginTop: '40px', marginRight: '40px', background: '#fff4ea' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
