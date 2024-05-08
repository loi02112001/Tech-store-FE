// import { useEffect, useRef } from "react"
// import TinySlider from "tiny-slider-react"
// import "tiny-slider/dist/tiny-slider.css"

// import "./CustomerHero.css"

// const CustomerHero = () => {
//   const settings = {
//     lazyload: true,
//     nav: false,
//     mouseDrag: true,
//     controls: false,
//     slideBy: "page",
//     swipeAngle: false,
//     autoplay: true,
//     speed: 1000,
//     autoplayTimeout: 5000,
//   }
//   const images = [
//     "https://file.hstatic.net/200000722513/file/layout_thang_4_1015x325_copy_0a4cd291bc5b4fb2a227e40d9a7e6319.png",
//     "https://file.hstatic.net/200000722513/file/layout_thang_4_1015x325_copy_0a4cd291bc5b4fb2a227e40d9a7e6319.png",
//     "https://file.hstatic.net/200000722513/file/layout_thang_4_1015x325_copy_0a4cd291bc5b4fb2a227e40d9a7e6319.png",
//     "https://file.hstatic.net/200000722513/file/layout_thang_4_1015x325_copy_0a4cd291bc5b4fb2a227e40d9a7e6319.png",
//     "https://file.hstatic.net/200000722513/file/layout_thang_4_1015x325_copy_0a4cd291bc5b4fb2a227e40d9a7e6319.png",
//     "https://file.hstatic.net/200000722513/file/layout_thang_4_1015x325_copy_0a4cd291bc5b4fb2a227e40d9a7e6319.png",
//   ]

//   const sliderRef = useRef(null)

//   useEffect(() => {
//     const slider = sliderRef.current
//     return () => slider && slider.destroy()
//   }, [])

//   return (
//     <TinySlider settings={settings} ref={sliderRef}>
//       {images.map((el, index) => (
//         <div key={index}>
//           <img className="w-full aspect-[3/1]" src={el} alt="" />
//         </div>
//       ))}
//     </TinySlider>
//   )
// }
// export default CustomerHero
