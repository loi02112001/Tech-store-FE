import "swiper/css"
import "swiper/css/navigation"
import { Autoplay, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import "./HomePage.css"

export default function CustomerHomePage() {
  const dataSlider = [
    "https://hanoicomputercdn.com/media/banner/15_Apref68d3cab18ffd1b296842c3a2663ab2.jpg",
    "https://hanoicomputercdn.com/media/banner/15_Apref68d3cab18ffd1b296842c3a2663ab2.jpg",
    "https://hanoicomputercdn.com/media/banner/15_Apref68d3cab18ffd1b296842c3a2663ab2.jpg",
    "https://hanoicomputercdn.com/media/banner/15_Apref68d3cab18ffd1b296842c3a2663ab2.jpg",
    "https://hanoicomputercdn.com/media/banner/15_Apref68d3cab18ffd1b296842c3a2663ab2.jpg",
    "https://hanoicomputercdn.com/media/banner/15_Apref68d3cab18ffd1b296842c3a2663ab2.jpg",
  ]
  return (
    <Swiper
      navigation={true}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[Navigation, Autoplay]}
      className="mySwiper">
      {dataSlider?.map((item, index) => (
        <SwiperSlide key={index}>
          <img alt="Banner data" className="w-full h-full aspect-[3/1]" src={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
