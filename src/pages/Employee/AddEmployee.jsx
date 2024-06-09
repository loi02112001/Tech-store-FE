import useEmployeeStore from '@/store/employeeStore'

import { Col, Form, Input, Radio, Row } from 'antd'

function AddEmployee() {
  const { createEmployee } = useEmployeeStore()
  const [form] = Form.useForm()
  const ruleFormItem = {
    required: 'Vui lòng nhập ${label}!'
  }

  const handleSubmit = (values) => {
    createEmployee(values)
  }

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Row gutter={{ md: 24, lg: 32 }}>
        <Col span={12}>
          <Form.Item
            label="Email"
            name="email"
            labelAlign="left"
            rules={[{ required: true, message: ruleFormItem.required }]}
            sx={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
            <Input style={{ height: 40 }} placeholder="Email" type="text" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Họ và tên"
            name="name"
            labelAlign="left"
            rules={[{ required: true, message: ruleFormItem.required }]}
            sx={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
            <Input style={{ height: 40 }} placeholder="Họ và tên" type="text" />
          </Form.Item>
        </Col>
      </Row>{' '}
      <Row gutter={{ md: 24, lg: 32 }}>
        <Col span={12}>
          <Form.Item
            label="Mật khẩu"
            name="password"
            labelAlign="left"
            rules={[{ required: true, message: ruleFormItem.required }]}
            sx={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
            <Input.Password style={{ height: 40 }} placeholder="Mật khẩu" type="password" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            labelAlign="left"
            rules={[{ required: true, message: ruleFormItem.required }]}
            sx={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
            <Input style={{ height: 40 }} placeholder="Số điện thoại" type="text" />
          </Form.Item>
        </Col>{' '}
      </Row>
      <Form.Item
        label="Địa chỉ"
        name="address"
        labelAlign="left"
        rules={[{ required: true, message: ruleFormItem.required }]}
        sx={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
        <Input style={{ height: 40 }} placeholder="Địa chỉ" type="text" />
      </Form.Item>
      <Row gutter={{ md: 24, lg: 32 }}>
        <Col span={12}>
          <Form.Item
            label="Ngày sinh"
            name="dob"
            labelAlign="left"
            rules={[{ required: true, message: ruleFormItem.required }]}
            sx={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
            <Input style={{ height: 40 }} placeholder="Ngày sinh" type="date" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Giới tính"
            name="gender"
            labelAlign="left"
            rules={[{ required: true, message: ruleFormItem.required }]}
            sx={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
            <Radio.Group className="flex gap-10">
              <Radio value={1}>Nam</Radio>
              <Radio value={0}>Nữ</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <button type="submit" className="mt-4 btn btn-primary">
        Thêm nhân viên
      </button>
    </Form>
  )
}

export default AddEmployee
