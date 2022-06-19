import { useEffect, useRef } from "react";

export default function useEventListener(type, callback, element = document) {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const handler = (e) => callbackRef.current(e);
        element.addEventListener(type, handler);

        return () => {
            element.removeEventListener(type, handler);
        };
    }, [type, callbackRef.current, element]);
}
