import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function Hero() {
    return (
        <div className="hero-container relative">
            <div className="absolute top-1/2 left-1/2 text-2xl z-10 -translate-y-1/2 -translate-x-1/2 select-none">
                <h2 className="uppercase text-3xl font-semibold text-white tracking-wider">Power for your lifestyle</h2>
                <h3 className="text-center mt-2 text-white tracking-wide">Hiking footwear for viking</h3>
            </div>
            <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={1}
                spaceBetween={50}
                navigation
                pagination={{ clickable: true }}
            >
                <SwiperSlide><div className="slide-1 slide"></div></SwiperSlide>
                <SwiperSlide><div className="slide-2 slide"></div></SwiperSlide>
                <SwiperSlide><div className="slide-3 slide"></div></SwiperSlide>
            </Swiper>
        </div>
    )
}
