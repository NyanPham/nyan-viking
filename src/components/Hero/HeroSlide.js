import React, { useRef } from 'react'
import useEventListener from '../../hooks/useEventListener'
import useOnScreen from '../../hooks/useOnScreen'

export default function HeroSlide({ slideNumber, title = '', subtitle = '' }) {
    const slideRef = useRef()
    const visible = useOnScreen(slideRef, '0px', '0.5')
    
    const titleAnimation = slideNumber % 2 === 0 ? 'animate-slideFromLeft' : 'animate-slideFromBottom'
    const subtitleAnimation = titleAnimation === 'animate-slideFromLeft' ? 'animate-slideFromLeft200' : 'animate-slideFromBottom200'

    return (
        <div className={`slide-${slideNumber} slide`} ref={slideRef}>
            <div className="absolute top-1/2 left-1/2 text-2xl z-10 -translate-y-1/2 -translate-x-1/2 select-none">
                <h2 className={`${visible ? titleAnimation : 'animate-fadeOut'} opacity-0 uppercase text-3xl font-semibold text-white tracking-wider`}>{title}</h2>
                <h3 className={`${visible ? subtitleAnimation : 'animate-fadeOut'} opacity-0 text-center mt-2 text-white tracking-wide`}>{subtitle}</h3>
            </div>    
        </div>
    )
}
