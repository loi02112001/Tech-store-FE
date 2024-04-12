import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { shopAction } from "@/actions/shopAction"
import Upload from "@/components/Upload"

import { Button, Col, Form, Input, Row, Spin } from "antd"

import "./index.css"
const UpdateShop = () => {
  const dispatch = useDispatch()
  const { loading, data } = useSelector((state) => state.shops)
  const [form] = Form.useForm()
  const [image, setImage] = useState()
  const [file, setFile] = useState()
  const [showImageError, setShowImageError] = useState(false)

  useEffect(() => {
    dispatch(shopAction.getInfoShop())
  }, [])

  useEffect(() => {
    form.resetFields()
    if (data) {
      setImage(data.logo_url)
    }
  }, [data])

  // const handleShop = async (formData) => {
  // //   const form = new FormData()
  // //   form.append("image[]", file)
  // //   const { data: dataImages } = await files.uploadImage(form)
  // //   if (Object.keys(data || {}).length > 0) {
  // //     dispatch(shopAction.updateShop({ ...formData, logo_url: dataImages[0] }))
  // //   } else {
  // //     dispatch(shopAction.addShop({ ...formData, logo_url: dataImages[0] }))
  // //   }
  // // }

  return (
    <Spin spinning={loading}>
      {/* <div className="p-4 bg-white rounded">
        <p className="pb-4 text-xl font-semibold">Thông tin nhà cung cấp</p>
        <Form layout="vertical" onFinish={handleShop} form={form} initialValues={data}>
          <Form.Item
            name="logo_url"
            label={"Ảnh đăng ký shop"}
            style={{ width: "fit-content" }}
            rules={[
              () => ({
                validator(_) {
                  if (file) {
                    setShowImageError(false)
                    return Promise.resolve()
                  }
                  setShowImageError(true)
                  return Promise.reject()
                },
              }),
            ]}>
            <Upload
              image={image}
              setFile={setFile}
              setImage={setImage}
              onImageSelected={() => setShowImageError(false)}
            />
          </Form.Item>
          {showImageError && <p className="pb-6 text-red-500">Vui lòng chọn logo</p>}
          <Row gutter={(40, 40)}>
            <Col span={12}>
              <Form.Item name="name" label="Tên shop" rules={[{ required: true, message: "Vui lòng nhập tên shop!" }]}>
                <Input placeholder="Nhập tên shop" type="text" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="address"
                label="Địa chỉ shop"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ shop!" }]}>
                <Input placeholder="Địa chỉ shop" />
              </Form.Item>
            </Col>
          </Row>
          <div className="flex justify-end">
            <Button htmlType="submit" type="primary" className="ml-auto" loading={loading}>
              Lưu và tiếp
            </Button>
          </div>
        </Form>
      </div> */}
    </Spin>
  )
}

export default UpdateShop
