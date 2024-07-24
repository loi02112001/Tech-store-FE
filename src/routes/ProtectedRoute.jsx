import { decodeToken } from 'react-jwt'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { getToken } from '@/utils'

const ProtectedRoute = () => {
  const location = useLocation()
  const token = getToken()
  const dataFromToken = decodeToken(token)

  if (!token) {
    return <Navigate to="/login" />
  }

  if (
    location.pathname.includes('/admin') &&
    !dataFromToken?.roles?.some((role) => role === 'ADMIN' || role === 'EMPLOYEE')
  ) {
    return <Navigate to="/404" />
  }

  return <Outlet />
}

export default ProtectedRoute
