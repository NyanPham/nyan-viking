import React from 'react'
import bootImage from '../assets/boot.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

const COLOR_MAP = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    brown: 'bg-brown-500'
}

export default function ProductPreview(product) {
    const {
        id,
        imageURL,
        name,
        description,
        price,
        colors,
        tags,
        categories,
        sizes,
        is_top_pick,
        salePercent
    } = product

    return (
        <div className="px-4 py-3 card w-56 h-72 bg-white cursor-pointer relative overflow-clip group">
            <div className="flex justify-between items-start py-2 px-3 absolute top-0 left-0 w-full">
                <div>
                    {salePercent > 0   
                        ? (
                            <div className="relative">
                                <FontAwesomeIcon icon={faBookmark} className="text-5xl text-emerald-300" />
                                <span className="font-bold text-sm absolute top-1/2 left-1/2 -translate-y-2/3 -translate-x-1/2 leading-4 text-center text-sky-900">{salePercent}% off</span>
                            </div>
                        )
                        : ''
                    }
                </div>
                <div className="flex flex-col gap-2">
                    {colors.map((color, index) => {
                        const backgroundColor = COLOR_MAP[color]
                        return <div className={`w-3 h-3 ${backgroundColor}`} key={`color_${backgroundColor}_${index}`}/>
                    })}
                </div>
            </div>
            <div className="mt-7 flex flex-col justify-between items-center">
                <div className="w-36 h-36">
                    <img src={bootImage} alt={name} className="max-w-full max-h-full" />
                </div>
                <div className="w-full">
                    <h3 className="text-center text-gray-900 text-xl font-semibold">
                        {name}
                    </h3>
                    <p className="text-center text-gray-900 italic text-md">
                        {description}
                    </p>
                    <h3 className="text-xl text-center">${price}</h3>
                </div>
            </div>
            <div className="absolute inset-0 bg-transparent flex justify-center items-center pointer-events-none group-hover:bg-sky-900/30 group-hover:pointer-events-auto transform transition duration-500">
                <button className="px-5 py-3 bg-white rounded-sm -rotate-180 scale-0 group-hover:scale-100 group-hover:rotate-0 transform transition duration-500">Read Details</button>
            </div>
        </div>
    )
}
