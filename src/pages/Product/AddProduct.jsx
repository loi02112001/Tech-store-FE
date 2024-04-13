import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

import { categoryAction } from "@/actions/categoryAction"
import { productActions } from "@/actions/productAction"
import Upload from "@/components/Upload"

import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { PlusOutlined } from "@ant-design/icons"
import { Button, Popconfirm, Space, Table, Tooltip } from "antd"
import { Col, Form, Input, Row, Select } from "antd"
import TextArea from "antd/es/input/TextArea"
import { brandAction } from "@/actions/brandAction"

const AddProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.categories.data)
  const products = useSelector((state) => state.products.productInfo)
  const brands = useSelector((state) => state.brands.data)
  const [form] = Form.useForm()
  const [infoProduct, setInfoProduct] = useState({
    name: "",
    description: "",
    discountPercent: 0,
    importPrice: 0,
    price: 0,
    quantity: 0,
    brandId: 0,
    categoryIds:[]
  })

  useEffect(() => {
    dispatch(categoryAction.getCategories())
    dispatch(brandAction.getBrands())
    if (id) {
      dispatch(productActions.getProductById(id))
    }
  }, [])

  useEffect(() => {
    form.resetFields()
    if (products.id) {
      setInfoProduct(products)
    }
  }, [products])

  const handleInputChange = (e) => {
    const fieldName = e.target.name
    const numberFields = ["importPrice", "price"]
    let value = e.target.type === "number" ? e.target.value.replace(/[^0-9]/g, "") : e.target.value

    if (numberFields.includes(fieldName)) {
      value = parseInt(value)
    }

    setInfoProduct((infoProduct) => ({ ...infoProduct, [fieldName]: value }))
  }

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }))

  const brandOptions = brands.map((brand) => ({
    value: brand.id,
    label: brand.name,
  }))

  const handleAddProduct = () => {
    if (
      infoProduct.name.trim() == "" ||
      infoProduct.price == "" ||
      infoProduct.importPrice == "" ||
      infoProduct.description.trim() == ""
    ) {
      return
    }
    const formData = new FormData();
    formData.append("name", infoProduct.name)
    formData.append("brandId",infoProduct.brandId)
    formData.append("categoryIds", JSON.stringify(infoProduct.categoryIds))
    formData.append("description", infoProduct.description)
    formData.append("discountPercent", infoProduct.discountPercent)
    formData.append("importPrice",infoProduct.importPrice)
    formData.append("price", infoProduct.price)
    formData.append("quantity", infoProduct.quantity)
    if (id) {
      dispatch(
        productActions.updateProduct(id, infoProduct, () => {
          navigate("/products")
        }),
      )
    } else {
      dispatch(
        productActions.addProduct(formData, () => {
          navigate("/products")
        }),
      )
    }
  }

  const rulesVietnamese = {
    required: "Vui lòng nhập ${label}!",
    types: {
      email: "Không đúng định dạng Email!",
      number: "Vui lòng nhập số!",
    },
    number: {
      range: "Vui lòng nhập số trong khoảng ${min} đến ${max}!",
    },
  }

  return (
    <>
      <div className="h-full bg-[#f4f4f4]">
        <Form className="flex flex-col gap-5 pb-5" onSubmit={handleAddProduct} form={form} initialValues={products}>
          <span className="text-xl font-semibold flex gap-3 items-center bg-[#f5f5f5]">
            {id ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
          </span>

          <div className="bg-white rounded-sm p-6">
            <p className="mb-3 text-xl font-bold">Thông tin cơ bản</p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col span={12}>
                <Form.Item
                  className="flex items-center w-full"
                  name="name"
                  label="Tên sản phẩm"
                  rules={[{ required: true, message: rulesVietnamese.required }]}>
                  <Input placeholder="Nhập tên sản phẩm" name="name" onChange={handleInputChange} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  className="flex items-center w-full"
                  name="category"
                  label="Danh mục sản phẩm"
                  rules={[{ required: true, message: rulesVietnamese.required }]}>
                  <Select
                    className="w-full"
                    mode="multiple"
                    allowClear
                    placeholder="Chọn danh mục sản phẩm"
                    onChange={(e) =>
                      setInfoProduct((infoProduct) => ({
                        ...infoProduct,
                        categoryIds: e,
                      }))
                    }
                    options={categoryOptions}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col span={12}>
                <Form.Item
                  className="flex items-center w-full"
                  name="importPrice"
                  label="Giá nhập hàng"
                  rules={[{ required: true, message: rulesVietnamese.required }]}>
                  <Input
                    type="number"
                    className="py-1 outline-0"
                    placeholder="Nhập giá nhập hàng"
                    name="importPrice"
                    onChange={handleInputChange}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  className="flex items-center w-full"
                  name="price"
                  label="Giá bán"
                  rules={[{ required: true, message: rulesVietnamese.required }]}>
                  <Input
                    className="py-1 outline-0"
                    type="number"
                    placeholder="Nhập giá bán"
                    name="price"
                    onChange={handleInputChange}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
                <Form.Item
                  className="flex items-center w-full"
                  name="description"
                  label={"Mô tả sản phẩm"}
                  rules={[{ required: true, message: rulesVietnamese.required }]}>
                  <TextArea
                    className="py-1 outline-0"
                    placeholder="Nhập mô tả sản phẩm"
                    onChange={handleInputChange}
                    name="description"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col span={12}>
                <Form.Item
                  className="flex items-center w-full"
                  name="brandId"
                  label="Thương hiệu"
                  rules={[{ required: true, message: rulesVietnamese.required }]}>
                  <Select
                    className="w-full"
                    allowClear
                    placeholder="Chọn thương hiệu"
                    onChange={(e) =>
                      setInfoProduct((infoProduct) => ({
                        ...infoProduct,
                        brandId: e,
                      }))
                    }
                    options={brandOptions}
                  />
                </Form.Item>
                {console.log(infoProduct.brandId)}
              </Col>
            </Row>
            <button
              type="submit"
              className="w-fit py-1 px-4 rounded bg-[#1677ff] text-white"
              onClick={handleAddProduct}>
              {id ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
            </button>
          </div>
        </Form>
      </div>
    </>
  )
}
export default AddProduct
