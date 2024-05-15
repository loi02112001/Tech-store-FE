import Slider from 'react-slick'

const CustomerHero = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    cssEase: 'linear'
  }
  const images = [
    'https://file.hstatic.net/200000722513/file/layout_thang_4_1015x325_copy_0a4cd291bc5b4fb2a227e40d9a7e6319.png',
    'https://file.hstatic.net/200000722513/file/layout_thang_4_1015x325_copy_0a4cd291bc5b4fb2a227e40d9a7e6319.png',
    'https://file.hstatic.net/200000722513/file/layout_thang_4_1015x325_copy_0a4cd291bc5b4fb2a227e40d9a7e6319.png',
    'https://file.hstatic.net/200000722513/file/layout_thang_4_1015x325_copy_0a4cd291bc5b4fb2a227e40d9a7e6319.png',
    'https://file.hstatic.net/200000722513/file/layout_thang_4_1015x325_copy_0a4cd291bc5b4fb2a227e40d9a7e6319.png',
    'https://file.hstatic.net/200000722513/file/layout_thang_4_1015x325_copy_0a4cd291bc5b4fb2a227e40d9a7e6319.png'
  ]

  return (
    <div className="overflow-hidden">
      <Slider {...settings}>
        {images.map((el, index) => (
          <div key={index}>
            <img className="w-full aspect-[3/1]" src={el} alt="" />
          </div>
        ))}
      </Slider>
    </div>
  )
}
export default CustomerHero
