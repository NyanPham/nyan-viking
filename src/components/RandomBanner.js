import React, { useEffect, useState } from 'react'
import { PRODUCTS } from './App'
import SecondBoot from '../assets/second-boot.png'
import SunsetCamping from '../assets/sunset-camping.jpg'

export default function RandomBanner() {
    const [randomProduct, setRandomProduct] = useState()

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * PRODUCTS.length)
        setRandomProduct(PRODUCTS[randomIndex])
    }, [])
    
    return (
        <div className="h-72 w-full flex">
            <div className="w-1/3 h-full py-7 px-12 bg-gray-900 flex flex-col justify-center items-center gap-6">
                <div className="w-3/5 h-3/5 flex justify-center items-center">
                    <img src={SecondBoot} alt="upsale boot" className='max-w-full max-h-full' />
                </div>
                <button className="px-4 py-2 border border-white bg-transparent text-white italic hover:text-sky-900 hover:bg-white active:bg-gray-300 transition">Shop all active outdoors</button>
            </div>
            <div className="w-2/3 h-full overflow-hidden">
                <img src={SunsetCamping} alt="sunset on camping scene" className="object-cover object-bottom w-full h-full" />
            </div>
        </div>
    )
}
