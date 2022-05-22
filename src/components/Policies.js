import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { faTruck, faCartShopping, faCircleInfo, faCircle } from '@fortawesome/free-solid-svg-icons'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import Popup from './Popup'

export const POLICIES = [
    {
        icon: faCartShopping,
        text: 'Official Internet Store',
        content: "This is one of the greatest store ever in the universe. You just need to buy it once and you will never find your way back!"
    },
    {
        icon: faTruck,
        text: 'Free Returns',
        content: "Are you afraid of purchasing poor quality products? No need to worry as you can easily get refund. We will get our items back after your money is back to your account."
    },
    {
        icon: faCircleInfo,
        text: 'About Store',
        content: "This is one of the greatest store ever in the universe. You don't ever need to buy it in order to get one free."
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
                                    <Policy icon={policy.icon} text={policy.text} index={index} swiperEnabled={swiperEnabled} content={policy.content} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>)
                :   
                    (<div className="py-3 px-24 bg-neutral-900 w-full grid grid-cols-3 justify-center items-center">
                        {POLICIES.map((policy, index) => (
                            <Policy key={`policy_${index}`} icon={policy.icon} text={policy.text} index={index} swiperEnabled={swiperEnabled} content={policy.content} />
                        ))}
                    </div>)
            }
        </>
        
    )
}

function Policy({ icon, text, index, swiperEnabled, content }) {
    const [policyOpen, setPolicyOpen] = useState(false)

    function openPolicy() {
        setPolicyOpen(true)
    }

    function closePolicy() {
        setPolicyOpen(false)
    }

    return (
        <>
            <div className={`w-full flex justify-center ${(index === 1 && !swiperEnabled) ? 'border-l border-r border-gray-300' : ''}`} onClick={openPolicy}>
                <div className='flex gap-2 items-center cursor-pointer hover:-translate-y-0.5 transition transform group'>
                    <FontAwesomeIcon icon={icon} className="text-lg text-gray-300 group-hover:text-sky-200" />
                    <span className="text-gray-300 group-hover:text-sky-200">{text}</span>
                </div>
            </div>
            {ReactDOM.createPortal(
                <Popup title={text} content={content} open={policyOpen} closePopup={closePolicy}/>, document.getElementById('root')
            )}
        </>
    )
}
