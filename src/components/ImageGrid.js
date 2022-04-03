import React from 'react'

export default function ImageGrid() {
    return (
        <div className="grid grid-cols-4 grid-rows-2 w-full h-96">
            <div className="col-span-2 row-span-2 bg-gray-500"></div>
            <div className="row-span-2 bg-green-300"></div>
            <div className="bg-sky-900"></div>
            <div className="bg-gray-500"></div>
        </div>
    )
}
