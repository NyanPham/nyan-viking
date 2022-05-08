import React, { useEffect, useState } from 'react'
import { capitalize } from '../../helper'
import useTimeout from '../../hooks/useTimeout'

export default function Toast(props) {
    const [mounted, setMounted] = useState(false)
    const [inPage, setInPage] = useState(false)
    useTimeout(() => setInPage(true), 1000)
    const {
        name,
        imageURL,
        selectedAmount, 
        selectedSize,
        selectedColor,
    } = props

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div className={`${mounted && inPage ? 'translate-x-0' : 'translate-x-full'} h-max w-80 bg-gray-100 rounded-sm m-4 shadow-lg transition transform duration-1000`}>
            <div className="p-2 border-b border-gray-400 text-center">
                <h3 className="text-base">This item was added to your cart</h3>
            </div>
            <div className="flex flex-row">
                <div className="w-24 h-24 p-2">
                    <img src={imageURL} alt={name} className="w-full h-full object-contain object-center" />
                </div>
                <div className="p-2 text-sm">
                    <h4>Product: {name}</h4>
                    <h4>Color: {capitalize(selectedColor)}</h4>
                    <h4>Size: {capitalize(selectedSize)}</h4>
                    <h4>x{selectedAmount}</h4>
                </div>
            </div>
        </div>
    )
}
