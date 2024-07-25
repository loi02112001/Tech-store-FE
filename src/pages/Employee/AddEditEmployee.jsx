import { useNavigate } from 'react-router-dom'

import useEmployeeStore from '@/store/employeeStore'

import { Card, Col, Form, Input, Row, Select } from 'antd'

const { Item } = Form

const FORM_LAYOUT = { labelCol: { span: 24 }, wrapperCol: { span: 24 } }
const FORM_RULES = { required: { required: true, message: 'Vui lòng nhập ${label}!' } }
const INPUT_STYLE = { height: 40 }

const FORM_ITEMS = [
  { name: 'name', label: 'Họ và tên', placeholder: 'Họ và tên' },
  { name: 'email', label: 'Email', placeholder: 'Email' },
  { name: 'address', label: 'Địa chỉ', placeholder: 'Địa chỉ', colSpan: 24 },
  { name: 'password', label: 'Mật khẩu', placeholder: 'Mật khẩu', isPassword: true },
  { name: 'phoneNumber', label: 'Số điện thoại', placeholder: 'Số điện thoại' },
  { name: 'dob', label: 'Ngày sinh', placeholder: 'Ngày sinh', type: 'date' },
  {
    name: 'gender',
    label: 'Giới tính',
    type: 'select',
    options: [
      { value: 1, label: 'Nam' },
      { value: 0, label: 'Nữ' }
    ],
    colSpan: 12
  }
]

const AddEditEmployee = () => {
  const { createEmployee } = useEmployeeStore()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const handleSubmit = (values) => {
    createEmployee({ ...values, gender: values.gender === 1 ? 'MALE' : 'FEMALE' }, () => navigate('/admin/employee'))
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <Form form={form} onFinish={handleSubmit} layout="vertical" {...FORM_LAYOUT}>
        <Row gutter={[32, 16]}>
          {FORM_ITEMS.map(({ name, label, placeholder, isPassword, type, options, colSpan = 12 }) => (
            <Col span={colSpan} key={name}>
              <Item name={name} label={label} rules={[FORM_RULES.required]}>
                {type === 'select' ? (
                  <Select options={options} className="w-full" placeholder="Giới tính" />
                ) : isPassword ? (
                  <Input.Password style={INPUT_STYLE} placeholder={placeholder} />
                ) : (
                  <Input style={INPUT_STYLE} placeholder={placeholder} type={type || 'text'} />
                )}
              </Item>
            </Col>
          ))}
        </Row>
        <button type="submit" className="mt-4 btn btn-blue">
          Thêm nhân viên
        </button>
      </Form>
    </Card>
  )
}

export default AddEditEmployee
