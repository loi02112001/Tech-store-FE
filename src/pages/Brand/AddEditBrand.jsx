import { brandAction } from "@/actions/brandAction"
import { Form, Input, Modal, Row } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useState } from "react"
import { useDispatch } from "react-redux"

function AddEditBrand({ brand = {}, classButton = "", textButton = "Sửa" }) {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [brandInfo, setBrandInfo] = useState(brand)
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
    setBrandInfo((preBrand) => ({ ...preBrand, [fieldName]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    brand?.id ? dispatch(brandAction.updateBrand(brand.id, brandInfo)) : dispatch(brandAction.createBrand(brandInfo))
    setIsModalOpen(false)
  }

  return (
    <>
      <button className={classButton} onClick={showModal}>
        {textButton}
      </button>
      <Modal
        title={brand?.id ? "Cập nhật thương hiệu" : "Thêm thương hiệu"}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}>
        <Form form={form} initialValues={brand}>
          <Row>
            <Form.Item
              className="flex w-full"
              name="name"
              label="Tên thương hiệu"
              rules={[{ required: true, message: ruleFormItem.required }]}>
              <Input placeholder="Nhập tên thương hiệu" name="name" onChange={handleInputChange} />
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

export default AddEditBrand
