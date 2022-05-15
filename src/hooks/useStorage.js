import { useCallback, useEffect, useState } from 'react'

export function useLocalStorage(key, defaultValue) {
    return useStorage(key, defaultValue, localStorage)
}

export function useSessionStorage(key, defaultValue) {
    return useStorage(key, defaultValue, sessionStorage)
}

function useStorage (key, defaultValue, storageObject) {
    const [value, setValue] = useState(() => {
        const jsonValue = storageObject.getItem(key)
        if (jsonValue != null) return JSON.parse(jsonValue)

        if (typeof defaultValue === 'function') return defaultValue()
        return defaultValue
    })

    const remove = useCallback(() => {
        setValue(null)
    }, [])
    
    useEffect(() => {
        if (value == null) return storageObject.removeItem(key)
        storageObject.setItem(key, JSON.stringify(value))
    }, [value])

    return [value, setValue, remove]
}