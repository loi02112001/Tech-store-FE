import { useEffect } from 'react'

import useBrandStore from '@/store/brandStore'

import AddEditBrand from './AddEditBrand'
import { Skeleton, Table } from 'antd'

function ListBrand() {
  const { loading, brands, getBrands } = useBrandStore()

  const brandTables = [
    {
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: () => ''
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Hành động',
      dataIndex: '',
      key: 'x',
      align: 'center',
      render: (_, record) => (
        <AddEditBrand
          brand={record}
          classButton="text-gray-500 link no-underline"
          textButton={<i className="cursor-pointer fa-regular fa-pen-to-square text-blue"></i>}
        />
      )
    }
  ]

  useEffect(() => {
    getBrands()
  }, [])

  return loading ? (
    <Skeleton />
  ) : (
    <>
      <AddEditBrand textButton="Thêm thương hiệu" classButton="mb-4 btn btn-blue" />
      <Table
        rowClassName="editable-row"
        columns={brandTables}
        size="middle"
        dataSource={brands?.length > 0 ? brands : []}
        loading={loading}
        rowKey={(brand) => brand.id}
      />
    </>
  )
}

export default ListBrand
