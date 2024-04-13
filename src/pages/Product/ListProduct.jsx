import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { productActions } from "@/actions/productAction"
import SearchInput from "@/components/common/SearchInput"

import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Popconfirm, Table } from "antd"
import { Image, Layout, Space, Tooltip, Switch } from "antd"
import DefaultImages from "@/assets/icons/DefaultImage"
import { render } from "react-dom"
import { constants } from "@/constants"

const ListProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, page, productList, totalPage, totalProduct } = useSelector((state) => state.products)

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const formatNumber = (number) => {
    return new Intl.NumberFormat("vi-VN").format(number)
  }

  console.log(productList, "productList")

  const productsTable = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Hình ảnh",
      dataIndex: "productImage",
      key: "productImage",
      align: "center",
      render: (_, record) => {
        return (
          <>
            {record.productImage ? (
              <img src={record.productImage} width={50} height={50} className="object-cover rounded-md" />
            ) : (
              <DefaultImages width={50} height={50} />
            )}
          </>
        )
      },
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (name, product) => (
        <p className="text-[#0e2482] font-medium cursor-pointer">
          <Link to={`/products/edit/${product.id}`}>{name}</Link>
        </p>
      ),
    },
    {
      title: "Giá nhập",
      dataIndex: "importPrice",
      key: "importPrice",
      render: (importPrice) => formatPrice(importPrice),
    },
    {
      title: "Giá bán",
      dataIndex: "price",
      key: "price",
      render: (price) => formatPrice(price),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Đã bán",
      dataIndex: "sold",
      key: "sold",
    },
    {
      title: "Lượt xem",
      dataIndex: "view",
      key: "view",
    },
    {
      title: "Trạng thái",
      dataIndex: "hasDelete",
      key: "hasDelete",
      render: (hasDelete, record) => (
        <Switch
          value={!hasDelete}
          onChange={() => {
            dispatch(productActions.changeProductStatus(record.id, { status: !hasDelete }))
          }}></Switch>
      ),
    },
  ]

  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    dispatch(productActions.getProducts())
  }, [])

  const fetchDataTable = (value) => {
    dispatch(productActions.getProductByName(value))
  }

  return (
    <Layout.Content>
      <div className="flex justify-between my-6">
        <div className="flex items-center gap-4">
          <SearchInput
            loading={loading}
            placeholder="Tìm kiếm..."
            keyword={searchValue}
            onChange={setSearchValue}
            onSearch={fetchDataTable}
          />
          {!loading && <p className="text-[#CF5763] font-medium">{totalProduct} sản phẩm</p>}
        </div>
        <Link to="/products/create">
          <Button type="primary">Thêm sản phẩm</Button>
        </Link>
      </div>
      <Table
        rowClassName="editable-row"
        columns={productsTable}
        scroll={{ x: true }}
        size="middle"
        dataSource={totalProduct > 0 ? productList : []}
        loading={loading}
        rowKey={(product) => product.id}
      />
    </Layout.Content>
  )
}

export default ListProduct
