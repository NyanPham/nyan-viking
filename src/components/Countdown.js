import React, { useState } from 'react'
import useCountDown from '../hooks/useCountdown'
import usePrevious from '../hooks/usePrevious'

const initialCountdown = {
    seconds: 0,
    minutes: 0,
    hours: 0
}

export default function Countdown({ toDate }) {
    const [formatedCountdown, setFormatedCountdown] = useState(initialCountdown)
    const [topFlipped, setTopFlipped] = useState(false)
    const [bottomFlipped, setBottomFlipped] = useState(false)

    const previousFormatedCountdown = usePrevious(formatedCountdown) || initialCountdown

    const calculateTimeBetweenDates = (currentDate, toDate) => {
        return Math.ceil((toDate - currentDate) / 1000) 
    }

    useCountDown((time) => {setFormatedCountdown(time); setTopFlipped(false); setBottomFlipped(false) }, 250, calculateTimeBetweenDates, toDate)
    

    const handleTopFlipEnd = () => {
        setTopFlipped(true)
    }
    
    const handleBottomFlipEnd = () => {
        setBottomFlipped(true)
    }
    
    return (
        <div className="flex gap-5 mt-7">   
            <div className="flex flex-col justify-center items-center">
                <h3 className="text-lg text-emerald-500">Hours</h3>
                <div className="flex flex-row gap-2 relative">
                    <div className="w-8 h-12 flex justify-center items-center shadow-lg rounded-sm bg-gray-100 text-red-500 text-2xl">{Math.floor(previousFormatedCountdown.hours / 10)}</div>
                    <div className="w-8 h-12 flex justify-center items-center shadow-lg rounded-sm bg-gray-100 text-red-500 text-2xl">{previousFormatedCountdown.hours % 10}</div>
                   
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h3 className="text-lg text-emerald-500">Minutes</h3>
                <div className="flex flex-row gap-2">
                    <div className="w-8 h-12 flex justify-center items-center shadow-lg rounded-sm bg-gray-100 text-red-500 text-2xl">{Math.floor(previousFormatedCountdown.minutes / 10)}</div>
                    <div className="w-8 h-12 flex justify-center items-center shadow-lg rounded-sm bg-gray-100 text-red-500 text-2xl">{previousFormatedCountdown.minutes % 10}</div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h3 className="text-lg text-emerald-500">Seconds</h3>
                <div className="flex flex-row gap-2">
                    <div className="w-8 h-12 flex justify-center items-center shadow-lg rounded-sm bg-gray-100 text-red-500 text-2xl">{Math.floor(previousFormatedCountdown.seconds / 10)}</div>
                    <div className="flip-card relative h-12 w-8">
                        <div className="w-full h-1/2 pt-6 overflow-hidden absolute top-0 flex justify-center items-center shadow-lg rounded-sm bg-gray-100 text-red-500 text-2xl">{formatedCountdown.seconds % 10}</div>
                        <div className="w-full h-1/2 pb-6 overflow-hidden absolute bottom-0 flex justify-center items-center shadow-lg rounded-sm bg-gray-100 text-red-500 text-2xl">{bottomFlipped ? formatedCountdown.seconds % 10 : previousFormatedCountdown.seconds % 10}</div>
                        <div className={`${topFlipped ? "" : "animate-flipTop"} origin-bottom w-full h-1/2 pt-6 overflow-hidden absolute top-0 flex justify-center items-center shadow-lg rounded-sm bg-gray-100 text-red-500 text-2xl`} onAnimationEnd={handleTopFlipEnd}>{topFlipped ? formatedCountdown.seconds % 10 : previousFormatedCountdown.seconds % 10}</div>
                        <div className={`${bottomFlipped ? "rotate-x-0" : "animate-flipBottom rotate-x-90"} origin-top w-full h-1/2 pb-6 overflow-hidden absolute bottom-0 flex justify-center items-center shadow-lg rounded-sm bg-gray-100 text-red-500 text-2xl`} onAnimationEnd={(handleBottomFlipEnd)}>{formatedCountdown.seconds % 10 }</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
