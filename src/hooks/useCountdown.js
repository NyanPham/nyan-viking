import { useEffect, useState } from "react";
import { convertMiliToTime } from "../helper";
import useInterval from "./useInterval";

export default function useCountdown(callback, interval, calculateTimeBetweenDates, toDate) {
    const [timeLeft, setTimeLeft] = useState(() => {
        const currentDate = new Date()
        return calculateTimeBetweenDates(currentDate, toDate)
    })

    useInterval(() => {
        const currentDate = new Date()
        const timeBetweenDates = calculateTimeBetweenDates(currentDate, toDate)
        if (timeLeft !== timeBetweenDates) {
            setTimeLeft(timeBetweenDates)
        }
    }, interval)

    useEffect(() => {
        const time = convertMiliToTime(timeLeft)
        callback(time)
    }, [timeLeft])
}
