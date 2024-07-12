import { useEffect } from 'react'

import useSupplierStore from '@/store/supplierStore'

import AddEditSupplier from './AddEditSupplier'
import { Skeleton, Table } from 'antd'

function ListSupplier() {
  const { loading, suppliers, getSuppliers } = useSupplierStore()
  const supplierTables = [
    {
      title: '',
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
      align: 'center',
      render: (_, record) => (
        <AddEditSupplier
          supplier={record}
          classButton="text-gray-500 link no-underline"
          textButton={<i className="cursor-pointer fa-regular fa-pen-to-square text-blue"></i>}
        />
      )
    }
  ]

  useEffect(() => {
    getSuppliers()
  }, [])

  return loading ? (
    <Skeleton />
  ) : (
    <div className="relative">
      <AddEditSupplier textButton="Thêm nhà cung cấp" classButton="btn btn-blue mb-5" />
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
