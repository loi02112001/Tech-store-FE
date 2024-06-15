import { useEffect, useState } from 'react'

import DefaultImages from '@/assets/icons/DefaultImage'
import useProductStore from '@/store/productStore'
import usePromotionStore from '@/store/promotionStore'
import { isEmptyUsingKeys } from '@/utils'

import { Col, DatePicker, Form, Input, Modal, Row, Table } from 'antd'
import dayjs from 'dayjs'
const { RangePicker } = DatePicker

const AddEditPromotion = ({ promotion = {}, classButton = '', textButton = 'Sửa', title }) => {
  const { createPromotion, updatePromotion } = usePromotionStore()
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [productModalOpen, setProductModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(promotion)
  const [time, setTime] = useState([])

  const openModal = () => {
    form.setFieldsValue(promotion)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    form.resetFields()
  }
  const openProductModal = () => {
    setProductModalOpen(true)
  }

  const onOk = (value) => {
    console.log(value)
  }

  const handleSubmit = (values) => {
    promotion?.id
      ? updatePromotion(promotion.id, {
          ...promotion,
          productId: selectedProduct?.id,
          startTime: time.length > 0 ? dayjs(time[0]).format('YYYY-MM-DD') : promotion.startTime,
          endTime: time.length > 0 ? dayjs(time[1]).format('YYYY-MM-DD') : promotion.endTime,
          discountPrice: +values.discountPrice
        })
      : createPromotion({
          productId: selectedProduct?.id,
          startTime: dayjs(time[0]).format('YYYY-MM-DD'),
          endTime: dayjs(time[1]).format('YYYY-MM-DD'),
          discountPrice: +values.discountPrice
        })
    closeModal()
  }

  return (
    <>
      <button className={classButton} onClick={openModal}>
        {textButton}
      </button>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={form.submit}
        onCancel={closeModal}
        okText="Tạo"
        cancelText="Hủy"
        destroyOnClose>
        <div className="flex flex-col gap-4 py-5 mt-2 border-t">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-5">
              <h4 className="text-base font-medium">Sản phẩm đã chọn:</h4>
              <button onClick={openProductModal} className="link">
                Chọn sản phẩm
              </button>
            </div>
            {!isEmptyUsingKeys(selectedProduct) ? (
              <div className="flex items-center gap-10">
                {selectedProduct.productImage ? (
                  <img
                    alt={selectedProduct.name}
                    src={selectedProduct.productImage}
                    className="inline object-cover aspect-square border rounded w-20"
                  />
                ) : (
                  <DefaultImages width={50} height={50} />
                )}
                <p>{promotion.productName ? promotion.productName : selectedProduct.name}</p>
              </div>
            ) : (
              <p>Chưa chọn sản phẩm</p>
            )}
          </div>
        </div>
        <RangePicker
          className="w-full mb-5"
          name="time"
          format="YYYY-MM-DD"
          onChange={(value, dateString) => {
            setTime(dateString)
          }}
          defaultValue={
            promotion?.startTime && promotion?.endTime ? [dayjs(promotion?.startTime), dayjs(promotion?.endTime)] : time
          }
          onOk={onOk}
        />
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                className=" w-full"
                name="discountPrice"
                label="Giảm giá"
                rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}>
                <Input type="text" placeholder="Giảm giá" name="discountPrice" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      <ProductsModal
        open={productModalOpen}
        onCancel={() => setProductModalOpen(false)}
        onOk={() => setProductModalOpen(false)}
        onSelect={setSelectedProduct}
      />
    </>
  )
}

const ProductsModal = ({ open, onOk, onCancel, onSelect }) => {
  const { products, getListProducts } = useProductStore()
  const [selectedProduct, setSelectedProduct] = useState({})

  const handleOk = () => {
    onSelect(selectedProduct)
    onOk()
  }

  useEffect(() => {
    getListProducts()
  }, [])
  const productColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center'
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'productImage',
      key: 'productImage',
      align: 'center',
      render: (_, record) => {
        return (
          <>
            {record.productImage ? (
              <img
                alt={record.name}
                src={record.productImage}
                width={80}
                height={80}
                className="inline object-cover aspect-square rounded-sm"
              />
            ) : (
              <DefaultImages width={80} height={70} />
            )}
          </>
        )
      }
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name'
    }
  ]

  return (
    <Modal title="Chọn sản phẩm" open={open} onOk={handleOk} onCancel={onCancel} width={700}>
      <Table
        columns={productColumns}
        size="middle"
        dataSource={products.length > 0 ? products : []}
        rowKey={(product) => product.id}
        rowSelection={{
          type: 'radio',
          onChange: (selectedRowKeys, selectedRows) => setSelectedProduct(selectedRows[0])
        }}
      />
    </Modal>
  )
}

export default AddEditPromotion
