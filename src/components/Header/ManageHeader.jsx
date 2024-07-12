import { useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import useUserStore from '@/store/userStore'
import { removeToken } from '@/utils'

import { Dropdown } from 'antd'
const ManageHeaderComponent = () => {
  const { getProfile, user } = useUserStore()
  const navigate = useNavigate()
  const { name } = user || {}

  const handleLogout = useCallback(() => {
    removeToken('token')
    navigate('/login')
  }, [])

  const items = [
    {
      key: 'link-to-profile',
      label: (
        <Link to="/store-info" className="flex gap-2">
          Tài khoản của tôi
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
  ]

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <div className="flex justify-between px-10 py-3 bg-white border-b">
      <a href="/" className="no-underline">
        <h1 className="text-center text-2xl font-semibold">TechStore</h1>
      </a>
      <div className="flex items-center w-fit">
        <Dropdown menu={{ items }} placement="bottom" arrow>
          <div className="flex items-center justify-between gap-3 cursor-pointer">
            <span className="text-gray-800 text-base font-medium px-2.5 py-0.5 capitalize">{name}</span>
            <i className="fas fa-user text-primary"></i>
          </div>
        </Dropdown>
      </div>
    </div>
  )
}

export default ManageHeaderComponent
