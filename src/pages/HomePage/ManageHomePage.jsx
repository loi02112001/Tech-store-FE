import { useEffect, useRef, useState } from 'react'

import useOrderStore from '@/store/orderStore'
import useRevenueStore from '@/store/revenueStore'

import 'dayjs/locale/vi'
import { DatePicker, Radio } from 'antd'
import Chart from 'chart.js/auto'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import weekOfYear from 'dayjs/plugin/weekOfYear'

dayjs.extend(weekOfYear)
dayjs.extend(isoWeek)
dayjs.locale('vi')

function ManageHomePage() {
  const { orderStatus, getStatisticOrder } = useOrderStore()
  const { revenues, getRevenueByWeek, getRevenueByYear } = useRevenueStore()
  const [timeFrame, setTimeFrame] = useState('year')
  const [selectedDate, setSelectedDate] = useState(dayjs())
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    fetchData()
    updateChart()
  }, [timeFrame, selectedDate])

  useEffect(() => {
    if (revenues.length > 0) {
      updateChart()
    }
  }, [revenues])

  const fetchData = () => {
    console.log('fetchData')
    if (timeFrame === 'week') {
      const weekStart = selectedDate.startOf('week').format('YYYY-MM-DD')
      const weekEnd = selectedDate.endOf('week').format('YYYY-MM-DD')
      getRevenueByWeek({ startDate: weekStart, endDate: weekEnd })
    } else {
      const year = selectedDate.format('YYYY')
      getRevenueByYear(year)
    }
  }

  const updateChart = () => {
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext('2d')
    let labels, data

    if (timeFrame === 'week') {
      const weekStart = selectedDate.startOf('week')
      labels = Array.from({ length: 7 }, (_, i) => weekStart.add(i, 'day').format('DD/MM'))
      data = labels.map((label, i) => {
        const date = weekStart.add(i, 'day').format('YYYY-MM-DD')
        const dayData = revenues.find((item) => item.day === date)
        return dayData ? dayData.revenue : 0
      })
    }

    if (timeFrame === 'year') {
      labels = Array.from({ length: 12 }, (_, i) => dayjs().month(i).format('MMMM'))

      data = labels.map((label, i) => {
        const month = dayjs().month(i).format('M')
        const monthData = revenues.find((item) => item.month == month)
        return monthData ? monthData.revenue : 0
      })
      console.log('data, ', data)
    }

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: timeFrame === 'week' ? 'Dữ liệu theo ngày' : 'Dữ liệu theo tháng',
            data,
            backgroundColor: 'rgba(75, 192, 192, 0.6)'
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }

  const onChange = (date) => {
    if (date) {
      setSelectedDate(date)
    }
  }

  useEffect(() => {
    getStatisticOrder()
  }, [])

  return (
    <div>
      <div className="grid grid-cols-4 gap-10">
        <div className="p-5 rounded-lg bg-[#2dcecc] bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-blue-500">
          <h3 className="mb-2 text-base font-bold text-gray-600 uppercase">Tổng đơn hàng</h3>
          <span className="text-lg font-bold">{orderStatus.totalOrder}</span>
        </div>
        <div className="p-5 border-b-4 border-green-600 rounded-lg bg-gradient-to-b from-green-200 to-green-100">
          <h3 className="mb-2 text-base font-bold text-gray-600 uppercase">Đơn thành công</h3>
          <span className="text-lg font-bold">{orderStatus.orderSuccess}</span>
        </div>
        <div className="p-5 rounded-lg bg-[#2dcecc] bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600">
          <h3 className="mb-2 text-base font-bold text-gray-600 uppercase">Đơn đang chờ</h3>
          <span className="text-lg font-bold">{orderStatus.orderPending}</span>
        </div>
        <div className="p-5 border-b-4 border-red-500 rounded-lg bg-gradient-to-b from-red-200 to-red-100">
          <h3 className="mb-2 text-base font-bold text-gray-600 uppercase">Đơn đã huỷ</h3>
          <span className="text-lg font-bold">{orderStatus.orderCancel}</span>
        </div>
      </div>

      <div className="p-5 mt-5 bg-white rounded-lg">
        <div className="flex items-center gap-10 mb-10">
          <span className="text-lg">Thống kê doanh thu theo: </span>
          <Radio.Group value={timeFrame} onChange={(e) => setTimeFrame(e.target.value)}>
            <Radio.Button value="week">Tuần</Radio.Button>
            <Radio.Button value="year">Năm</Radio.Button>
          </Radio.Group>

          {timeFrame === 'week' ? (
            <DatePicker onChange={onChange} picker="week" value={selectedDate} style={{ marginLeft: 16 }} />
          ) : (
            <DatePicker onChange={onChange} picker="year" value={selectedDate} style={{ marginLeft: 16 }} />
          )}
        </div>

        <canvas ref={chartRef} />
      </div>
    </div>
  )
}

export default ManageHomePage
