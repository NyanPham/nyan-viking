import { faStar, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, useLocation } from 'react-router-dom'
import { formatPrice } from '../../helper'
import { COLOR_MAP } from './ProductPreview'
import { addToCart } from '../../redux/actions/cartActions'

export default function ProductDetails() {
    const { productId } = useParams()
    const products = useSelector(state => state.productStatus.products)
    const currentUser = useSelector(state => state.userStatus.currentUser)
    const { loading, error, message } = useSelector(state => state.cartStatus)
    const dispatch = useDispatch()
    const [currentProduct, setCurrentProduct] = useState()
    const [selectedColor, setSelectedColor] = useState()
    const [selectedSize, setSelectedSize] = useState()
    const [selectedAmount, setSelectedAmount] = useState(1)
    const [errors, setErrors] = useState({
        color: '',
        size: '',
        amount: ''
    })

    useEffect(() => {
        const product = products.find(product => product.docId === productId)
        setCurrentProduct(product)
    }, [setCurrentProduct, productId, products])

    useEffect(() => {
        if (selectedColor) setErrors(prevErrors => {
            return {
                ...prevErrors,
                color: ''
            }
        })

        if (selectedSize) setErrors(prevErrors => {
            return {
                ...prevErrors,
                size: ''
            }
        })

        if (selectedAmount) setErrors(prevErrors => {
            return {
                ...prevErrors,
                amount: ''
            }
        })
    }, [selectedColor, selectedSize, selectedAmount, setErrors])

    function handleAmountChange(e) {
        if (e.type === 'keydown') {
            let newValue
            
            if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return 

            if (e.key === 'ArrowUp') newValue = parseInt(selectedAmount) + 1 

            if (e.key === 'ArrowDown') newValue = parseInt(selectedAmount) - 1
            
            if (newValue <= 0) return 
            if (newValue > currentProduct.amountInStock) return
            setSelectedAmount(newValue || 0)
            return 
        }

        if (isNaN(e.target.value)) return
        if (parseInt(e.target.value) <= 0) return
        setSelectedAmount(e.target.value)
    }

    function handleAmountClick(e) {
        const action = e.target.dataset.action
        let newValue
        if (action === 'subtract') newValue = parseInt(selectedAmount) - 1
        if (action === 'add') newValue = parseInt(selectedAmount) + 1

        if (newValue <= 0) return 
        if (newValue > currentProduct.amountInStock) return 
        setSelectedAmount(newValue || 0)
    }

    function handleAddToCart(e) {
        e.preventDefault()
        
        if (!validateBeforeAddToCart()) return
        
        dispatch(addToCart(currentProduct, selectedColor, selectedSize, selectedAmount, currentUser.uid))
    }
    
    function validateBeforeAddToCart() {
        let isValid = true
        
        if (!selectedColor || !selectedSize || !selectedAmount) isValid = false

        if (!selectedColor) setErrors(prevErrors => {
            return {
                ...prevErrors,
                color: 'Please select a color'
            }
        })
        
        if (!selectedSize) setErrors(prevErrors => {
            return {
                ...prevErrors,
                size: 'Please select a size'
            }
        })

        if (!selectedAmount) setErrors(prevErrors => {
            return {
                ...prevErrors,
                amount: 'Please input a valid amount'
            }
        })

        return isValid
    }

    return (
        <section className="py-7 px-12 w-full min-h-screen flex flex-row gap-8">
            <div className="w-3/5 h-96 bg-gray-100/50 rounde-sm flex justify-center items-center">
                <div className="w-2/3 h-2/3 flex justify-center items-center">
                    <img src={currentProduct?.imageURL} alt={currentProduct?.title} className="max-h-full max-w-full object-contain" />
                </div>
            </div>
            <div className="w-2/5">
                <h2 className="text-base font-medium uppercase text-gray-500 tracking-wide">{currentProduct?.code}</h2>
                <h1 className="text-2xl font-semibold uppercase text-gray-900 tracking-wider">{currentProduct?.title}</h1>
                {currentProduct?.salePercent > 0
                    ?   (<div className="flex flex-row gap-5 items-center">
                            <h3 className="text-base font-normal uppercase line-through text-gray-600 tracking-wider mt-5">{currentProduct?.price ? formatPrice(currentProduct.price, 'USD') : 'Free' }</h3>
                            <h3 className="text-xl font-semibold uppercase text-emerald-500 tracking-wider mt-5">{currentProduct?.price ? formatPrice((currentProduct.price - (currentProduct.price * (currentProduct.salePercent / 100))), 'USD') : 'Free' }</h3>
                        </div>
                    )
                    :   (<h3 className="text-xl font-normal uppercase text-gray-600 tracking-wider mt-5">{currentProduct?.price ? formatPrice(currentProduct.price, 'USD') : 'Free' }</h3>)
                }
                <div className="flex flex-row mt-5 gap-5 items-center relative after:content-[''] after:absolute after:-bottom-5 after:left-0 after:w-full after:h-px after:bg-gray-300">
                    {currentProduct?.rating && 
                        (<div className="flex flex-row space-x-1">
                            {Array(currentProduct.rating).fill().map((_, index) => (
                                <FontAwesomeIcon icon={faStar} key={`great_star_${index}`} className="text-gray-900" />
                            ))}
                            {Array(5 - currentProduct.rating).fill().map((_, index) => (
                                <FontAwesomeIcon icon={faStar} key={`star_${index}`} className="text-gray-300" />
                            ))}
                        </div>)
                    }
                    <p className="grow text-gray-900 font-bold cursor-pointer underline underline-offset-1 decoration-2 hover:text-gray-500 transition">Write a review</p>
                    <FontAwesomeIcon icon={faUpload}  className="text-gray-900 p-3 rounded-full bg-gray-200 cursor-pointer hover:bg-gray-100 hover:text-gray-500 transition" /> 
                </div>
                <form className="mt-10" onSubmit={handleAddToCart}>
                    <h3 className="uppercase">Choose your vibe:</h3>
                    <div className="flex flex-row gap-3 mt-3">
                        {currentProduct?.colors.map((color, index) => (
                            <div key={`color_${index}`} className={`${selectedColor === color ? 'after:scale-100' : 'after:scale-0'} relative z-10 w-7 h-7 ${COLOR_MAP[color]} rounded-full inline-block cursor-pointer after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-y-1/2 after:-translate-x-1/2 after:w-9 after:h-9 after:border after:border-gray-900 after:rounded-full after:-z-0 after:transition after:duration-300`} onClick={() => setSelectedColor(color)}></div>
                        ))}
                    </div>
                    <h3 className="mt-5 uppercase">Choose your build:</h3>
                    <div className="flex flex-row gap-3 mt-3">
                        {currentProduct?.sizes.map((size, index) => (
                            <div key={`size_${index}`} className={`${selectedSize === size ? 'bg-gray-900 text-white' : 'text-gray-700'} w-12 h-10 border border-gray-300 flex justify-center items-center text-sm rounded-lg cursor-pointer transition duration-300`} onClick={() => setSelectedSize(size)}>{size}</div>
                        ))}
                    </div>
                    <div className="flex flex-row mt-5">
                        <button className="h-7 w-8 border border-gray-300 rounded-sm flex justify-center items-center text-xl" type="button" onClick={handleAmountClick} data-action="subtract">-</button>
                        <input type="text" className="w-16 h-7 text-center border border-gray-300 rounded-sm flex justify-center items-center text-xl" value={selectedAmount} onChange={handleAmountChange} onKeyDown={handleAmountChange} />
                        <button className="h-7 w-8 border border-gray-300 rounded-sm flex justify-center items-center text-xl" type="button" onClick={handleAmountClick} data-action="add">+</button>
                    </div>
                    <div className="flex flex-row mt-5 gap-2">
                        {currentUser?.uid 
                            ? (
                                <button className="submit-btn" type="submit" disabled={loading || !currentProduct?.amountInStock}>
                                    {currentProduct?.amountInStock > 0 
                                        ? (
                                            loading ? 'Adding' : 'Add'
                                        )
                                        : 'Out Of Stock'
                                    }
                                    {currentProduct?.amountInStock > 0 && (<FontAwesomeIcon icon={faCartShopping} className="ml-2" />)}
                                </button>
                            )
                            : (
                                <Link to="/login" state={{ hasPreviousPage: true }}className="submit-btn" type="button">
                                    {currentProduct?.amountInStock > 0 
                                        ? 'Add'
                                        : 'Out Of Stock'
                                    }
                                    {currentProduct?.amountInStock > 0 && (<FontAwesomeIcon icon={faCartShopping} className="ml-2" />)}
                                </Link>
                            )
                        }
                    </div>
                    {Object.keys(errors).map((key, index) => (
                        <p key={`adding_error_${index}`} className={`${index === 0 ? 'mt-2' : ''} text-sm text-red-600`}>{errors[key]}</p>
                    ))} 
                </form>
            </div>
        </section>
    )
}
