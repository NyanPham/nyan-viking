import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { faTruck, faCartShopping, faCircleInfo, faCircle } from '@fortawesome/free-solid-svg-icons'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'

export const POLICIES = [
    {
        icon: faCartShopping,
        text: 'Official Internet Store'
    },
    {
        icon: faTruck,
        text: 'Free Returns'
    },
    {
        icon: faCircleInfo,
        text: 'About Store'
    }
]

export default function Policies({ swiperEnabled = false }) {
    return (
        <>
            {swiperEnabled 
                ?   (<div className="py-3 px-24 bg-neutral-900 w-full justify-center items-center" id="policies">
                        <Swiper
                            modules={[Navigation]}
                            navigation
                            className="w-2/5"
                        >
                            {POLICIES.map((policy, index) => (
                                <SwiperSlide key={`policy_${index}`}>
                                    <Policy icon={policy.icon} text={policy.text} index={index} swiperEnabled={swiperEnabled}/>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>)
                :   
                    (<div className="py-3 px-24 bg-neutral-900 w-full grid grid-cols-3 justify-center items-center">
                        {POLICIES.map((policy, index) => (
                            <Policy key={`policy_${index}`} icon={policy.icon} text={policy.text} index={index} swiperEnabled={swiperEnabled}/>
                        ))}
                    </div>)
            }
        </>
        
    )
}

function Policy({ icon, text, index, swiperEnabled }) {
    return (
        <div className={`w-full flex justify-center ${(index === 1 && !swiperEnabled) ? 'border-l border-r border-gray-300' : ''}`}>
            <div className='flex gap-2 items-center cursor-pointer hover:-translate-y-0.5 transition transform group'>
                <FontAwesomeIcon icon={icon} className="text-lg text-gray-300 group-hover:text-sky-200" />
                <span className="text-gray-300 group-hover:text-sky-200">{text}</span>
            </div>
        </div>
        
    )
}
