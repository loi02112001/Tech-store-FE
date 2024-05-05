import Header from "@/components/Header/ManageHeader"
import Sidebar from "@/components/Sidebar"
import { Layout } from "antd"
import { useState } from "react"
import { Outlet } from "react-router-dom"

import "./index.css"

const { Content } = Layout

const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Layout style={{ minHeight: "100vh", overflowX: "hidden" }}>
      <Sidebar collapsed={collapsed} style={{ background: "#FFF" }} />
      <Layout className="site-layout" style={{ marginLeft: 40 }}>
        <Header
          className="site-layout-background"
          style={{ padding: 0, background: "#001f3f" }}
          collapsed={collapsed}
          changeCollapsed={toggleSidebar}></Header>
        <Content style={{ marginTop: "20px", marginRight: "20px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default HomePage
