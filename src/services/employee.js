import { httpDelete, httpGet, httpPost } from '../configs/api'

const createEmployee = (data) => httpPost('/employee/create', data)

const getEmployees = (data) =>
  httpGet(`/employee/get${data?.page ? `?page=${data.page}` : ''}${data?.limit ? `&limit=${data.limit}` : ''}`)

const deleteEmployee = (id) => httpDelete(`/employee/delete/${id}`)

export const employeeService = { createEmployee, getEmployees, deleteEmployee }
