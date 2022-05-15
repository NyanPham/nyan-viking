import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import useStateWithValidation from '../../hooks/useStateWithValidation'
import ProductControl from '../Product/ProductControl'
import { formatPrice } from '../../helper'
import useCartTotal from '../../hooks/useCartTotal'
import { Link } from 'react-router-dom'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Checkout() {
    const cartItems = useSelector(state => state.cartStatus.cartItems)
    const [name, setName, isValidName, nameError] = useStateWithValidation((name) => name.length > 7 && name.length < 20, "", 'Name must be between 7 and 20 characters')
    const [email, setEmail, isValidEmail, emailError] = useStateWithValidation((email) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email), '', 'Invalid Email')
    const [phone, setPhone, isValidPhone, phoneError] = useStateWithValidation((phone) => /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(phone), '', "Invalid Phone Number")
    const [address, setAddress, isValidAddress, addressError] = useStateWithValidation((address) => address.length > 10 && address.length < 50, "", "The address must be between 10 and 50 characters.")
    const [isSubmit, setIsSubmit] = useState(false)
    const [paytMethod, setPayMethod] = useState('card')
    const total = useCartTotal()

    function handleCheckoutFormSubmit(e) {
        e.preventDefault()
        setIsSubmit(true)
    }

    return (
        <div className="flex flex-col py-7 px-12 gap-44 top-auto lg:flex-row lg:gap-12">
            <div className="w-full h-96 lg:w-1/2 lg:sticky lg:top-0 lg:left-0">
                <h1 className="text-2xl text-left font-semibold mt-5 inline-block">Checkout</h1>
                <h3 className="text-left inline-block ml-2">
                    (
                        <span className="font-semibold underline underline-offset-1 decoration-2 decoration-gray-900 text-gray-900">{cartItems.length}</span>
                        &nbsp;{cartItems.length === 1 ? 'item is' : 'items are'}&nbsp;in your cart 
                    )
                </h3>
                <form className="w-full mt-7" >
                    <div className="form-group relative">
                        <label htmlFor="name" className="form-label text-gray-500">Your Name:</label>
                        <input className="form-input py-2 border border-gray-500 rounded-md mt-1 text-gray-700 focus:border focus:ring-1 focus:ring-sky-500" type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        {isSubmit && nameError && <span className="error-alert bg-transparent absolute -bottom-12">{nameError}</span>}
                    </div>
                    <div className="flex flex-row gap-5 mt-7">
                        <div className="form-group grow relative">
                            <label htmlFor="email" className="form-label text-gray-500">Your Email:</label>
                            <input className="form-input py-2  border border-gray-500 rounded-md mt-1 text-gray-700 focus:border focus:ring-1 focus:ring-sky-500" type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            {isSubmit && emailError && <span className="error-alert bg-transparent absolute -bottom-12">{emailError}</span>}
                        </div>
                        <div className="form-group grow relative">
                            <label htmlFor="phone" className="form-label text-gray-500">Your Number:</label>
                            <input className="form-input py-2  border border-gray-500 rounded-md mt-1 text-gray-700 focus:border focus:ring-1 focus:ring-sky-500" type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            {isSubmit && phoneError && <span className="error-alert bg-transparent absolute -bottom-12">{phoneError}</span>}
                        </div>
                    </div>
                    <div className="form-group mt-7 relative">
                        <label htmlFor="address" className="form-label text-gray-500">Your Address:</label>
                        <input className="form-input py-2  border border-gray-500 rounded-md mt-1 text-gray-700 focus:border focus:ring-1 focus:ring-sky-500" type="text" name="address" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                        {isSubmit && addressError && <span className="error-alert bg-transparent absolute -bottom-12">{addressError}</span>}
                    </div>
                    <div className="form-group mt-7">
                        <label htmlFor="pay-method" className="form-label text-gray-500">Pay Method:</label>
                        <select id="pay-method" name="pay-method" value={paytMethod} onChange={(e) => setPayMethod(e.target.value)} className="form-input py-2  border border-gray-500 rounded-md mt-1 text-gray-700 focus:border focus:ring-1 focus:ring-sky-500">
                            <option value="card">Card</option>
                            <option value="cod">COD</option>
                        </select>
                    </div>
                    {paytMethod === 'card' && <div></div>}
                    <Link to="/cart" className="inline-block mt-7 group hover:text-sky-700">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-3 group-hover:-translate-x-1 transform transition"/>
                        Back To Cart
                    </Link>
                </form>
            </div>
            <div className="w-full space-y-4 lg:w-1/2">
                {cartItems.map((item, index) => (
                    <ProductControl key={`product_control_${index}`} {...item}/>
                ))}
                <div className="flex justify-between items-center mt-5 relative after:left-0 after:w-full after:h-px after:-bottom-5 after:absolute after:bg-gray-100">
                    <h3 className="text-gray-700 font-semibold uppercase">Gross Total:</h3>
                    <p className="text-gray-700 font-semibold">{formatPrice(total, 'USD')}</p>
                </div>
                <button className="block mt-10 submit-btn" onClick={handleCheckoutFormSubmit}>Own now</button>
            </div>
        </div>
    )
}
