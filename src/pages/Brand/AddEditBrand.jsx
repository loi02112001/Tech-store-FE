import { brandAction } from "@/actions/brandAction"
import { Form, Input, Modal, Row } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

function AddEditBrand({ brand = {}, classButton = "", textButton = "Sửa" }) {
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
    brand?.id ? dispatch(brandAction.updateBrand(brand.id, values)) : dispatch(brandAction.createBrand(values))
    setIsModalOpen(false)
  }

  const handleOk = () => form.submit()

  useEffect(() => {
    form.setFieldsValue(brand)
  }, [brand])

  return (
    <>
      <button className={classButton} onClick={showModal}>
        {textButton}
      </button>
      <Modal
        title={brand?.id ? "Cập nhật thương hiệu" : "Thêm thương hiệu"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Form form={form} onFinish={handleSubmit}>
          <Row>
            <Form.Item
              className="flex w-full"
              name="name"
              label="Tên thương hiệu"
              rules={[{ required: true, message: ruleFormItem.required }]}>
              <Input placeholder="Nhập tên thương hiệu" name="name" />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              className="flex w-full"
              name="description"
              label="Mô tả"
              rules={[{ required: true, message: ruleFormItem.required }]}>
              <TextArea
                placeholder="Nhập mô tả thương hiệu"
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

export default AddEditBrand
