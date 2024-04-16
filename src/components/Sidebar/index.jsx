import { DashboardOutlined, FileDoneOutlined, ReconciliationOutlined, SettingOutlined } from "@ant-design/icons"
import { Menu } from "antd"
import Sider from "antd/es/layout/Sider"
import { Link } from "react-router-dom"

import logo from "../../assets/images/logo.jpg"
import "./index.css"

const Sidebar = ({ collapsed }) => {
  const path = window.location.pathname

  const menuSidebar = [
    {
      key: "/",
      icon: <DashboardOutlined style={{ color: "#4595ef" }} />,
      label: (
        <Link className="flex justify-between" to="">
          Tổng quan
        </Link>
      ),
    },
    {
      key: "/shop",
      icon: <ReconciliationOutlined style={{ color: "#4595ef" }} className="w-[16px]" />,
      label: (
        <Link className="flex justify-between" to="/shop">
          Thông tin cửa hàng
        </Link>
      ),
    },
    {
      key: "/product",
      key: "/product",
      icon: <FileDoneOutlined style={{ color: "#ff6900" }} className="w-[16px]" />,
      label: (
        <Link className="flex justify-between" to="/product">
          Sản phẩm
        </Link>
      ),
    },

    {
      key: "/category",
      icon: <FileDoneOutlined style={{ color: "#ff6900" }} className="w-[16px]" />,
      label: (
        <Link className="flex justify-between" to="/category">
          Danh mục
        </Link>
      ),
    },
    {
      key: "/brand",
      icon: <FileDoneOutlined style={{ color: "#ff6900" }} className="w-[16px]" />,
      label: (
        <Link className="flex justify-between" to="/brand">
          Thương hiệu
        </Link>
      ),
    },
    {
      key: "/employee",
      icon: <FileDoneOutlined style={{ color: "#ff6900" }} className="w-[16px]" />,
      label: (
        <Link className="flex justify-between" to="/employee">
          Nhân viên
        </Link>
      ),
    },
    {
      key: "/settings",
      icon: <SettingOutlined style={{ color: "#3341da" }} className="w-[16px]" />,
      label: (
        <Link className="flex justify-between" to={path}>
          Cài đặt chung
        </Link>
      ),
    },
  ]

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} width={300} style={{ backgroundColor: "#001f3f" }}>
      <img src={logo} alt="logo" className="max-w-full h-[200px] object-cover" />
      <Menu
        items={menuSidebar}
        theme="light"
        mode="inline"
        defaultSelectedKeys={[path]}
        selectedKeys={[path]}
        style={{
          margin: "16px 0",
        }}
      />
    </Sider>
  )
}

export default Sidebar
