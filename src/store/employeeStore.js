import { constants } from '@/constants'
import { employeeService } from '@/services/employee'
import { handleNotification } from '@/utils'

import { create } from 'zustand'

const useEmployeeStore = create((set) => ({
  isLoading: false,

  createEmployee: async (data, onSuccess = () => {}) => {
    set({ isLoading: true })
    try {
      await employeeService.createEmployee(data)
      onSuccess()
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  }
}))

export default useEmployeeStore
