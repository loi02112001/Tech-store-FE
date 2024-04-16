import { categoryAction } from "@/actions/categoryAction"
import { Skeleton, Table } from "antd"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import AddEditCategory from "./AddEditCategory"

function ListCategory() {
  const dispatch = useDispatch()
  const { loading, data: categories } = useSelector((state) => state.categories)
  const categoryTables = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "Hành động",
      dataIndex: "",
      key: "x",
      render: (_, record) => <AddEditCategory category={record} classButton="link no-underline"/>,
    },
  ]

  useEffect(() => {
    dispatch(categoryAction.getCategories())
  }, [])

  return loading ? (
    <Skeleton />
  ) : (
    <>
      <AddEditCategory textButton="Thêm danh mục" classButton="mb-4 button-primary" />
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
