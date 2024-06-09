import { useEffect, useState } from 'react'

import DefaultImages from '@/assets/icons/DefaultImage'
import useProductBatchStore from '@/store/productBatchStore'
import useProductStore from '@/store/productStore'
import useSupplierStore from '@/store/supplierStore'
import { isEmptyUsingKeys } from '@/utils'

import { Col, Form, Input, Modal, Row, Table } from 'antd'

const AddEditProductInventory = ({ classButton = '', textButton = 'Sửa' }) => {
  const { createProductBatch } = useProductBatchStore()
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [productModalOpen, setProductModalOpen] = useState(false)
  const [supplierModalOpen, setSupplierModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState({})
  const [selectedSupplier, setSelectedSupplier] = useState({})

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  const handleSubmit = (values) => {
    createProductBatch({
      importPrice: +values.importPrice,
      quantity: +values.quantity,
      productId: selectedProduct?.id,
      supplierId: selectedSupplier?.id
    })
    closeModal()
  }

  const openProductModal = () => {
    setProductModalOpen(true)
  }

  const openSupplierModal = () => {
    setSupplierModalOpen(true)
  }
  return (
    <>
      <button className={classButton} onClick={openModal}>
        {textButton}
      </button>
      <Modal
        title="Thêm lô hàng"
        open={isModalOpen}
        onOk={form.submit}
        onCancel={closeModal}
        okText="Lưu"
        cancelText="Hủy"
        destroyOnClose>
        <div className="flex flex-col gap-4 py-5 mt-2 border-t">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-5">
              <h4 className="text-base font-medium">Nhà cung cấp: </h4>
              <button type="primary" onClick={openSupplierModal} className="link">
                Chọn nhà cung cấp
              </button>
            </div>
            {!isEmptyUsingKeys(selectedSupplier) ? (
              <div>
                <p className="flex items-center gap-5 text-sm">
                  <span className="block w-24">Nhà cung cấp:</span>
                  {selectedSupplier.name}
                </p>
                <p className="flex items-center gap-5 text-sm">
                  <span className="block w-24">Địa chỉ:</span>
                  {selectedSupplier.address}
                </p>
                <p className="flex items-center gap-5 text-sm">
                  <span className="block w-24">SĐT:</span>
                  {selectedSupplier.phoneNumber}
                </p>
              </div>
            ) : (
              <p>Chưa chọn nhà cung cấp</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-5">
              <h4 className="text-base font-medium">Sản phẩm đã chọn:</h4>
              <button
                type="primary"
                onClick={openProductModal}
                disabled={isEmptyUsingKeys(selectedSupplier)}
                className="link">
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
                <p>{selectedProduct.name}</p>
              </div>
            ) : (
              <p>Chưa chọn sản phẩm</p>
            )}
          </div>
        </div>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                className=" w-full"
                name="importPrice"
                label="Giá nhập hàng"
                rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}>
                <Input type="text" placeholder="Giá nhập hàng" name="importPrice" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                className="w-full"
                name="quantity"
                label="Số lượng"
                rules={[{ required: true, message: 'Vui lòng chọn số lượng!' }]}>
                <Input type="text" placeholder="Số lượng" name="quantity" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      <SupplierModal
        open={supplierModalOpen}
        onCancel={() => setSupplierModalOpen(false)}
        onOk={() => setSupplierModalOpen(false)}
        onSelect={setSelectedSupplier}
      />

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

const SupplierModal = ({ open, onOk, onCancel, onSelect }) => {
  const { suppliers, getSuppliers } = useSupplierStore()
  const [selectedSupplier, setSelectedSupplier] = useState({})

  const handleOk = () => {
    onSelect(selectedSupplier)
    onOk()
  }

  useEffect(() => {
    getSuppliers()
  }, [])
  const productColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center'
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Số điện thoai',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    }
  ]

  return (
    <Modal title="Chọn sản phẩm" open={open} onOk={handleOk} onCancel={onCancel} width={700}>
      <Table
        columns={productColumns}
        size="middle"
        dataSource={suppliers.length > 0 ? suppliers : []}
        rowKey={(supplier) => supplier.id}
        rowSelection={{
          type: 'radio',
          onChange: (selectedRowKeys, selectedRows) => setSelectedSupplier(selectedRows[0])
        }}
      />
    </Modal>
  )
}

export default AddEditProductInventory
