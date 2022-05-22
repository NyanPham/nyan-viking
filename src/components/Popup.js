import React, { useRef } from 'react'

export default function Popup({ open, title, content, closePopup }) {

    const layerRef = useRef()

    function handlePopupClick(e) {
        if (e.target.closest('[data-popup-container]') != null) return
        closePopup()
    }

    return (
        <div className={`${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} z-20 fixed inset-0 bg-gray-900/90 text-white flex justify-center items-center transition duration-300`} onClick={handlePopupClick}>
            <div className={`${open ? 'translate-x-0' : '-translate-x-5'} py-10 px-12 bg-white text-gray-900 min-w-2xl w-2/3 relative shadow-lg rounded-sm transform transition duration-300`} data-popup-container>
                <h3 className="text-2xl font-semibold text-center">{title}</h3>
                <p className='italic text-lg mt-3'>{content}</p>
                <button className="absolute top-2 right-4 text-2xl font-bold text-gray-900 cursor-pointer" onClick={closePopup}>&times;</button>
            </div>
        </div>
    )
}
