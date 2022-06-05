import { useState, useEffect } from 'react'

export default function useOnScreenOnce(ref, rootMargin = '0px') {
    const [isVisible, setIsVisible] = useState(false) 

    useEffect(() => {
        if (ref.current == null) return 
        const observer = new IntersectionObserver(([entry], observer) => {
            if (entry.isIntersecting) {
                setIsVisible(true)
                observer.disconnect(entry.target)
            }
        }, { rootMargin })
        
        observer.observe(ref.current)

        return () => {
            if (ref.current == null) return
            observer.disconnect(ref.current)
        }
    }, [ref.current])

    return isVisible
}