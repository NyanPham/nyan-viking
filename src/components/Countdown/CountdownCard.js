import React, { useEffect, useState, useRef } from 'react'

export default function CountdownCard({ previousNumber, newNumber, count }) {
    const [topFlipped, setTopFlipped] = useState(false)
    const [bottomFlipped, setBottomFlipped] = useState(false)
    const lastRenderedNumber = useRef()
    const bottomFlipRef = useRef()

    const handleTopFlipStart = () => {
        bottomFlipRef.current.style.visibility = 'visible'
    }

    const handleTopFlipEnd = () => {
        setTopFlipped(true)
    }

    const handleBottomFlipEnd = (e) => {
        setBottomFlipped(true)
        lastRenderedNumber.current = newNumber 

        setTimeout(() => {
            bottomFlipRef.current.style.visibility = 'hidden'
        }, 150)

    }
    
    useEffect(() => {
        if (lastRenderedNumber.current === newNumber) return

        setTopFlipped(false)
        setBottomFlipped(false)
    }, [count])

    return (
        <div className="flip-card relative h-12 w-8">
            <div className="w-full h-1/2 pt-6 overflow-hidden absolute top-0 flex justify-center items-center shadow-lg rounded-sm bg-gray-100 text-red-500 text-2xl border-b border-gray-900/10">{newNumber}</div>
            <div className="w-full h-1/2 pb-6 overflow-hidden absolute bottom-0 flex justify-center items-center shadow-lg rounded-sm bg-gray-300 text-red-500 text-2xl">{bottomFlipped ? newNumber : previousNumber }</div>
            <div className={`${topFlipped ? "" : "animate-flipTop"} origin-bottom w-full h-1/2 pt-6 overflow-hidden absolute top-0 flex justify-center items-center rounded-sm bg-gray-100 text-red-500 text-2xl border-b border-gray-900/10`} onAnimationStart={handleTopFlipStart} onAnimationEnd={handleTopFlipEnd}>{topFlipped ? newNumber : previousNumber }</div>
            <div className={`${bottomFlipped ? "rotate-x-0" : "animate-flipBottom rotate-x-90"} origin-top w-full h-1/2 pb-6 overflow-hidden absolute bottom-0 flex justify-center items-center rounded-sm bg-gray-300 text-red-500 text-2xl`} onAnimationEnd={(handleBottomFlipEnd)} ref={bottomFlipRef}>{ newNumber }</div>
        </div>
    )
}
