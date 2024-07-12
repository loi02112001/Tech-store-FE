import { useEffect, useState } from 'react'

import DefaultImage from '@/assets/icons/DefaultImage'
import useUserStore from '@/store/userStore'

import { EditOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row, Select } from 'antd'

const UserProfileForm = () => {
  const [form] = Form.useForm()
  const [editMode, setEditMode] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [image, setImage] = useState(null)

  const { user, getProfile, updateProfile } = useUserStore()

  const handleEdit = () => setEditMode(true)

  const handleSubmit = (values) => {
    const formData = new FormData()
    if (image?.length > 0) {
      formData.append('avatar', image[0])
    }
    Object.entries(values).forEach(([key, value]) => formData.append(key, value))

    updateProfile(formData)
    setEditMode(false)
  }

  const handleAvatarChange = (e) => {
    const files = e.target.files
    setImage(files)
    setAvatarUrl(URL.createObjectURL(files[0]))
  }

  useEffect(() => {
    getProfile()
  }, [])

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        ...user,
        gender: user.gender === 'MALE' ? 'Nam' : 'Nữ'
      })
    }
  }, [user, form])

  const renderAvatar = () => (
    <div className="avatar-upload w-[200px] aspect-[200/133] border border-gray-300 rounded overflow-hidden">
      {avatarUrl ? (
        <img src={avatarUrl} alt="Avatar" className="w-full h-full object-fill" />
      ) : (
        <DefaultImage width={200} height={133} />
      )}
      {editMode && (
        <input
          className="absolute top-0 opacity-0 w-[200px] h-full cursor-pointer"
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
        />
      )}
    </div>
  )

  return (
    <div className="container">
      <div className="my-10 p-8 border rounded-lg shadow-lg bg-white">
        <h1 className="text-2xl font-medium mb-5 text-center">Thông tin cá nhân</h1>

        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Row gutter={64}>
            <Col span={12}>
              <Form.Item label="Avatar">{renderAvatar()}</Form.Item>
            </Col>
          </Row>
          <Row gutter={64}>
            <Col span={12}>
              <Form.Item label="Họ và tên" name="name">
                <Input disabled={!editMode} placeholder="Họ và tên" className="w-full" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email" name="email">
                <Input disabled={!editMode} placeholder="Email" className="w-full" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={64}>
            <Col span={12}>
              <Form.Item label="Số điện thoại" name="phoneNumber">
                <Input disabled={!editMode} placeholder="Số điện thoại" className="w-full" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Địa chỉ" name="address">
                <Input disabled={!editMode} placeholder="Địa chỉ" className="w-full" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={64}>
            <Col span={12}>
              <Form.Item label="Ngày sinh" name="dob">
                <Input placeholder="Ngày sinh" type="date" disabled={!editMode} className="w-full" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Giới tính" name="gender">
                <Select
                  disabled={!editMode}
                  options={[
                    { value: 1, label: 'Nam' },
                    { value: 0, label: 'Nữ' }
                  ]}
                  className="w-full"></Select>
              </Form.Item>
            </Col>
          </Row>
          {editMode && (
            <Form.Item className="mb-0">
              <Row gutter={64}>
                <Col span={12} className="flex justify-end">
                  <Button type="primary" htmlType="submit">
                    Lưu thay đổi
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          )}
          <Row gutter={64}>
            {!editMode && (
              <Col span={12} className="flex justify-end">
                <Button icon={<EditOutlined />} onClick={handleEdit}>
                  Chỉnh sửa
                </Button>
              </Col>
            )}
          </Row>
        </Form>
      </div>
    </div>
  )
}

export default UserProfileForm
