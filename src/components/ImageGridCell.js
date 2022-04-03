import React from 'react'

export default function ImageGridCell({image, title, description}) {
    return (
        <div className='relative w-full h-full p-7 z-10 flex flex-col justify-end items-left group'>
            <img src={image} alt={title} className="absolute inset-0 object-cover object-bottom w-full h-full -z-10 bg-blend" />
            <h3 className="text-xl text-emerald-300 italic font-semibold uppercase tracking-wide">{title}</h3>
            <p className="text-2xl text-white font-semibold italic">{description}</p>
            <div className="absolute inset-0 bg-transparent pointer-events-none flex justify-center items-center group-hover:bg-gray-900/50 group-hover:pointer-events-auto cursor-pointer transition transform">
                <button className="text-sky-900 opacity-0 group-hover:opacity-100 transition py-3 px-5 rounded-sm bg-gray-200">Read More</button>
            </div>
        </div>
    )
}
