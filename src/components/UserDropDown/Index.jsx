import { useCallback, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import useAuthStore from '@/store/authStore'
import { removeToken } from '@/utils'

import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'

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

  return (
    <Dropdown menu={{ items }} placement="bottom" arrow>
      <div className="flex items-center justify-between gap-3 cursor-pointer">
        <i className="fas fa-user text-blue-500"></i>
        <span className="text-gray-800 text-xs font-medium px-2.5 py-0.5 capitalize">{name}</span>
      </div>
    </Dropdown>
  )
}
