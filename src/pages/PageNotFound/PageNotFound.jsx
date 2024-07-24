import { Result } from 'antd'

function PageNotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, trang web không tồn tại"
      extra={
        <a className="btn btn-primary" href="/">
          Trang chủ
        </a>
      }
    />
  )
}

export default PageNotFound
