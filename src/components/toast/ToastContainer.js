import React from 'react'
import { useSelector } from 'react-redux'
import Toast from './Toast'

export default function ToastContainer() {
    const toasts = useSelector(state => state.toasts)
    return (
        <div className="fixed bottom-0 right-0 z-20">
            {toasts.map((toast, index) => (
                <Toast key={`toast_${index}`} {...toast}/>
            ))}
        </div>
    )
}
