import { useCallback, useRef, useState, useEffect } from "react";

export default function useStateWithValidation(validationFunc, initialValue, errorMessage) {
    const [state, setState] = useState(initialValue)
    const [isValid, setIsValid] = useState(validationFunc(state))
    const [error, setError] = useState()
    const messageRef = useRef(errorMessage)

    const onChange = useCallback((nextState) => {
        const value = typeof nextState === 'function' ? nextState(state) : nextState
        setState(value)
        setIsValid(validationFunc(value))
    }, [state])

    useEffect(() => {
        if (isValid === false) {
            setError(messageRef.current)
        } else {
            setError(null)
        }
    }, [isValid])

    return [state, onChange, isValid, error]
}