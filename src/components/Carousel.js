import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

export default function Carousel({ children, type = 'horizontal', itemsToShow = 2, gapBetweenItems = 4, navigation = true }) {
    const itemWidth = `w-1/${itemsToShow}`
    const gap = `gap-${gapBetweenItems}`
    const totalSteps = Math.ceil(children.length / itemsToShow)

    const [currentStep, setCurrentStep] = useState(1)

    function handleBackward() {
        setCurrentStep(prevStep => {
            return prevStep - 1 < 1 ? totalSteps : prevStep - 1
        })
    }

    function handleForward() {
        setCurrentStep(prevStep => {
            return prevStep + 1 > totalSteps ? 1 : prevStep + 1
        })
    }

    console.log(currentStep)
    return (
        <div className="relative overflow-hidden w-full h-full">
            <div className={`${type === 'horizontal' ? 'snap-x flex-row px-3 py-4' : 'snap-y flex-col py-3 px-4'} ${gap} snap-mandatory w-max h-full flex justify-start items-center`}>
                {navigation && <div className="absolute top-1/2 left-2 -translate-y-1/2" onClick={handleBackward}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </div>}
                {children.map((child, index) => (
                    <div key={`carousel_item_${index}`} className={`${itemWidth} snap-end`}>{child}</div>
                ))}
                {navigation && <div className="absolute top-1/2 right-2 -translate-y-1/2" onClick={handleForward}>
                    <FontAwesomeIcon icon={faAngleRight} />
                </div>}
            </div> 
        </div>
    )
}
