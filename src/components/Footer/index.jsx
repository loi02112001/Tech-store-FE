const Footer = () => {
  return (
    <div className="container py-5 footer">
      <ul className="accordion">
        <li>
          <input type="radio" name="accordion" id="first" />
          <label htmlFor="first">Công ty cổ phần thời trang việt nam</label>
          <div className="content">
            <p>Day la p</p>
          </div>
        </li>
        <li>
          <input type="radio" name="accordion" id="second" />
          <label htmlFor="second">Chính sách</label>
          <div className="content">
            <p>Day la p</p>
          </div>
        </li>
        <li>
          <input type="radio" name="accordion" id="three" />
          <label htmlFor="three">Cửa hàng</label>
          <div className="content">
            <p>Day la p</p>
          </div>
        </li>
      </ul>
      <div className="  border-b-1 border-[#CF5763] ">Đây là foooter</div>
    </div>
  )
}

export default Footer
