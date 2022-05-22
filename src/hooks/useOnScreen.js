import { useState, useEffect } from 'react'

export default function useOnScreen(ref, rootMargin = '0px') {
    const [isVisible, setIsVisible] = useState(false)
    
    useEffect(() => {
        if (ref.current == null) return
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting)
        }, { rootMargin })
        observer.observe(ref.current)
        
        return () => {
            if (ref.current == null) return
            observer.disconnect(ref.current)
        }
    }, [ref.current])

    return isVisible
}