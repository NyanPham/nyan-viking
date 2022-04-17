import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatPrice } from '../../helper'
import { updateCartItemAmount } from '../../redux/actions/cartActions'

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
        
    }

    return (
        <div className="w-full flex border border-gray-200">
            <div className="w-24 p-5 pr-0">
                <a className="w-full p-0">
                    <img src={imageURL} alt={title} className="max-w-full max-h-full object-cover object-center" />
                </a>
            </div>
            <div className="p-5 col-span-2 grow">
                <h2>{title}</h2>
                <h4 className="text-sm capitalize">Color: {selectedColor}</h4>
                <h4 className="text-sm uppercase">Size: {selectedSize}</h4>
                <h4 className="text-sm">
                    {currentProduct?.salePercent > 0
                        ?
                            <>
                                <span className="line-through text-xs">{formatPrice(currentProduct.price, 'USD')}</span>
                                <span className="ml-2">{formatPrice(currentProduct.price - (currentProduct.price * (currentProduct.salePercent / 100)), 'USD')}</span>
                            </>
                        :   formatPrice(currentProduct.price, 'USD')
                    }
                </h4>
            </div>
            <div className="p-5 w-36 flex flex-col justify-center items-center">
                <div className="flex justify-center items-center">
                    <button className="h-7 w-7 border border-gray-300 rounded-sm flex justify-center items-center text-xl" type="button" onClick={handleAmountClick} data-action="subtract">-</button>
                    <input type="text" className="w-8 h-7 text-center border border-gray-300 rounded-sm flex justify-center items-center text-base" value={selectedAmount} onChange={handleAmountChange} onKeyDown={handleAmountChange} />
                    <button className="h-7 w-7 border border-gray-300 rounded-sm flex justify-center items-center text-xl" type="button" onClick={handleAmountClick} data-action="add">+</button>    
                </div>
                <button className="text-xs mt-3" onClick={handleRemoveItem}>Remove</button>
            </div>
            <div className="p-5 w-36 flex justify-center items-center">
                <h2 className="text-sm">
                    {currentProduct?.salePercent > 0 
                        ? formatPrice((currentProduct.price - (currentProduct.price * (currentProduct.salePercent / 100))) * selectedAmount, 'USD')
                        : formatPrice((currentProduct.price * selectedAmount), 'USD')
                    }
                </h2>
            </div>
        </div>
    )
}
