import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

export default function Warning({ content, warningShown, closeWarning, handleWarningTransitionEnd }) {
    return (
        <div className={`${warningShown ? 'translate-y-0' : 'translate-y-full'} w-full h-12 bg-red-400 fixed bottom-0 left-0 flex flex-row justify-between items-center transform transition z-10`} onTransitionEnd={handleWarningTransitionEnd}>
            <div className="px-24 py-3 flex gap-3 items-center">
                <FontAwesomeIcon icon={faTriangleExclamation} className="text-red-800 text-2xl" />
                <span className="text-red-800 font-semibold">{content}</span>
            </div>
            <button className="text-red-800 text-4xl w-12 h-full bg-red-600 block font-thin hover:bg-red-500 active:bg-red-700" onClick={closeWarning}>&times;</button>
        </div>
    )
}


