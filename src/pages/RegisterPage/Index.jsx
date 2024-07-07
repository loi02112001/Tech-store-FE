import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import useAuthStore from '@/store/authStore'
import { getToken } from '@/utils'

import LOGO from '../../assets/images/logo.jpg'
import { Button, Col, Form, Input, Radio, Row } from 'antd'

const VerifyForm = ({ onSubmit, loading }) => {
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
        label="Mã xác thực"
        name="otp"
        labelAlign="left"
        rules={[{ required: true, message: 'Vui lòng nhập mã otp!' }]}
        sx={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
        <Input style={{ height: 40 }} placeholder="Nhập mã otp" type="text" />
      </Form.Item>

      <Button className="mt-4 mb-5 h-[40px]" block type="primary" htmlType="submit" loading={loading}>
        Xác thực
      </Button>
    </Form>
  )
}

const RegisterForm = ({ onSubmit, loading }) => {
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
      {/* Các trường thông tin mới */}
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

      <Row gutter={32}>
        <Col span={12}>
          <Form.Item
            label="Ngày sinh"
            name="dob"
            labelAlign="left"
            rules={[{ required: true, message: 'Vui lòng nhập ngày sinh!' }]}
            sx={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
            <Input style={{ height: 40 }} placeholder="Ngày sinh" type="date" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Giới tính"
            name="gender"
            labelAlign="left"
            rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
            sx={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
            <Radio.Group className="flex gap-10">
              <Radio value={1}>Nam</Radio>
              <Radio value={0}>Nữ</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      <Button className="btn btn-primary mt-4 mb-5 h-[40px]" block type="primary" htmlType="submit" loading={loading}>
        Đăng ký
      </Button>
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
  const [step, setStep] = useState(1)
  const [registerInfo, setRegisterInfo] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    dob: 0,
    gender: ''
  })
  const { loading, register, verify } = useAuthStore()

  useRedirectIfLoggedIn()

  const handleRegister = (values) => {
    const registerData = { ...values }
    const onRegisterSuccess = () => {
      setStep(2)
    }
    setRegisterInfo(registerData)
    register(registerData, onRegisterSuccess)
  }

  const handleVerify = (values) => {
    const onVerifySuccess = () => {
      navigate('/login')
    }
    verify({ ...registerInfo, ...values }, onVerifySuccess)
  }

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Row className="w-full max-w-[70%] p-5 rounded-lg flex shadow-2xl">
        <Col span={9} className="max-w-[30%] h-auto mx-auto flex justify-center items-center">
          <img src={LOGO} className="w-full h-[200px] object-cover" alt="logo" />
        </Col>
        {step === 2 && (
          <Col span={12} className="mr-[30px]">
            <div className="flex items-center justify-center mt-5">
              <h1 className="text-center h4">Xác thực tài khoản</h1>
            </div>
            <p className="font-medium text-center text-[15px] mb-8 mt-5">
              Vui lòng nhập mã otp đã gửi vào email của bạn
            </p>
            <VerifyForm onSubmit={handleVerify} loading={loading} />
          </Col>
        )}
        {step === 1 && (
          <Col span={12} className="mr-[30px]">
            <div className="flex items-center justify-center mt-5">
              <h1 className="text-center h4">Đăng ký</h1>
            </div>
            <p className="font-medium text-center text-[15px] mb-8 mt-5">
              Xin chào, vui lòng nhập thông tin cá nhân của bạn
            </p>
            <RegisterForm onSubmit={handleRegister} loading={loading} />
            <div className="text-center">
              Bạn đã có tài khoản?
              <Link className="no-underline link" to="/login">
                Đăng nhập
              </Link>
            </div>
          </Col>
        )}
      </Row>
    </div>
  )
}

export default Register
