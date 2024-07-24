import { useEffect, useState } from 'react'

import CustomPagination from '@/components/CustomPagination/CustomPagination'
import useSupplierStore from '@/store/supplierStore'

import AddEditSupplier from './AddEditSupplier'
import { Modal, Skeleton, Table } from 'antd'

const ListSupplier = () => {
  const { loading, suppliers, totalItems, getSuppliers, deleteSupplier } = useSupplierStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [id, setId] = useState('')
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20
  })

  const supplierColumns = [
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (_, record, index) => index + 1 + (pagination.current - 1) * pagination.pageSize
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
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <div className="flex items-center justify-center gap-10">
          <AddEditSupplier
            supplier={record}
            classButton="text-gray-500 link no-underline"
            textButton={<i className="cursor-pointer fa-regular fa-pen-to-square text-blue"></i>}
          />
          <i
            className="fa-regular fa-trash-can text-red-500 cursor-pointer"
            onClick={() => {
              setIsModalOpen(true)
              setId(record.id)
            }}></i>
        </div>
      )
    }
  ]

  const fetchData = async (page = 1, limit) => {
    await getSuppliers({ page, limit })
    setPagination((prev) => ({
      ...prev,
      current: page
    }))
  }

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize)
  }, [pagination.current])

  const handleTableChange = (page) => {
    setPagination((prev) => ({
      ...prev,
      current: page
    }))
  }

  return (
    <div className="relative">
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <AddEditSupplier textButton="Thêm nhà cung cấp" classButton="btn btn-blue mb-5" />
          <Table
            rowClassName="editable-row"
            columns={supplierColumns}
            size="middle"
            bordered
            dataSource={suppliers}
            loading={loading}
            rowKey={(supplier) => supplier.id}
            pagination={false}
          />
          <CustomPagination
            current={pagination.current}
            total={totalItems}
            pageSize={pagination.pageSize}
            onChange={handleTableChange}
          />

          <Modal
            title="Xoá nhà cung cấp"
            okText="Đồng ý"
            cancelText="Hủy"
            centered
            open={isModalOpen}
            onOk={() => {
              deleteSupplier(id)
              setIsModalOpen(false)
            }}
            onCancel={() => setIsModalOpen(false)}>
            <p>Bạn có chắc muốn xoá nhà cung cấp này</p>
          </Modal>
        </>
      )}
    </div>
  )
}

export default ListSupplier
