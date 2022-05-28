import React, { lazy } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, Lazy } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import 'swiper/css/lazy'

export default function Hero() {
    return (
        <div className="hero-container relative">
            <div className="absolute top-1/2 left-1/2 text-2xl z-10 -translate-y-1/2 -translate-x-1/2 select-none">
                <h2 className="uppercase text-3xl font-semibold text-white tracking-wider">Power for your lifestyle</h2>
                <h3 className="text-center mt-2 text-white tracking-wide">Hiking footwear for viking</h3>
            </div>
            <Swiper
                modules={[Navigation, Pagination, Autoplay, Lazy]}
                slidesPerView={1}
                spaceBetween={50}
                speed={800}
                navigation
                autoplay
                lazy
                pagination={{ clickable: true }}
            >
                <SwiperSlide><div className="slide-1 slide"></div></SwiperSlide>
                <SwiperSlide><div className="slide-2 slide"></div></SwiperSlide>
                <SwiperSlide><div className="slide-3 slide"></div></SwiperSlide>
                <SwiperSlide><div className="slide-4 slide"></div></SwiperSlide>
                <SwiperSlide><div className="slide-5 slide"></div></SwiperSlide>
            </Swiper>
        </div>
    )
}
