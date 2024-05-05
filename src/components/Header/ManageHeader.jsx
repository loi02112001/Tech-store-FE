import { authAction } from "@/actions/authAction"
import { removeToken } from "@/utils"
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Dropdown } from "antd"
import { createElement, useCallback, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

const UserDropdown = () => {
  const profile = useSelector((state) => state.auth.data)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = useCallback(() => {
    removeToken("token")
    dispatch(authAction.logout())
    navigate("/login")
  }, [dispatch, navigate])

  const items = useMemo(
    () => [
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
          <div onClick={handleLogout} className="flex gap-2 cursor-pointer">
            <LogoutOutlined />
            Đăng xuất
          </div>
        ),
      },
    ],
    [handleLogout],
  )

  useEffect(() => {
    dispatch(authAction.getProfile())
  }, [])

  return (
    <Dropdown menu={{ items }} placement="bottomRight" arrow>
      <div className="flex h-[40px] items-center justify-between gap-3 cursor-pointer">
        <div className="flex flex-col items-center justify-center">
          <p className="uppercase h-[18px] font-semibold leading-[18px]">{profile.name}</p>
        </div>
        <Avatar icon={<UserOutlined />} />
      </div>
    </Dropdown>
  )
}

const ManageHeader = ({ collapsed, changeCollapsed }) => {
  return (
    <div className="flex justify-between p-3 bg-white rounded">
      {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        onClick: () => changeCollapsed(),
      })}
      <div className="w-fit">
        <UserDropdown />
      </div>
    </div>
  )
}

export default ManageHeader
