import React from 'react'

export default function ImageGridCell({image, title, description}) {
    return (
        <div className='relative w-full h-full'>
            <img src={image} alt={title} className="absolute inset-0 object-cover" />
        </div>
    )
}
