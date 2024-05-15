import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'

import { authAction } from '@/actions/authAction'
import { getToken } from '@/utils'

import LOGO from '../../assets/images/logo.jpg'
import { Button, Col, Form, Input, Row } from 'antd'

const LoginPage = () => {
  const token = getToken()
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const { loading } = useSelector((state) => state.auth)

  const handleLogin = (data) => {
    dispatch(authAction.login(data))
  }

  if (token) {
    return <Navigate to="/" />
  }

  return (
    <Row className="w-full max-w-[70%] mx-auto  p-5 rounded-[6px] mt-[20vh] flex shadow-2xl">
      <Col span={9} className="max-w-[30%] h-auto mx-auto flex justify-center items-center">
        <img src={LOGO} className="w-full h-[200px] object-cover" alt="logo" />
      </Col>
      <Col span={12} className="mr-[30px]">
        <Form
          form={form}
          className="w-full"
          labelCol={{
            span: 6
          }}
          wrapperCol={{
            span: 20
          }}
          onFinish={handleLogin}
          autoComplete="off"
        >
          <div className="flex items-center justify-center mt-5">
            <h1 className="h4 text-center">Đăng nhập</h1>
          </div>
          <p className="font-medium text-center text-[15px] mb-8 mt-5">Xin chào, vui lòng nhập email và mật khẩu</p>
          <Form.Item
            label="Email"
            labelAlign="left"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập địa chỉ email!' },
              { type: 'email', message: 'Địa chỉ email không hợp lệ!' }
            ]}
            sx={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}
          >
            <Input style={{ height: 40 }} placeholder="Email" type="email" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            labelAlign="left"
            name="password"
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
            sx={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}
          >
            <Input.Password style={{ height: 40 }} placeholder="Mật khẩu" type="password" />
          </Form.Item>

          <div className="text-end mt-[20px] mb-[15px]">
            <Link className="link no-underline" to="/forgot_password">
              Quên mật khẩu
            </Link>
          </div>

          <Button className="mb-5 h-[40px] button-primary" block type="primary" htmlType="submit" loading={loading}>
            Đăng nhập
          </Button>
        </Form>

        <div className="text-center">
          Bạn chưa có tài khoản?{' '}
          <Link className="link no-underline" to="/register">
            Đăng ký
          </Link>
        </div>
      </Col>
    </Row>
  )
}

export default LoginPage
