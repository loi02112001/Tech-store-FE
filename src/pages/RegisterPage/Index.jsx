import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import useUserStore from '@/store/userStore'
import { getToken } from '@/utils'

import { Col, Form, Input, Radio, Row } from 'antd'

const RegisterForm = ({ onSubmit }) => {
  const [form] = Form.useForm()

  const handleSubmit = (values) => {
    onSubmit(values)
    form.resetFields()
  }

  return (
    <Form
      form={form}
      className="w-full"
      name="basic"
      labelCol={{
        span: 6
      }}
      wrapperCol={{
        span: 20
      }}
      onFinish={handleSubmit}
      autoComplete="off">
      <Form.Item
        label="Họ và tên"
        name="name"
        labelAlign="left"
        rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
        sx={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
        <Input style={{ height: 40 }} placeholder="Họ và tên" type="text" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        labelAlign="left"
        rules={[
          { required: true, message: 'Vui lòng nhập địa chỉ email!' },
          { type: 'email', message: 'Địa chỉ email không hợp lệ!' }
        ]}
        sx={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
        <Input style={{ height: 40 }} placeholder="Email" type="email" />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        labelAlign="left"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập mật khẩu!'
          },
          {
            min: 6,
            message: 'Mật khẩu phải có ít nhất 6 ký tự!'
          }
        ]}
        sx={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
        <Input.Password style={{ height: 40 }} placeholder="Mật khẩu" type="password" />
      </Form.Item>

      <Form.Item
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

      <Form.Item
        label="Địa chỉ"
        name="address"
        labelAlign="left"
        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
        sx={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
        <Input style={{ height: 40 }} placeholder="Địa chỉ" type="text" />
      </Form.Item>

      <Form.Item
        label="Ngày sinh"
        name="dob"
        labelAlign="left"
        rules={[{ required: true, message: 'Vui lòng nhập ngày sinh!' }]}
        sx={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
        <Input placeholder="Ngày sinh" type="date" />
      </Form.Item>

      <Form.Item
        label="Giới tính"
        name="gender"
        labelAlign="left"
        rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
        sx={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
        <Radio.Group className="flex gap-5">
          <Radio value="MALE">Nam</Radio>
          <Radio value="FEMALE">Nữ</Radio>
        </Radio.Group>
      </Form.Item>

      <button className="w-full btn btn-primary mb-5" type="primary">
        Đăng ký
      </button>
    </Form>
  )
}

const useRedirectIfLoggedIn = () => {
  const token = getToken()
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])
}

const Register = () => {
  const navigate = useNavigate()
  const [, setRegisterInfo] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    dob: 0,
    gender: ''
  })
  const { loading, register } = useUserStore()

  useRedirectIfLoggedIn()

  const handleRegister = (values) => {
    const registerData = { ...values }
    const onRegisterSuccess = () => {
      navigate('/login')
    }
    setRegisterInfo(registerData)
    register(registerData, onRegisterSuccess)
  }

  return (
    <div
      className="flex items-center justify-center w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://source.unsplash.com/random/1920x1080')" }}>
      <Row className="flex w-full max-w-5xl p-5 rounded-lg shadow-2xl bg-white bg-opacity-80">
        <Col span={10} className="flex justify-center items-center">
          <img src="https://hacom.vn/template/2024/images/bg-pop-login-phone.png" className="object-cover" alt="logo" />
        </Col>
        <Col span={14}>
          <div className="flex items-center justify-center mt-5">
            <h1 className="text-center h4">Đăng ký</h1>
          </div>
          <p className="font-medium text-center text-[15px] mb-8 mt-5">
            Xin chào, vui lòng nhập thông tin cá nhân của bạn
          </p>
          <RegisterForm onSubmit={handleRegister} loading={loading} />
          <div className="text-center">
            Bạn đã có tài khoản?{' '}
            <Link className="no-underline link" to="/login">
              Đăng nhập
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Register
