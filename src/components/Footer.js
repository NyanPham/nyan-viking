import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagramSquare, faTwitterSquare, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'


export default function Footer() {
    return (
        <div className="w-full py-7 px-36 bg-gray-300">
            <div className="flex justify-between items-start">
                <div className="flex gap-20">
                    <div className="flex flex-col gap-5 w-max">
                        <h3 className="uppercase tracking-wide text-lg text-sky-900 font-semibold">Company</h3>
                        <ul className="list-none flex flex-col gap-3">
                            <li className="text-sm text-gray-900 cursor-pointer hover:text-teal-600 hover:translate-x-1 transform transition">About Us</li>
                            <li className="text-sm text-gray-900 cursor-pointer hover:text-teal-600 hover:translate-x-1 transform transition">Contact Us</li>
                            <li className="text-sm text-gray-900 cursor-pointer hover:text-teal-600 hover:translate-x-1 transform transition">Lookbook</li>
                            <li className="text-sm text-gray-900 cursor-pointer hover:text-teal-600 hover:translate-x-1 transform transition">Share Location</li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-5 w-max">
                        <h3 className="uppercase tracking-wide text-lg text-sky-900 font-semibold">Our Shop</h3>
                        <ul className="list-none flex flex-col gap-3">
                            <li className="text-sm text-gray-900 cursor-pointer hover:text-teal-600 hover:translate-x-1 transform transition">Men</li>
                            <li className="text-sm text-gray-900 cursor-pointer hover:text-teal-600 hover:translate-x-1 transform transition">Women</li>
                            <li className="text-sm text-gray-900 cursor-pointer hover:text-teal-600 hover:translate-x-1 transform transition">Kids</li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-5 w-max">
                        <h3 className="uppercase tracking-wide text-lg text-sky-900 font-semibold">Orders & Returns</h3>
                        <ul className="list-none flex flex-col gap-3">
                            <li className="text-sm text-gray-900 cursor-pointer hover:text-teal-600 hover:translate-x-1 transform transition">Shipping & returns</li>
                            <li className="text-sm text-gray-900 cursor-pointer hover:text-teal-600 hover:translate-x-1 transform transition">Order Status</li>
                            <li className="text-sm text-gray-900 cursor-pointer hover:text-teal-600 hover:translate-x-1 transform transition">Payment</li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-5 w-max">
                        <h3 className="uppercase tracking-wide text-lg text-sky-900 font-semibold">Other</h3>
                        <ul className="list-none flex flex-col gap-3">
                            <li className="text-sm text-gray-900 cursor-pointer hover:text-teal-600 hover:translate-x-1 transform transition">News</li>
                            <li className="text-sm text-gray-900 cursor-pointer hover:text-teal-600 hover:translate-x-1 transform transition">Career</li>
                            <li className="text-sm text-gray-900 cursor-pointer hover:text-teal-600 hover:translate-x-1 transform transition">FAQ</li>
                        </ul>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-5">
                    <FontAwesomeIcon icon={faFacebookSquare} className="text-2xl text-sky-900 hover:-translate-y-0.5 hover:text-sky-700 transform transition cursor-pointer" />
                    <FontAwesomeIcon icon={faTwitterSquare} className="text-2xl text-sky-900 hover:-translate-y-0.5 hover:text-sky-700 transform transition cursor-pointer" />
                    <FontAwesomeIcon icon={faLinkedinIn} className="text-2xl text-sky-900 hover:-translate-y-0.5 hover:text-sky-700 transform transition cursor-pointer" />
                    <FontAwesomeIcon icon={faInstagramSquare} className="text-2xl text-sky-900 hover:-translate-y-0.5 hover:text-sky-700 transform transition cursor-pointer" />
                </div>
            </div>
            <div className="flex justify-between items-center mt-7">
                <h3 className="text-gray-500 text-sm">&copy;Built by Nhan Pham</h3>
                <ul className="list-none flex gap-7">
                    <li className='text-gray-500 text-sm hover:-translate-y-0.5 transform transition cursor-pointer'>Terms of use</li>
                    <li className='text-gray-500 text-sm hover:-translate-y-0.5 transform transition cursor-pointer'>Privacy Policy</li>
                </ul>
            </div>
        </div>
    )
}
