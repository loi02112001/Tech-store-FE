import { httpPost } from "../configs/api"

const createEmployee = (data) => {
  return httpPost("/employee/create", data)
}

export const employeeService = { createEmployee }
