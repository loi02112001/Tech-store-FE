import { getToken } from "@/utils"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
  const token = getToken()

  if (token) {
    return <Outlet />
  }

  return <Navigate to="/login" />
}

export default ProtectedRoute
