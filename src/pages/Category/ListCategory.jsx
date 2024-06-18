import { useEffect } from 'react'

import useCategoryStore from '@/store/categoryStore'

import AddEditCategory from './AddEditCategory'
import { Skeleton, Table } from 'antd'

function ListCategory() {
  const { loading, categories, getCategories } = useCategoryStore()
  const categoryTables = [
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
      align: 'center',
      render: (_, record) => (
        <AddEditCategory
          category={record}
          classButton="link no-underline"
          textButton={<i className="fa-regular fa-pen-to-square text-blue cursor-pointer"></i>}
        />
      )
    }
  ]

  useEffect(() => {
    getCategories()
  }, [])

  return loading ? (
    <Skeleton />
  ) : (
    <>
      <AddEditCategory textButton="Thêm danh mục" classButton="mb-4 btn btn-primary" />
      <Table
        rowClassName="editable-row"
        columns={categoryTables}
        size="middle"
        dataSource={categories?.length > 0 ? categories : []}
        loading={loading}
        rowKey={(category) => category.id}
      />
    </>
  )
}

export default ListCategory
