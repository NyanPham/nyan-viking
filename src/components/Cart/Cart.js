import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { formatPrice } from '../../helper'
import Policies from '../Policies'
import ProductControl from '../Product/ProductControl'
import { Link } from 'react-router-dom'
import useCartTotal from '../../hooks/useCartTotal'

export default function Cart() {
    const cartItems = useSelector(state => state.cartStatus.cartItems)
    const total = useCartTotal()

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }, [])

    return (
        <section className="">
            <Policies swiperEnabled={true} />
            <h1 className="text-2xl text-center font-semibold mt-5">Your Cart</h1>
            {cartItems.length > 0 
                ? 
                    (<>
                        <h3 className="text-center">
                            (
                                <span className="font-semibold underline underline-offset-1 decoration-2 decoration-gray-900 text-gray-900">{cartItems.length}</span>
                                &nbsp;{cartItems.length === 1 ? 'item is' : 'items are'}&nbsp;in your cart 
                            )
                        </h3>
                        <div className="flex flex-col py-7 px-7 gap-4 lg:flex-row lg:px-12">
                            <div className="grow space-y-4">
                                {cartItems.map((item, index) => (
                                    <ProductControl key={`cart_item_${index}`} {...item}/>
                                ))}
                            </div>
                            <div className="grow-0 w-full h-max md:ml-auto md:w-1/2 bg-gray-900 lg:w-2/5 lg:sticky lg:top-24">
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
                    </>)
                : 
                    (<div className="flex flex-col justify-center items-center h-52">
                        <h3 className="text-center">No items are in your cart</h3>
                        <Link to="/" className="auth-btn w-48 text-center text-gray-900 border border-gray-900 mt-2">Shop Now</Link>
                    </div>)
            }
        </section>
    )
}
