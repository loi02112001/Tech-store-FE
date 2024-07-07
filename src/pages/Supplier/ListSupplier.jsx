import { useEffect } from 'react'

import useSupplierStore from '@/store/supplierStore'

import AddEditSupplier from './AddEditSupplier'
import { Skeleton, Table } from 'antd'

function ListSupplier() {
  const { loading, suppliers, getSuppliers } = useSupplierStore()
  const supplierTables = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center'
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Hành động',
      dataIndex: '',
      key: 'x',
      render: (_, record) => <AddEditSupplier supplier={record} classButton="text-gray-500 link no-underline" />
    }
  ]

  useEffect(() => {
    getSuppliers()
  }, [])

  return loading ? (
    <Skeleton />
  ) : (
    <div className="relative">
      <h1 className="mb-10 text-3xl font-semibold">Nhà cung cấp</h1>
      <AddEditSupplier textButton="Thêm nhà cung cấp" classButton="absolute right-0 top-5 btn btn-primary" />
      <Table
        rowClassName="editable-row"
        columns={supplierTables}
        size="middle"
        bordered
        dataSource={suppliers?.length > 0 ? suppliers : []}
        loading={loading}
        rowKey={(supplier) => supplier.id}
      />
    </div>
  )
}

export default ListSupplier
