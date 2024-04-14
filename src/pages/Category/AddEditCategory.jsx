import { categoryAction } from "@/actions/categoryAction"
import { Form, Input, Modal, Row } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useState } from "react"
import { useDispatch } from "react-redux"

function AddEditCategory({ category = {}, classButton = "", textButton = "Sửa" }) {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [categoryInfo, setCategoryInfo] = useState(category)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const ruleFormItem = {
    required: "Vui lòng nhập ${label}!",
  }

  const handleInputChange = (e) => {
    const fieldName = e.target.name
    const value = e.target.value
    setCategoryInfo((preCategory) => ({ ...preCategory, [fieldName]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    category?.id
      ? dispatch(categoryAction.updateCategory(category.id, categoryInfo))
      : dispatch(categoryAction.createCategory(categoryInfo))
    setIsModalOpen(false)
  }

  return (
    <>
      <button className={classButton} onClick={showModal}>
        {textButton}
      </button>
      <Modal
        title={category?.id ? "Cập nhật danh mục" : "Thêm danh mục"}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}>
        <Form form={form} initialValues={category}>
          <Row>
            <Form.Item
              className="flex w-full"
              name="name"
              label="Tên danh mục"
              rules={[{ required: true, message: ruleFormItem.required }]}>
              <Input placeholder="Nhập tên danh mục" name="name" onChange={handleInputChange} />
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
                onChange={handleInputChange}
                autoSize={{
                  minRows: 2,
                  maxRows: 6,
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
