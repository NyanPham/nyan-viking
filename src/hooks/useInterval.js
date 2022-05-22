import { useCallback, useEffect, useRef } from "react";

export default function useInterval(callback, interval) {
    const callbackRef = useRef(callback)
    const intervalRef = useRef()

    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    const set = useCallback(() => {
        intervalRef.current = setInterval(() => callbackRef.current(), interval)
    }, [interval])

    const clear = useCallback(() => {
        intervalRef.current && clearInterval(intervalRef.current)
    }, [])

    useEffect(() => {
        set()
        return () => clear()
    }, [set, clear])
    
    return { set, clear }
}