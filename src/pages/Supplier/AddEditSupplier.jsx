import { useEffect, useState } from 'react'

import useSupplierStore from '@/store/supplierStore'

import { Form, Input, Modal, Row } from 'antd'
import TextArea from 'antd/es/input/TextArea'

function AddEditSupplier({ supplier = {}, classButton = '', textButton = 'Sửa' }) {
  const { createSupplier, updateSupplier } = useSupplierStore()
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
    supplier?.id ? updateSupplier(supplier.id, values) : createSupplier(values)
    setIsModalOpen(false)
  }

  const handleOk = () => form.submit()

  useEffect(() => {
    form.setFieldsValue(supplier)
  }, [supplier])

  return (
    <>
      <button className={classButton} onClick={showModal}>
        {textButton}
      </button>
      <Modal
        title={supplier?.id ? 'Cập nhật nhà cung cấp' : 'Thêm nhà cung cấp'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Form form={form} onFinish={handleSubmit}>
          <Row>
            <Form.Item
              className="flex w-full"
              name="name"
              label="Tên cung cấp"
              rules={[{ required: true, message: ruleFormItem.required }]}>
              <Input placeholder="Nhập tên cung cấp" name="name" />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              className="flex w-full"
              label="Số điện thoại"
              name="phoneNumber"
              labelAlign="left"
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại!' },
                {
                  pattern: /^[0-9]{10}$/,
                  message: 'Số điện thoại không đúng định dạng'
                }
              ]}
              sx={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
              <Input style={{ height: 40 }} placeholder="Số điện thoại" type="text" />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              className="flex w-full"
              name="address"
              label="Mô tả"
              rules={[{ required: true, message: ruleFormItem.required }]}>
              <TextArea
                placeholder="Nhập địa chỉ"
                name="address"
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

export default AddEditSupplier
