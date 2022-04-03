import React from 'react'

export default function ImageGridCell({image, title, description}) {
    return (
        <div className='relative w-full h-full py-3 px-5 z-10'>
            <img src={image} alt={title} className="absolute inset-0 object-cover object-bottom w-full h-full -z-10" />
            <h3 className="text-xl text-emerald-500 italic font-semibold">{title}</h3>
            <p className="text-2xl text-white font-semibold italic">{description}</p>
        </div>
    )
}
