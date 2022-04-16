import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export const COLOR_MAP = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    brown: 'bg-amber-700',
    gray: 'bg-gray-500',
    black: 'bg-neutral-900',
    green: 'bg-green-500',
    sky: 'bg-sky-500',
    darkblue: 'bg-blue-700',
    amber: 'bg-amber-500',
}

export default function ProductPreview(product) {
    const {
        id,
        code,
        imageURL,
        title,
        description,
        price,
        colors,
        tags,
        categories,
        sizes,
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
            <div className="flex flex-col justify-between items-center h-full">
                <div className="w-32 h-32 mt-5 relative">
                    <img src={imageURL} alt={title} className="max-w-full max-h-full object-cover object-center" />
                </div>
                <div className="w-full">
                    <h3 className="text-center text-gray-900 text-lg font-semibold">
                        {title}
                    </h3>
                    <p className="text-center text-gray-900 italic text-base w-full truncate">
                        {description}
                    </p>
                    <h3 className="text-lg text-center">${price}</h3>
                </div>
            </div>
            <div className="absolute inset-0 bg-transparent flex justify-center items-center pointer-events-none group-hover:bg-sky-900/30 group-hover:pointer-events-auto transform transition duration-500">
                <Link to={`/product/${id}`} className="px-5 py-3 bg-white rounded-sm -rotate-180 scale-0 group-hover:scale-100 group-hover:rotate-0 transform transition duration-500">Read Details</Link>
            </div>
        </div>
    )
}
