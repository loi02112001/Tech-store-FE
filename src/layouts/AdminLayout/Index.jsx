import { Outlet } from 'react-router-dom'

import Header from '@/components/Header/ManageHeader'
import Sidebar from '@/components/Sidebar'

import { Layout } from 'antd'

const { Content } = Layout

const AdminLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh', overflow: 'hidden', background: '#fff4ea' }}>
      <Header className="site-layout-background" style={{ padding: 0, background: '#001f3f' }}></Header>
      <Layout className="site-layout" style={{ background: '#fff4ea' }}>
        <Sidebar />

        <Content style={{ padding: '24px', background: '#fff4ea' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
