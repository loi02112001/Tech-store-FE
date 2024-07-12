import { Pagination } from 'antd'

const CustomPagination = ({ current, total, onChange, pageSize = 10 }) => {
  return (
    <Pagination
      className="flex justify-end pt-5"
      current={current}
      total={total}
      pageSize={pageSize}
      onChange={onChange}
      showSizeChanger={false}
    />
  )
}

export default CustomPagination
