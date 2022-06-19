import React, { useEffect, useRef, useState } from 'react'
import { useRecentlyViewed } from '../../contexts/RecentlyViewedContextProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'
import useToggle from '../../hooks/useToggle'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { formatPrice } from '../../helper'
import useEventListener from '../../hooks/useEventListener'
import { useLocation } from 'react-router-dom'

const HIDE_PATHNAMES = ['/profile', '/update-profile', '/checkout', '/login', '/signup', '/forgot-password']

export default function RecentlyViewed() {
    const { recentlyViewed, setRecentlyViewed } = useRecentlyViewed()
    const [fullView, toggleFullView] = useToggle(false)
    const [fullWidth, toggleFullWidth] = useToggle(false)
    const { pathname } = useLocation()

    const elementRef = useRef()

    useEventListener(
        'transitionend',
        () => {
            if (fullView === false) return toggleFullWidth(false)
            toggleFullWidth(true)
        },
        elementRef.current
    )

    return (
        <div
            className={`${recentlyViewed.length > 0 ? '' : 'translate-x-full'} ${
                fullView ? 'translate-x-0 w-1/3' : 'w-24 translate-x-full hover:translate-x-0'
            } ${
                HIDE_PATHNAMES.includes(pathname) ? 'hidden' : 'flex'
            } h-60 fixed top-1/2 right-0 bg-red z-20 flex flex-col bg-white drop-shadow-xl transition-all transform duration-500`}
            data-recently-viewed
            ref={elementRef}
        >
            <h4 className="bg-gray-900 text-gray-200 py-1 text-center text-sm">Recents</h4>
            <div
                className={`w-full h-full flex items-center  ${
                    fullView
                        ? 'flex-row justify-center'
                        : 'flex-col overflow-y-auto p-2 justify-start overflow-x-hidden'
                }`}
            >
                {fullView ? (
                    <Swiper
                        modules={[Navigation]}
                        slidesPerView={recentlyViewed.length > 1 ? 2 : 1}
                        spaceBetween={50}
                        speed={500}
                        navigation
                    >
                        {recentlyViewed.map((item) => (
                            <SwiperSlide key={`recently_viewed_${item.title}`}>
                                <a
                                    className={`w-44 h-44 ${
                                        fullWidth ? 'opacity-100' : 'opacity-0'
                                    } transition duration-500`}
                                    href={`/product/${item.docId}`}
                                >
                                    <div className="w-32 h-32 flex justify-center items-center mx-auto">
                                        <img
                                            className="max-h-full max-w-full object-contain mx-auto block"
                                            src={item.imageURL}
                                            alt={item.title}
                                        />
                                    </div>
                                    <h4
                                        className={`text-center ${
                                            fullWidth ? 'opacity-100' : 'opacity-0'
                                        } transition duration-500`}
                                    >
                                        {item.title}
                                    </h4>
                                    <h4
                                        className={`text-sm text-center ${
                                            fullWidth ? 'opacity-100' : 'opacity-0'
                                        } transition duration-500`}
                                    >
                                        {item?.salePercent > 0 ? (
                                            <>
                                                <span className="line-through text-xs inline-block mr-1">
                                                    {formatPrice(item.price, 'USD')}
                                                </span>
                                                &nbsp;
                                                <span className="inline-block text-emerald-500 font-semibold">
                                                    {formatPrice(
                                                        item.price - item.price * (item.salePercent / 100),
                                                        'USD'
                                                    )}
                                                </span>
                                            </>
                                        ) : (
                                            <span className="inline-block">{formatPrice(item.price, 'USD')}</span>
                                        )}
                                    </h4>
                                </a>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <>
                        {recentlyViewed.map((item) => (
                            <a
                                className="w-16 h-28 shrink-0 flex justify-center items-center hover:scale-110 transform transition"
                                key={`recently_viewed_${item.title}`}
                                href={`/product/${item.docId}`}
                            >
                                <img
                                    className="max-w-full max-h-full object-center"
                                    src={item.imageURL}
                                    alt={item.title}
                                />
                            </a>
                        ))}
                    </>
                )}
            </div>
            <button
                className="p-4 w-10 h-10 bg-gray-900 absolute rounded-full flex justify-center items-center top-12 -z-10 -left-8"
                onClick={toggleFullView}
            >
                <FontAwesomeIcon
                    icon={faAnglesLeft}
                    className={`${fullView && 'rotate-180'} text-xl text-gray-500 transform transition duration-500`}
                />
            </button>
        </div>
    )
}
