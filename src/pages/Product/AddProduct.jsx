import { brandAction } from "@/actions/brandAction"
import { categoryAction } from "@/actions/categoryAction"
import { productActions } from "@/actions/productAction"
import DefaultImage from "@/assets/icons/DefaultImage"
import { Col, Form, Input, Row, Select } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

const AddProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.categories.data)
  const productInfo = useSelector((state) => state.products.productInfo)
  const brands = useSelector((state) => state.brands.data)
  const [form] = Form.useForm()
  const [previewImg, setPreviewImg] = useState()
  const [img, setImg] = useState(null)

  useEffect(() => {
    dispatch(categoryAction.getCategories())
    dispatch(brandAction.getBrands())
    if (id) {
      dispatch(productActions.getProductById(id))
    }
  }, [])

  useEffect(() => {
    if (id) {
      const categoryIds = productInfo?.listCategory?.map((item) => item.id)
      form.setFieldsValue({
        ...productInfo,
        brandId: productInfo?.brand?.id,
        category: categoryIds,
      })
    }
  }, [productInfo])

  const categoryOptions = categories?.map((category) => ({
    value: category.id,
    label: category.name,
  }))

  const brandOptions = brands?.map((brand) => ({
    value: brand.id,
    label: brand.name,
  }))

  const handleAddProduct = (values) => {
    console.log(values)
    if (values.name.trim() == "" || values.price == "" || values.importPrice == "" || values.description.trim() == "") {
      return
    }
    const formData = new FormData()
    formData.append("productImage", img[0])
    formData.append("name", values.name)
    formData.append("brandId", values.brandId)
    formData.append("categoryIds", JSON.stringify(values.category))
    formData.append("description", values.description)
    formData.append("importPrice", values.importPrice)
    formData.append("price", values.price)
    if (id) {
      dispatch(
        productActions.updateProduct(id, formData, () => {
          navigate("/product")
        }),
      )
    } else {
      dispatch(
        productActions.addProduct(formData, () => {
          navigate("/product")
        }),
      )
    }
  }

  const ruleFormItem = {
    required: "Vui lòng nhập ${label}!",
    types: {
      email: "Không đúng định dạng Email!",
      number: "Vui lòng nhập số!",
    },
    number: {
      range: "Vui lòng nhập số trong khoảng ${min} đến ${max}!",
    },
  }

  const handlePreview = (img) => {
    if (!img?.[0]?.type?.includes("image")) {
      notification.error({
        title: "Lỗi",
        message: "File không đúng định dạng",
      })
      return
    }
    const imgSize = img[0].size
    if (imgSize > 10e6) {
      notification.error({
        title: "Lỗi",
        message: "Dung lượng của ảnh phải nhỏ hơn 10MB",
      })
    } else {
      setImg(img)
      const url = URL.createObjectURL(img[0])
      setPreviewImg(url)
    }
  }

  return (
    <div className="h-full bg-[#f4f4f4]">
      <Form className="flex flex-col gap-5 pb-5" onFinish={handleAddProduct} form={form}>
        <span className="text-xl font-semibold flex gap-3 items-center bg-[#f5f5f5]">
          {id ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
        </span>

        <div className="bg-white rounded-sm p-6">
          <p className="mb-3 text-xl font-bold">Thông tin cơ bản</p>
          <Col span={12} className="relative w-1/4 h-full mb-6">
            <Form.Item className="flex items-center w-full" label="Hình ảnh sản phẩm">
              <input
                className="absolute opacity-0 w-full h-full"
                type="file"
                onChange={(e) => handlePreview(e.target.files)}
                accept="image/*"
              />
              {previewImg ? (
                <img src={previewImg} alt="User avatar" className="w-full h-full object-cover" loading="lazy" />
              ) : (
                <DefaultImage />
              )}
            </Form.Item>
          </Col>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              <Form.Item
                className="flex items-center w-full"
                name="name"
                label="Tên sản phẩm"
                rules={[
                  { required: true, message: ruleFormItem.required },
                  {
                    pattern: /^(?=.*S).+$/,
                    message: "Tên sản phẩm không bao gồm khoảng trống",
                  },
                ]}>
                <Input placeholder="Nhập tên sản phẩm" name="name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                className="flex items-center w-full"
                name="category"
                label="Danh mục sản phẩm"
                rules={[{ required: true, message: ruleFormItem.required }]}>
                <Select
                  className="w-full"
                  mode="multiple"
                  allowClear
                  placeholder="Chọn danh mục sản phẩm"
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
                rules={[{ required: true, message: ruleFormItem.required }]}>
                <Input type="number" className="py-1 outline-0" placeholder="Nhập giá nhập hàng" name="importPrice" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                className="flex items-center w-full"
                name="price"
                label="Giá bán"
                rules={[{ required: true, message: ruleFormItem.required }]}>
                <Input className="py-1 outline-0" type="number" placeholder="Nhập giá bán" name="price" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <Form.Item
                className="flex items-center w-full"
                name="description"
                label={"Mô tả sản phẩm"}
                rules={[{ required: true, message: ruleFormItem.required }]}>
                <TextArea className="py-1 outline-0" placeholder="Nhập mô tả sản phẩm" name="description" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              <Form.Item
                className="flex items-center w-full"
                name="brandId"
                label="Thương hiệu"
                rules={[{ required: true, message: ruleFormItem.required }]}>
                <Select className="w-full" allowClear placeholder="Chọn thương hiệu" options={brandOptions} />
              </Form.Item>
            </Col>
          </Row>
          <button type="submit" className="w-fit py-1 px-4 rounded bg-[#1677ff] text-white">
            {id ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
          </button>
        </div>
      </Form>
    </div>
  )
}
export default AddProduct
