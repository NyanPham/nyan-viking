import React, { useState } from 'react'
import { useRecentlyViewed } from '../../contexts/RecentlyViewedContextProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'

export default function RecentlyViewed() {
    const { recentlyViewed, setRecentlyViewed } = useRecentlyViewed()
    const [fullView, setFullView] = useState(false)

    function toggleFullView() {
        
    }

    return (
        <div className={`${recentlyViewed.length > 0 ? '': 'translate-x-full'} ${fullView ? 'w-72' : 'hover:translate-x-0'} fixed top-1/2 -translate-y-1/2 translate-x-full right-0 bg-red z-10 flex flex-col bg-white drop-shadow-xl transition transform`}>
            <h4 className="bg-gray-900 text-gray-200 py-1 text-center text-sm">Recents</h4>
            {fullView === false 
                ? (
                    <div className="p-3 flex flex-col gap-4 z-20">
                        {recentlyViewed.map(item => (
                            <div key={`recently_viewed_${item.title}`} className="w-16 h-16">
                                <img className="max-w-full max-h-full" src={item.imageURL} alt={item.title} />
                            </div>
                        ))}
                    </div>
                )  
                : (
                    <div className="p-3 flex flex-row gap-4 z-20 w-full">
                        {recentlyViewed.map(item => (
                            <div key={`recently_viewed_${item.title}`} className="w-24 h-24">
                                <img className="max-w-full max-h-full" src={item.imageURL} alt={item.title} />
                                <h4>{item.title}</h4>
                                <h4>{item.price}</h4>
                            </div>
                        ))}
                    </div>
                )  
            }
            <button className="p-4 w-10 h-10 bg-gray-900 absolute rounded-full flex justify-center items-center top-1/3 -z-10 -left-1/3" onClick={toggleFullView}>
                <FontAwesomeIcon icon={faAnglesLeft} className="text-xl text-gray-500" />
            </button>
        </div>
    )
}
