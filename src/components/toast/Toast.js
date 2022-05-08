import React, { useEffect, useState, useRef } from 'react'
import { capitalize } from '../../helper'
import useTimeout from '../../hooks/useTimeout'

export default function Toast(props) {
    const {
        name,
        imageURL,
        selectedAmount, 
        selectedSize,
        selectedColor,
        duration = 5000
    } = props

    const [inPage, setInPage] = useState(false)
    const [shouldHide, setShouldHide] = useState(false)
    useTimeout(() => setInPage(true), 10)
    const { clear } = useTimeout(() => setInPage(false), duration)
    const toastRef = useRef()
    const animationFrameRef = useRef()
    const lastTimeRef = useRef()
    const visibleTime = useRef(0)

    const handleTransitionEnd = () => {
        if (inPage) return
        setShouldHide(true)
    }

    const handleToastClick = () => {
        clear()
        setInPage(false)
    }

    useEffect(() => {
        if (inPage && !shouldHide) {
            const progressBar = (time) => {
                if (!lastTimeRef.current) {
                    lastTimeRef.current = time
                    animationFrameRef.current = requestAnimationFrame(progressBar)
                }

                visibleTime.current += time - lastTimeRef.current
                toastRef.current.style.setProperty('--progress', 1 - visibleTime.current / duration)
                lastTimeRef.current = time
                animationFrameRef.current = requestAnimationFrame(progressBar)
            }

            animationFrameRef.current = requestAnimationFrame(progressBar)
        } else {
            cancelAnimationFrame(animationFrameRef.current)
        } 

        return () => cancelAnimationFrame(animationFrameRef.current)

    }, [inPage, shouldHide])
    
    return (
        <div 
            className={`${inPage ? 'translate-x-0' : 'translate-x-96'} ${shouldHide && 'hidden'} h-max w-80 bg-gray-100 rounded-sm m-4 shadow-lg transition transform duration-700 relative overflow-hidden toast`} 
            onTransitionEnd={handleTransitionEnd}
            onClick={handleToastClick}    
            ref={toastRef}
        >
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
