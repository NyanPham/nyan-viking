import { useState, useEffect } from 'react'

export default function useOnScreen(ref) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (ref.current == null) return
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting)
        })
        observer.observe(ref.current)

        return () => {
            if (ref.current == null) return
            observer.disconnect(ref.current)
        }
    }, [ref.current])

    return isVisible
}