import React from 'react'
import BlueNyanLogo from '../assets/blue-nyan-logo.png'

export default function Testimonials() {
    return (
        <div className="py-7 px-12 h-72 w-full bg-gray-300 mt-7 text-center">
            <div className='w-32 h-14 mx-auto'>
                <img src={BlueNyanLogo} alt="Nyan Logo at Testimonials" className='max-w-full max-h-full mx-auto'/>
            </div>
            <p className="text-lg text-sky-900 mx-auto w-2/3 mt-5">
                Viking Store is the perfect place for you to find all the essential items you need for your 
                next journey. If you are a kind of person who loves to travel to adventrous area to push 
                your survival skills to limit, our items will be for you. Contact us to find out what you 
                need if you are just a newbie.
            </p>
        </div>
    )
}
