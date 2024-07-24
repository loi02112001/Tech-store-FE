import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import './CustomSwiper.css'

function CustomSwiper({ items, renderItem, spaceBetween = 20, slidesPerView = 5 }) {
  return (
    <Swiper
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      navigation={true}
      modules={[Navigation]}
      className="mt-6 !pb-12">
      {items.map((item, index) => (
        <SwiperSlide key={index} className="!h-auto">
          {renderItem(item)}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default CustomSwiper
