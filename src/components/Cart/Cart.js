import React from 'react'
import { useSelector } from 'react-redux'
import { formatPrice } from '../../helper'
import Policies from '../Policies'
import ProductControl from '../Product/ProductControl'
import { Link } from 'react-router-dom'

export default function Cart() {
    const cartItems = useSelector(state => state.cartStatus.cartItems)
    const products = useSelector(state => state.productStatus.products)
    const total = cartItems.reduce((amount, item) => {
        const product = products.find(product => product.code === item.code)
        const itemTotal = product.salePercent > 0 ? item.selectedAmount * (product.price - (product.price * (product.salePercent / 100))) : item.selectedAmount * product.price
        return amount += itemTotal
    }, 0)

    return (
        <section className="">
            <Policies swiperEnabled={true} />
            <h1 className="text-2xl text-center font-semibold mt-5">Your Cart</h1>
            <h3 className="text-center">
                (
                    <span className="font-semibold underline underline-offset-1 decoration-2 decoration-gray-900 text-gray-900">{cartItems.length}</span>
                    &nbsp;{cartItems.length === 1 ? 'item is' : 'items are'}&nbsp;in your cart 
                )
            </h3>
            <div className="flex flex-row py-7 px-12 gap-4">
                <div className="grow space-y-4">
                    {cartItems.map((item, index) => (
                        <ProductControl key={`cart_item_${index}`} {...item}/>
                    ))}
                </div>
                <div className="grow-0 w-2/5 bg-gray-900">
                    <div className="p-5">
                        <h2 className="text-gray-100 text-xl">Your order:</h2>
                        <p className='text-gray-300 text-sm'>VAT included</p>
                        <div className="flex justify-between items-center mt-5 relative after:left-0 after:w-full after:h-px after:-bottom-5 after:absolute after:bg-gray-100">
                            <h3 className="text-gray-200 font-semibold uppercase">Total:</h3>
                            <p className="text-gray-200 font-semibold">{formatPrice(total, 'USD')}</p>
                        </div>
                        <Link to="/checkout" className="block mt-10 submit-btn">Proceed to checkout</Link>
                        <p className="mt-3 text-sm text-center text-gray-300">Free US Shipping if you spend more than $35 USD</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
