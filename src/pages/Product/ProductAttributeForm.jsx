import { useState } from 'react'

import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space, Table } from 'antd'

const ProductAttributeForm = (props) => {
  const [formAtr] = Form.useForm()
  const { attributes, setAttributes } = props
  const [editingIndex, setEditingIndex] = useState(null)

  const addAttribute = (values) => {
    if (editingIndex !== null) {
      const newAttributes = [...attributes]
      newAttributes[editingIndex] = values
      setAttributes(newAttributes)
      setEditingIndex(null)
    } else {
      setAttributes([...attributes, values])
    }
    formAtr.resetFields()
  }

  const handleAddAttribute = (e) => {
    e.preventDefault()
    formAtr
      .validateFields()
      .then((values) => {
        addAttribute(values)
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }

  const removeAttribute = (index) => {
    const newAttributes = attributes.filter((_, i) => i !== index)
    setAttributes(newAttributes)
  }

  const editAttribute = (index) => {
    const attribute = attributes[index]
    formAtr.setFieldsValue(attribute)
    setEditingIndex(index)
  }

  const columns = [
    {
      title: 'Tên thuộc tính',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Giá trị thuộc tính',
      dataIndex: 'value',
      key: 'value'
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, record, index) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => editAttribute(index)}
            className="text-blue-500 hover:text-blue-700"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => removeAttribute(index)}
            className="text-red-500 hover:text-red-700"
          />
        </Space>
      )
    }
  ]

  return (
    <>
      <Form form={formAtr} layout="inline" className="w-full mb-4">
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên thuộc tính!' }]}
          className="w-1/3 mb-2 mr-2">
          <Input placeholder="Tên thuộc tính" className="w-full" />
        </Form.Item>
        <Form.Item
          name="value"
          rules={[{ required: true, message: 'Vui lòng nhập giá trị thuộc tính!' }]}
          className="w-1/3 mb-2 mr-2">
          <Input placeholder="Giá trị thuộc tính" className="w-full" />
        </Form.Item>
        <Form.Item className="mb-2">
          <button type="primary" icon={<PlusOutlined />} className="btn btn-blue" onClick={handleAddAttribute}>
            {editingIndex !== null ? 'Cập nhật' : 'Thêm'} Thuộc Tính
          </button>
        </Form.Item>
      </Form>

      {attributes.length > 0 && (
        <div className="mb-4">
          <Table
            dataSource={attributes}
            columns={columns}
            pagination={false}
            rowKey={(record, index) => index}
            className="mb-4"
          />
        </div>
      )}
    </>
  )
}

export default ProductAttributeForm
