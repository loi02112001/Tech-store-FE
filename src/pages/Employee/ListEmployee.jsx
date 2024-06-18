import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import useEmployeeStore from '@/store/employeeStore'

import { Skeleton, Table } from 'antd'

function ListEmployee() {
  const { loading, employees, getEmployees, deleteEmployee } = useEmployeeStore()
  const categoryTables = [
    {
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (_, record, index) => {
        return index + 1
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
      key: 'phoneNumber',
      align: 'center'
    },
    {
      title: 'Địa chi',
      dataIndex: 'address',
      key: 'address',
      align: 'center'
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      align: 'center',
      render: (_, record) => {
        return record.gender === 'MALE' ? 'Nam' : 'Nữ'
      }
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dob',
      key: 'dob',
      align: 'center'
    },
    {
      title: 'Hành động',
      dataIndex: '',
      key: 'x',
      align: 'center',
      render: (_, record) => (
        <i className="fa-regular fa-pen-to-square text-blue" onClick={() => deleteEmployee(record.id)}></i>
      )
    }
  ]

  useEffect(() => {
    getEmployees()
  }, [])

  return loading ? (
    <Skeleton />
  ) : (
    <>
      <Link to="/employee/create">
        <button className="btn btn-primary mb-10">Thêm nhân viên</button>
      </Link>
      <Table
        rowClassName="editable-row"
        columns={categoryTables}
        size="middle"
        dataSource={employees?.length > 0 ? employees : []}
        loading={loading}
        rowKey={(category) => category.id}
      />
    </>
  )
}

export default ListEmployee
