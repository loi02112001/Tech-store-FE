import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import CustomPagination from '@/components/CustomPagination/CustomPagination'
import useEmployeeStore from '@/store/employeeStore'

import { Skeleton, Table } from 'antd'

function ListEmployee() {
  const { loading, employees, total, getEmployees, deleteEmployee } = useEmployeeStore()
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0
  })

  const categoryTables = [
    {
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (_, record, index) => {
        return index + 1 + (pagination.current - 1) * pagination.pageSize
      }
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'SĐT',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    },
    {
      title: 'Địa chi',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      render: (_, record) => {
        return record.gender === 'MALE' ? 'Nam' : 'Nữ'
      }
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dob',
      key: 'dob'
    },
    {
      title: 'Hành động',
      dataIndex: '',
      key: 'x',
      align: 'center',
      render: (_, record) => (
        <i
          className="fa-regular fa-trash-can text-red-500 cursor-pointer"
          onClick={() => deleteEmployee(record.id)}></i>
      )
    }
  ]

  const fetchData = async (page = 1, limit) => {
    await getEmployees({ page, limit })
    setPagination((prev) => ({
      ...prev,
      current: page
    }))
  }

  const handleTableChange = (page) => {
    setPagination((prev) => ({
      ...prev,
      current: page
    }))
  }

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize)
  }, [pagination.current])

  return loading ? (
    <Skeleton />
  ) : (
    <>
      <Link to="/admin/employee/create">
        <button className="btn btn-blue mb-10">Thêm nhân viên</button>
      </Link>
      <Table
        rowClassName="editable-row"
        columns={categoryTables}
        size="middle"
        dataSource={employees?.length > 0 ? employees : []}
        loading={loading}
        rowKey={(category) => category.id}
        pagination={false}
      />
      <CustomPagination
        current={pagination.current}
        total={total}
        pageSize={pagination.pageSize}
        onChange={handleTableChange}
      />
    </>
  )
}

export default ListEmployee
