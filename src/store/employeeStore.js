import { constants } from '@/constants'
import { employeeService } from '@/services/employee'
import { handleNotification } from '@/utils'

import { create } from 'zustand'

const useEmployeeStore = create((set, get) => ({
  employees: [],
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
  },

  getEmployees: async () => {
    set({ isLoading: true })
    try {
      const res = await employeeService.getEmployees()
      const { list, pages, total } = res.data
      set({ employees: list, pages, totalEmployees: total })
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  },
  deleteEmployee: async (id, onSuccess = () => {}) => {
    set({ isLoading: true })
    try {
      await employeeService.deleteEmployee(id)
      onSuccess()
      await get().getEmployees()
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  }
}))

export default useEmployeeStore
