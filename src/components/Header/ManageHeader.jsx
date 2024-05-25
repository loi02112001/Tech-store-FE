import { createElement, memo, useCallback, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import useAuthStore from '@/store/authStore'
import { removeToken } from '@/utils'

import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown } from 'antd'
import { UserDropdown } from '../UserDropDown/Index'

const ManageHeaderComponent = memo(({ collapsed, changeCollapsed }) => {
  const {getProfile} = useAuthStore()

  useEffect(()=>{
    getProfile()
  },[])

  return (
    <div className="flex justify-between p-3 bg-white rounded">
      {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        onClick: () => changeCollapsed()
      })}
      <div className="w-fit">
        <UserDropdown />
      </div>
    </div>
  )
})

ManageHeaderComponent.displayName = 'ManageHeader'

export default ManageHeaderComponent
