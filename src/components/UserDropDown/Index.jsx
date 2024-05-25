import useAuthStore from "@/store/authStore"
import { removeToken } from "@/utils"
import { LogoutOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Dropdown } from "antd"
import { useCallback, useMemo } from "react"
import { Link, useNavigate } from "react-router-dom"

export const UserDropdown = () => {
    const navigate = useNavigate()
    const { profile } = useAuthStore()
    const { name } = profile || {}
  
    const handleLogout = useCallback(() => {
      removeToken('token')
      navigate('/login')
    }, [])
  
    const items = useMemo(
      () => [
        {
          key: 'link-to-profile',
          label: (
            <Link to="/store-info" className="flex gap-2">
              <UserOutlined /> Tài khoản
            </Link>
          )
        },
        {
          key: 'Đăng xuất',
          label: (
            <button onClick={handleLogout} className="flex gap-2 cursor-pointer">
              <LogoutOutlined /> Đăng xuất
            </button>
          )
        }
      ],
      [handleLogout]
    )
  
    const avatarElement = useMemo(() => <Avatar icon={<UserOutlined />} />, [])
  
    return (
      <Dropdown menu={{ items }} placement="bottomRight" arrow>
        <div className="flex h-[40px] items-center justify-between gap-3 cursor-pointer">
          <div className="flex flex-col items-center justify-center">
            <p className="uppercase h-[18px] font-semibold leading-[18px]">{name}</p>
          </div>
          {avatarElement}
        </div>
      </Dropdown>
    )
  }