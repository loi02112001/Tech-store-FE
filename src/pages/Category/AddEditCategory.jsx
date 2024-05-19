import { useEffect, useState } from 'react'

import useCategoryStore from '@/store/categoryStore'

import { Form, Input, Modal, Row } from 'antd'
import TextArea from 'antd/es/input/TextArea'

function AddEditCategory({ category = {}, classButton = '', textButton = 'Sửa' }) {
  const { createCategory, updateCategory } = useCategoryStore()
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const ruleFormItem = {
    required: 'Vui lòng nhập ${label}!'
  }

  const handleSubmit = (values) => {
    category?.id ? updateCategory(category.id, values) : createCategory(values)
    setIsModalOpen(false)
  }

  const handleOk = () => form.submit()

  useEffect(() => {
    form.setFieldsValue(category)
  }, [category])

  return (
    <>
      <button className={classButton} onClick={showModal}>
        {textButton}
      </button>
      <Modal
        title={category?.id ? 'Cập nhật danh mục' : 'Thêm danh mục'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Form form={form} onFinish={handleSubmit}>
          <Row>
            <Form.Item
              className="flex w-full"
              name="name"
              label="Tên danh mục"
              rules={[{ required: true, message: ruleFormItem.required }]}>
              <Input placeholder="Nhập tên danh mục" name="name" />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              className="flex w-full"
              name="description"
              label="Mô tả"
              rules={[{ required: true, message: ruleFormItem.required }]}>
              <TextArea
                placeholder="Nhập tên sản phẩm"
                name="description"
                autoSize={{
                  minRows: 2,
                  maxRows: 6
                }}
              />
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    </>
  )
}

export default AddEditCategory
