import React from 'react'
import { useSelector } from 'react-redux'
import ProductControl from '../Product/ProductControl'

export default function Checkout() {
    const cartItems = useSelector(state => state.cartStatus.cartItems)

    return (
        <div className="flex flex-col py-7 px-12 lg:flex-row">
            <div className="w-1/2 h-96">
                <h1 className="text-2xl text-left font-semibold mt-5 inline-block">Checkout</h1>
                <h3 className="text-left inline-block ml-2">
                    (
                        <span className="font-semibold underline underline-offset-1 decoration-2 decoration-gray-900 text-gray-900">{cartItems.length}</span>
                        &nbsp;{cartItems.length === 1 ? 'item is' : 'items are'}&nbsp;in your cart 
                    )
                </h3>
            </div>
            <div className="w-full space-y-4 lg:w-1/2">
                {cartItems.map((item, index) => (
                    <ProductControl key={`product_control_${index}`} {...item}/>
                ))}
            </div>
        </div>
    )
}
