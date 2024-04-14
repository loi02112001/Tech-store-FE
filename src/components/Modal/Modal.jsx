import { Modal } from "antd"
import { useState } from "react"

function CustomModal({ customButton, title, handleClick, content }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    handleClick()
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <button type="button" onClick={showModal}>
        {customButton}
      </button>
      <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {content}
      </Modal>
    </>
  )
}
export default CustomModal
