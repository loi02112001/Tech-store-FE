import { toast } from "react-toastify"

import { constants } from "@/constants"
import { employeeService } from "@/services/employee"

const createEmployee = (data, onSuccess = () => {}) => {
  return async (dispatch) => {
    dispatch({ type: constants.ADD_EMPLOYEE_REQUEST })
    try {
      const {
        data: { code },
      } = await employeeService.createEmployee(data)
      if (code === 201) {
        dispatch({ type: constants.ADD_EMPLOYEE_SUCCESS })
        onSuccess()
      }
    } catch (error) {
      dispatch({ type: constants.ADD_EMPLOYEE_FAILURE })
      toast.error("Có lỗi xảy ra")
    }
  }
}

export const employeeAction = { createEmployee }
