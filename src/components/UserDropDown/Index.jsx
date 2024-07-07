import { useCallback, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import useAuthStore from '@/store/authStore'
import { removeToken } from '@/utils'

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
            Tài khoản của tôi
          </Link>
        )
      },
      {
        key: 'link-to-purchase',
        label: (
          <Link to="purchase" className="flex gap-2">
            Đơn mua
          </Link>
        )
      },
      {
        key: 'Đăng xuất',
        label: (
          <button onClick={handleLogout} className="flex gap-2 cursor-pointer">
            Đăng xuất
          </button>
        )
      }
    ],
    [handleLogout]
  )

  return (
    <Dropdown menu={{ items }} placement="bottom" arrow>
      <div className="flex items-center justify-between gap-3 cursor-pointer">
        <span className="text-gray-800 text-base font-medium px-2.5 py-0.5 capitalize">{name}</span>
        <i className="fas fa-user text-primary"></i>
      </div>
    </Dropdown>
  )
}
