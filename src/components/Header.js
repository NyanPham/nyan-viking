import React from 'react'
import NyanLogo from '../assets/nyan-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
    return (
        <div className="py-7 px-12 flex flex-row justify-between items-center absolute top-0 left-0 w-full z-10">
            <div className="flex flex-row justify-start items-center gap-7">
                <div className="w-32 h-12">
                    <img src={NyanLogo} alt="Nyan Viking Logo" className="max-h-full max-w-full" />
                </div>
                <nav>
                    <ul  className="flex justify-between items-center gap-7">
                        <li className="cursor-pointer"><a className="text-lg text-white group hover:text-sky-300">For Men <span className="arrow-down"/></a></li>
                        <li className="cursor-pointer"><a className="text-lg text-white group hover:text-sky-300">For Women <span className="arrow-down"/></a></li>
                        <li className="cursor-pointer"><a className="text-lg text-white group hover:text-sky-300">For Kids <span className="arrow-down"/></a></li>
                        <li className="cursor-pointer"><a className="text-lg text-white group hover:text-sky-300">Junior <span className="arrow-down"/></a></li>
                        <li className="cursor-pointer"><a className="text-lg text-white group hover:text-sky-300">Activity <span className="arrow-down"/></a></li>
                    </ul>
                </nav>
            </div>
            <div className="cursor-pointer group">
                <FontAwesomeIcon icon={faCartShopping} className="text-xl text-white group-hover:-translate-y-0.5 group-hover:text-sky-300 transform transition" />
                <span className="text-white uppercase ml-3 tracking-wide group-hover:text-sky-300">Items: 0</span>
            </div>
        </div>
    )
}
