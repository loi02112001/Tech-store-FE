import { useEffect } from 'react'

import useBrandStore from '@/store/brandStore'

import AddEditBrand from './AddEditBrand'
import { Skeleton, Table } from 'antd'

function ListBrand() {
  const { loading, brands, getBrands } = useBrandStore()

  const brandTables = [
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
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      align: 'center'
    },
    {
      title: 'Hành động',
      dataIndex: '',
      key: 'x',
      render: (_, record) => <AddEditBrand brand={record} classButton="link no-underline" />
    }
  ]

  useEffect(() => {
    getBrands()
  }, [])

  return loading ? (
    <Skeleton />
  ) : (
    <>
      <AddEditBrand textButton="Thêm thương hiệu" classButton="mb-4 button-primary" />
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
