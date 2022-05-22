import { useEffect, useRef } from 'react'
import isEqual from 'lodash/isEqual';

export default function usePrevious(value) {
    const currentValueRef = useRef(value)
    const previousValueRef = useRef()

    if (!isEqual(currentValueRef.current, value)) {
        previousValueRef.current = currentValueRef.current
        currentValueRef.current = value
    }

    return previousValueRef.current
}