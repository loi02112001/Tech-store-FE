import { createElement, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { authAction } from "@/actions/authAction"

import { LogoutOutlined, UserOutlined } from "@ant-design/icons"
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { Avatar, Dropdown } from "antd"
import { removeToken } from "@/utils"

const Header = ({ collapsed, changeCollapsed }) => {
  const profile = useSelector((state) => state.auth.data)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSuccess = () => {
    navigate("/login")
  }

  const handleLogout = () => {
    removeToken("token")
  }

  const items = [
    {
      key: "link-to-profile",
      label: (
        <Link to="/store-info" className="flex gap-2">
          <UserOutlined />
          Tài khoản
        </Link>
      ),
    },
    {
      key: "Đăng xuất",
      label: (
        <Link to="/login" onClick={handleLogout} className="flex gap-2">
          <LogoutOutlined />
          Đăng xuất
        </Link>
      ),
    },
  ]

  useEffect(() => {
    dispatch(authAction.getProfile())
  }, [])

  return (
    <div className="flex justify-between p-3 bg-white rounded">
      {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        onClick: () => changeCollapsed(),
      })}
      <div className="w-fit">
        <Dropdown menu={{ items }} placement="bottomRight" arrow>
          <div className="flex h-[40px] items-center justify-between gap-3 cursor-pointer">
            <div className="flex flex-col items-center justify-center">
              <p className="uppercase h-[18px] font-semibold leading-[18px]">{profile.name}</p>
            </div>
            <Avatar icon={<UserOutlined />} />
          </div>
        </Dropdown>
      </div>
    </div>
  )
}

export default Header
