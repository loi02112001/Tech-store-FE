import { createElement, memo, useEffect } from 'react'

import useAuthStore from '@/store/authStore'

import { UserDropdown } from '../UserDropDown/Index'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

const ManageHeaderComponent = memo(({ collapsed, changeCollapsed }) => {
  const { getProfile } = useAuthStore()

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <div className="flex justify-between px-10 py-3 bg-white rounded min-h-[70px]">
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
