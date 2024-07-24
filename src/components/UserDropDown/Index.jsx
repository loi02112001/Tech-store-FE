import { useCallback, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import useUserStore from '@/store/userStore'
import { removeToken } from '@/utils'

import { Dropdown } from 'antd'

export const UserDropdown = () => {
  const navigate = useNavigate()
  const { user } = useUserStore()
  const { name, avatar } = user || {}

  const handleLogout = useCallback(() => {
    removeToken('token')
    navigate('/login')
  }, [navigate])

  const items = useMemo(
    () => [
      {
        key: 'link-to-profile',
        label: <Link to="/user/profile">Tài khoản của tôi</Link>
      },
      {
        key: 'link-to-purchase',
        label: <Link to="purchase">Đơn mua</Link>
      },
      {
        key: 'logout',
        label: <button onClick={handleLogout}>Đăng xuất</button>
      }
    ],
    [handleLogout]
  )

  const renderAvatar = () => {
    if (!name) return null
    return avatar ? (
      <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
    ) : (
      <i className="fas fa-user text-primary"></i>
    )
  }

  return (
    <Dropdown menu={{ items: name ? items : [] }} placement="bottom" arrow>
      <div className="flex items-center justify-between gap-3 cursor-pointer">
        <Link
          to={name ? '#' : '/login'}
          className="text-gray-800 text-base font-medium px-2.5 py-0.5 capitalize w-40 truncate">
          {name || 'Đăng nhập'}
        </Link>
        {renderAvatar()}
      </div>
    </Dropdown>
  )
}
