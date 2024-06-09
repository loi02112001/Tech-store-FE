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
    <div className="flex justify-between py-3 px-10 bg-white rounded">
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
