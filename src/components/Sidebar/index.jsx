import { Link } from "react-router-dom"

import logo from "../../assets/images/logo.jpg"
import { DashboardOutlined, FileDoneOutlined, ReconciliationOutlined, SettingOutlined } from "@ant-design/icons"
import { Menu } from "antd"
import Sider from "antd/es/layout/Sider"

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
    // {
    //   key: "/discount",
    //   icon: <ReconciliationOutlined style={{ color: "#4595ef" }} className="w-[16px]" />,
    //   label: (
    //     <Link className="flex justify-between" to="discount">
    //       Giảm giá
    //     </Link>
    //   ),
    // },
    {
      key: "/products",
      icon: <FileDoneOutlined style={{ color: "#ff6900" }} className="w-[16px]" />,
      label: (
        <Link className="flex justify-between" to="/products">
          Sản phẩm
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
      // children: [
      //   {
      //     key: "/theme",
      //     label: (
      //       <Link className="flex justify-between" to="/theme">
      //         Giao diện trang chủ
      //       </Link>
      //     ),
      //   },
      //   {
      //     key: "/store-info",
      //     label: (
      //       <Link className="flex justify-between" to="/store-info">
      //         Thông tin cửa hàng
      //       </Link>
      //     ),
      //   },
      //   {
      //     key: "/shipments",
      //     label: (
      //       <Link className="flex justify-between" to="/shipments">
      //         Hình thức vận chuyển
      //       </Link>
      //     ),
      //   },
      //   {
      //     key: "/method-payments",
      //     label: (
      //       <Link className="flex justify-between" to="/method-payments">
      //         Hình thức thanh toán
      //       </Link>
      //     ),
      //   },
      //   {
      //     key: "/bonus_sharing",
      //     label: (
      //       <Link className="flex justify-between" to="/bonus_sharing">
      //         Chính sách chia thưởng
      //       </Link>
      //     ),
      //   },
      //   {
      //     key: "/transport",
      //     label: (
      //       <Link className="flex justify-between" to="/transport">
      //         Cài đặt giao vận
      //       </Link>
      //     ),
      //   },
      // ],
    },
  ]

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} width={300} style={{ backgroundColor: "#001f3f" }}>
      <img src={logo} alt="logo" className="max-w-full h-[200px] object-cover"/>
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
