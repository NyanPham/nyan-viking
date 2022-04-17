import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { shuffleItems } from '../../helper';

import ProductPreview from './ProductPreview';

export default function ProductShowcase(props) {
    const {
        category, 
        collections, 
        tags, 
        numberToShow = null, 
        hasButton = false, 
        buttonText = 'Shop Now' 
    } = props
    
    const [productsToShow, setProductsToShow] = useState([])
    const products = useSelector(state => state.productStatus.products)

    useEffect(() => {
        let targetedProducts = products
        
        if (tags) {
            targetedProducts = targetedProducts.filter(product => {
                return product.tags.some(tag => {
                    return tags.includes(tag)
                })
            })
        }

        if (category) {
            targetedProducts = targetedProducts.filter(product => product.category === category)
        }

        if (collections) {
            targetedProducts =  targetedProducts.filter(product => {
                return product.collections.some(collection => {
                    return collections.includes(collection)
                })
            })
        }
        
        if (numberToShow != null) {
            targetedProducts = shuffleItems(targetedProducts)
            targetedProducts = targetedProducts.slice(0, numberToShow)
        }

        setProductsToShow(targetedProducts)
    }, [products])

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
