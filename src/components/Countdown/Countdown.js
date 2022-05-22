import React, { useState } from 'react'
import useCountDown from '../../hooks/useCountdown'
import usePrevious from '../../hooks/usePrevious'
import CountdownCard from './CountdownCard'

const initialCountdown = {
    seconds: 0,
    minutes: 0,
    hours: 0
}

export default function Countdown({ toDate }) {
    const [formatedCountdown, setFormatedCountdown] = useState(initialCountdown)
    const previousFormatedCountdown = usePrevious(formatedCountdown) || initialCountdown
    const [count, setCount] = useState(0)

    const calculateTimeBetweenDates = (currentDate, toDate) => {
        return Math.ceil((toDate - currentDate) / 1000) 
    }

    useCountDown((time) => {setFormatedCountdown(time); setCount(c => c + 1) }, 250, calculateTimeBetweenDates, toDate)

    return (
        <div className="flex gap-5 mt-7">   
            <div className="flex flex-col justify-center items-center">
                <h3 className="text-lg text-emerald-500">Hours</h3>
                <div className="flex flex-row gap-2">
                    <CountdownCard previousNumber={Math.floor(previousFormatedCountdown.hours / 10)} newNumber={Math.floor(formatedCountdown.hours / 10)} count={count}/>
                    <CountdownCard previousNumber={previousFormatedCountdown.hours % 10 } newNumber={formatedCountdown.hours % 10} count={count}/>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h3 className="text-lg text-emerald-500">Minutes</h3>
                <div className="flex flex-row gap-2">
                    <CountdownCard previousNumber={Math.floor(previousFormatedCountdown.minutes / 10)} newNumber={Math.floor(formatedCountdown.minutes / 10)} count={count}/>
                    <CountdownCard previousNumber={previousFormatedCountdown.minutes % 10 } newNumber={formatedCountdown.minutes % 10} count={count}/>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h3 className="text-lg text-emerald-500">Seconds</h3>
                <div className="flex flex-row gap-2">
                    <CountdownCard previousNumber={Math.floor(previousFormatedCountdown.seconds / 10)} newNumber={Math.floor(formatedCountdown.seconds / 10)} count={count}/>
                    <CountdownCard previousNumber={previousFormatedCountdown.seconds % 10 } newNumber={formatedCountdown.seconds % 10} count={count}/>
                </div>
            </div>
        </div>
    )
}
