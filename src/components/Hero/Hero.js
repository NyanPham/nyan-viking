import React, { lazy } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, Lazy } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import 'swiper/css/lazy'
import HeroSlide from './HeroSlide'

const IMAGE_NAMES_ARRAY = ['hiking-forest.jpg', 'hiking-snow.jpg', 'hiking-two.jpg', 'snow-stand.jpg', 'far-hiking.jpg']

export default function Hero() {
    
    return (
        <div className="hero-container relative">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, Lazy]}
                slidesPerView={1}
                spaceBetween={0}
                speed={800}
                navigation
                autoplay
                lazy
                pagination={{ clickable: true }}
            >
                {IMAGE_NAMES_ARRAY.map((imageName, index) => (
                    <SwiperSlide key={`slide_${index}`}>
                        <HeroSlide slideNumber={index + 1} title={'Power for your lifestyle'} subtitle={'Hiking footwear for viking'}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
