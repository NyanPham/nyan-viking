import React, { useEffect, useState } from 'react'
import { shuffleItems } from '../../helper';
import { PRODUCTS } from '../App';
import ProductPreview from './ProductPreview';

export default function ProductShowcase({ tags, numberToShow = null, hasButton = false, buttonText = 'Shop Now' }) {
    const [productsToShow, setProductsToShow] = useState([])
    
    useEffect(() => {
        let targetedProducts = PRODUCTS.filter(product => {
            return product.tags.some(tag => {
                return tags.includes(tag)
            })
        })
        
        if (numberToShow != null) {
            targetedProducts = shuffleItems(targetedProducts)
            targetedProducts = targetedProducts.slice(0, numberToShow)
        }

        setProductsToShow(targetedProducts)
    }, [])

    return (
        <>
            <div className="py-7 px-12 w-full flex flex-wrap justify-center items-center gap-12">
                {productsToShow?.map((item, index) => (
                    <ProductPreview {...item} key={`product_shown_${index}`}/>
                ))}
            </div>
            {hasButton && (
                <button className="px-4 py-2 mt-5 border italic border-gray-900 bg-transparent text-gray-900 mx-auto block hover:bg-gray-900 hover:text-gray-200 hover:-translate-y-0.5 transform transition">{buttonText}</button>
            )}
        </>
        
    )
}
