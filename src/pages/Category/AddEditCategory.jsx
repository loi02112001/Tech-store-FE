import { categoryAction } from "@/actions/categoryAction"
import { Form, Input, Modal, Row } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

function AddEditCategory({ category = {}, classButton = "", textButton = "Sửa" }) {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
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

  const handleSubmit = (values) => {
    category?.id
      ? dispatch(categoryAction.updateCategory(category.id, values))
      : dispatch(categoryAction.createCategory(values))
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
        title={category?.id ? "Cập nhật danh mục" : "Thêm danh mục"}
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
