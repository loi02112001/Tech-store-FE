import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import DefaultImage from '@/assets/icons/DefaultImage'
import { constants } from '@/constants'
import useBrandStore from '@/store/brandStore'
import useCategoryStore from '@/store/categoryStore'
import useProductStore from '@/store/productStore'
import { handleNotification } from '@/utils'

import ProductAttributeForm from './ProductAttributeForm'
import { Button, Card, Col, Form, Input, Row, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'

const AddProduct = () => {
  const { product: productInfo, addProduct, getProductById, updateProduct } = useProductStore()
  const { categories, getCategories } = useCategoryStore()
  const { brands, getBrands } = useBrandStore()

  const { id } = useParams()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [previewImg, setPreviewImg] = useState()
  const [img, setImg] = useState(null)
  const [attributes, setAttributes] = useState([])

  useEffect(() => {
    getCategories()
    getBrands()
    if (id) {
      getProductById(id)
    }
  }, [])

  useEffect(() => {
    if (id) {
      const categoryIds = productInfo?.listCategory?.map((item) => item.id)
      form.setFieldsValue({
        ...productInfo,
        brandId: productInfo?.brand?.id,
        category: categoryIds
      })
      setPreviewImg(productInfo?.productImage)
    }
  }, [productInfo])

  const categoryOptions = categories?.map((category) => ({
    value: category.id,
    label: category.name
  }))

  const brandOptions = brands?.map((brand) => ({
    value: brand.id,
    label: brand.name
  }))

  const handleAddProduct = (values) => {
    if (values.name.trim() === '' || values.price === '' || values.description.trim() === '') {
      return
    }
    const formData = new FormData()
    if (img?.length > 0) {
      formData.append('image', img[0])
    }
    formData.append('name', values.name)
    formData.append('brandId', values.brandId)
    formData.append('categoryIds', values.category.join(','))
    formData.append('description', values.description)
    formData.append('price', values.price)
    if (id) {
      updateProduct(id, formData, () => {
        navigate('/product')
      })
    } else {
      addProduct(formData, () => {
        navigate('/product')
      })
    }
  }

  const ruleFormItem = {
    required: 'Vui lòng nhập ${label}!',
    types: {
      email: 'Không đúng định dạng Email!',
      number: 'Vui lòng nhập số!'
    },
    number: {
      range: 'Vui lòng nhập số trong khoảng ${min} đến ${max}!'
    }
  }

  const handlePreview = (img) => {
    if (!img?.[0]?.type?.includes('image')) {
      handleNotification(constants.NOTIFICATION_ERROR, { message: 'File không đúng định dạng' })
      return
    }

    setImg(img)
    const url = URL.createObjectURL(img[0])
    setPreviewImg(url)
  }

  return (
    <div className="min-h-screen">
      <Card title={id ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'} className="max-w-4xl mx-auto">
        <Form className="flex flex-col" onFinish={handleAddProduct} form={form} layout="vertical">
          <Form.Item className="flex items-center" label="Hình ảnh sản phẩm">
            <input
              className="absolute opacity-0 w-full h-full"
              type="file"
              onChange={(e) => handlePreview(e.target.files)}
              accept="image/*"
            />
            {previewImg ? (
              <img src={previewImg} alt="img preview" className="w-full h-full object-cover border rounded" />
            ) : (
              <DefaultImage width={200} height={140} />
            )}
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Tên sản phẩm"
                rules={[
                  { required: true, message: ruleFormItem.required },
                  () => ({
                    validator(_, value) {
                      if (!value?.includes('  ')) return Promise.resolve()
                      return Promise.reject(new Error('Tên sản phẩm không được chứa quá nhiều khoảng trắng liên tiếp!'))
                    }
                  })
                ]}>
                <Input placeholder="Nhập tên sản phẩm" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Danh mục sản phẩm"
                rules={[{ required: true, message: ruleFormItem.required }]}>
                <Select mode="multiple" allowClear placeholder="Chọn danh mục sản phẩm" options={categoryOptions} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="price" label="Giá bán" rules={[{ required: true, message: ruleFormItem.required }]}>
                <Input type="number" placeholder="Nhập giá bán" min={0} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="brandId"
                label="Thương hiệu"
                rules={[{ required: true, message: ruleFormItem.required }]}>
                <Select allowClear placeholder="Chọn thương hiệu" options={brandOptions} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Mô tả sản phẩm"
                rules={[{ required: true, message: ruleFormItem.required }]}>
                <TextArea rows={4} placeholder="Nhập mô tả sản phẩm" />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Form.Item label="Thông số sản phẩm" className="w-full">
              <ProductAttributeForm attributes={attributes} setAttributes={setAttributes} />
            </Form.Item>
          </Row>

          <Button type="primary" htmlType="submit">
            {id ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
          </Button>
        </Form>
      </Card>
    </div>
  )
}

export default AddProduct
