import React, { createContext, useContext } from 'react'

import { useLocalStorage } from "../hooks/useStorage";
const RecentlyViewedContext = createContext()
export const useRecentlyViewed = () => useContext(RecentlyViewedContext)

export const LOCAL_STORAGE_RECENTLY_VIEWED_KEY = 'nyan_viking-recently-viewed'

export default function RecentlyViewedContextProvider({ children }) {
    const [recentlyViewed, setRecentlyViewed] = useLocalStorage(LOCAL_STORAGE_RECENTLY_VIEWED_KEY, [])
    
    return (
        <RecentlyViewedContext.Provider value={{ recentlyViewed, setRecentlyViewed }}>
            { children }
        </RecentlyViewedContext.Provider>
    )
}