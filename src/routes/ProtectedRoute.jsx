import { Navigate, Outlet } from 'react-router-dom'

import { getToken } from '@/utils'

const ProtectedRoute = () => {
  const token = getToken()

  if (token) {
    return <Outlet />
  }

  return <Navigate to="/login" />
}

export default ProtectedRoute
