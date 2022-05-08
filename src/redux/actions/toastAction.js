const ACTIONS = {
    ADD_TOAST: 'add-toast',
    DELETE_TOAST: 'delete-toast',
}

export function addToast(toast) {
    const toastId = Date.now().toString() + Math.random().toString()
    return {
        type: ACTIONS.ADD_TOAST,
        payload: {
            toast,
            toastId
        }
    }
}

export function deleteToast(toastId) {
    return {   
        type: ACTIONS.DELETE_TOAST,
        payload: {
            toastId
        }
    }
}

export default ACTIONS