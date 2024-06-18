import { httpDelete, httpGet, httpPost } from '../configs/api'

const createEmployee = (data) => {
  return httpPost('/employee/create', data)
}

const getEmployees = () => {
  return httpGet('/employee/get')
}

const deleteEmployee = (id) => {
  return httpDelete(`/employee/delete/${id}`)
}

export const employeeService = { createEmployee, getEmployees, deleteEmployee }
