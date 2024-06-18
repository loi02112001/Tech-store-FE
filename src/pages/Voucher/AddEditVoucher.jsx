import { useEffect, useState } from 'react'

import useVoucherStore from '@/store/voucherStore'

import { Col, DatePicker, Form, Input, Modal, Row } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import dayjs from 'dayjs'
const { RangePicker } = DatePicker

function AddEditVoucher({ voucher = {}, classButton = '', textButton = 'Sửa' }) {
  const { createVoucher } = useVoucherStore()

  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [time, setTime] = useState([])

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
    createVoucher({
      ...values,
      startTime: dayjs(time[0]).format('YYYY-MM-DD'),
      endTime: dayjs(time[1]).format('YYYY-MM-DD')
    })

    setIsModalOpen(false)
  }

  const handleOk = () => form.submit()

  useEffect(() => {
    form.setFieldsValue(voucher)
  }, [voucher])

  return (
    <>
      <button className={classButton} onClick={showModal}>
        {textButton}
      </button>
      <Modal
        title="Tạo voucher"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Tạo voucher"
        cancelText="Hủy">
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            className="flex w-full"
            name="code"
            label="Mã voucher"
            rules={[{ required: true, message: ruleFormItem.required }]}>
            <Input placeholder="Mã voucher" name="code" />
          </Form.Item>
          <Row gutter={{ lg: 32 }}>
            <Col span={12}>
              <Form.Item
                className="flex w-full"
                name="totalQuantity"
                label="Số lượng"
                rules={[{ required: true, message: ruleFormItem.required }]}>
                <Input placeholder="Số lượng" name="totalQuantity" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                className="flex w-full"
                name="discountPrice"
                label="Giảm giá"
                rules={[{ required: true, message: ruleFormItem.required }]}>
                <Input placeholder="Giảm giá" name="discountPrice" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            className="flex w-full"
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: ruleFormItem.required }]}>
            <TextArea
              placeholder="Mô tả"
              name="description"
              autoSize={{
                minRows: 2,
                maxRows: 6
              }}
            />
          </Form.Item>
          <Form.Item className="flex w-full" label="Thời gian bắt đầu - kết thúc">
            <RangePicker
              className="w-full"
              name="time"
              format="YYYY-MM-DD"
              placeholder={['Bắt đầu', 'Kết thúc']}
              onChange={(value, dateString) => {
                setTime(dateString)
              }}
              defaultValue={time}
            />
          </Form.Item>
          <Form.Item
            className="flex w-full"
            name="condition"
            label="Điều kiện giảm giá"
            rules={[{ required: true, message: ruleFormItem.required }]}>
            <Input placeholder="Điều kiện" name="condition" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default AddEditVoucher
