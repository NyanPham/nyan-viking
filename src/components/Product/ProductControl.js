import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { formatPrice } from '../../helper'
import { removeItemFromCart, updateCartItemAmount } from '../../redux/actions/cartActions'

export default function ProductControl(props) {
    const {
        docId,
        code,
        imageURL,
        title,
        selectedColor, 
        selectedSize,
        selectedAmount,
        price
    } = props

    const location = useLocation()
    const isInCheckout = location.pathname.split('/').includes('checkout')
    console.log(isInCheckout)
    const products = useSelector(state => state.productStatus.products)
    const currentProduct = products.find(product => product.code === code)
    const dispatch = useDispatch()

    function handleAmountChange(e) {
        if (e.type === 'keydown') {
            let newValue

            if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return 

            if (e.key === 'ArrowUp') newValue = parseInt(selectedAmount) + 1 

            if (e.key === 'ArrowDown') newValue = parseInt(selectedAmount) - 1
            
            if (newValue <= 0) return 
            if (newValue > currentProduct.amountInStock) return
            return dispatch(updateCartItemAmount(docId, newValue))
        }

        if (isNaN(e.target.value)) return
        if (parseInt(e.target.value) <= 0 || parseInt(e.target.value) > currentProduct.amountInStock) return
        return dispatch(updateCartItemAmount(docId, parseInt(e.target.value)))
    }

    function handleAmountClick(e) {
        const action = e.target.dataset.action
        let newValue
        if (action === 'subtract') newValue = parseInt(selectedAmount) - 1
        if (action === 'add') newValue = parseInt(selectedAmount) + 1

        if (newValue <= 0) return 
        if (newValue > currentProduct.amountInStock) return 
        return dispatch(updateCartItemAmount(docId, newValue))
    }

    function handleRemoveItem() {
        dispatch(removeItemFromCart(docId))
    }

    return (
        <div className={`w-full flex justify-between border border-gray-200 transform transition md:justify-center`}>
            <div className="p-5 pr-0 mr-4 flex justify-center items-center w-28 md:mr-0">
                <a className="w-full p-0">
                    <img src={imageURL} alt={title} className="max-w-full max-h-full object-cover object-center" />
                </a>
            </div>
            <div className={`${isInCheckout ? '' : ''} flex w-2/3 flex-col md:flex-row md:grow`}>
                <div className={`${isInCheckout ? 'lg:pr-2' : ''} p-5 w-full md:w-36 md:grow`}>
                    <h2 className="font-medium text-lg text-gray-900">{title}</h2>
                    <h4 className="text-sm capitalize text-gray-500">Color: {selectedColor}</h4>
                    <h4 className="text-sm uppercase text-gray-500">Size: {selectedSize}</h4>
                    <h4 className="text-sm">
                        {currentProduct?.salePercent > 0
                            ?
                                <>
                                    <span className="line-through text-xs inline-block">{formatPrice(currentProduct.price, 'USD')}</span>&nbsp;
                                    <span className="inline-block">{formatPrice(currentProduct.price - (currentProduct.price * (currentProduct.salePercent / 100)), 'USD')}</span>
                                </>
                            :   <span className="inline-block">{formatPrice(currentProduct.price, 'USD')}</span>
                        }
                    </h4>
                </div>
                <div className={`${isInCheckout ? 'p-5 w-36 lg:pr-3 lg:w-28' : ''} p-5 pt-0 w-full flex flex-col justify-center items-start md:pt-5 md:w-36 md:justify-center md:items-center`}>
                    <div className="flex justify-center items-center">
                        <button className="h-7 w-7 border border-gray-300 rounded-sm flex justify-center items-center text-xl" type="button" onClick={handleAmountClick} data-action="subtract">-</button>
                        <input type="text" className="w-8 h-7 text-center border border-gray-300 rounded-sm flex justify-center items-center text-sm" value={selectedAmount} onChange={handleAmountChange} onKeyDown={handleAmountChange} />
                        <button className="h-7 w-7 border border-gray-300 rounded-sm flex justify-center items-center text-xl" type="button" onClick={handleAmountClick} data-action="add">+</button>    
                    </div>
                    <button className="text-xs mt-3" onClick={handleRemoveItem}>Remove</button>
                </div>
                <div className={`${isInCheckout ? 'p-5 w-36 lg:pl-3 lg:w-32' : ''} p-5 w-full hidden md:w-36 md:justify-center md:items-center md:flex`}>
                    <h2 className="text-sm">
                        {currentProduct?.salePercent > 0 
                            ? formatPrice((currentProduct.price - (currentProduct.price * (currentProduct.salePercent / 100))) * selectedAmount, 'USD')
                            : formatPrice((currentProduct.price * selectedAmount), 'USD')
                        }
                    </h2>
                </div>  
            </div>
        </div>
    )
}
