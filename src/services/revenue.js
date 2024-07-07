import { httpGet } from '@/configs/api'

const getRevenueByWeek = (data) => httpGet(`revenue/get-by-week?startDate=${data.startDate}&endDate=${data.endDate}`)

const getRevenueByYear = (data) => httpGet(`revenue/get-by-year?year=${data}`)

export const revenueService = {
  getRevenueByWeek,
  getRevenueByYear
}
