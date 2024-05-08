import { Result } from 'antd'

function PageNotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <a className="button-primary" href="/">
          Back To Home
        </a>
      }
    />
  )
}

export default PageNotFound
