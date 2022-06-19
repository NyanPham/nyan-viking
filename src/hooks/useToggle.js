import { useCallback, useState } from "react";

export default function useToggle(defaultValue) {
    const [value, setValue] = useState(defaultValue)

    const toggleValue = useCallback((newValue) => {
        setValue(prevValue => {
            return typeof newValue === 'boolean' ? newValue : !prevValue
        })
    })
    
    return [value, toggleValue]
} 