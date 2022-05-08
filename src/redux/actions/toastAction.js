const ACTIONS = {
    ADD_TOAST: 'add-toast',
    DELETE_TOAST: 'delete-toast',
}

export function addToast(toast) {
    const toastId = Date.now().toString()
    console.log(toastId)
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

    }
}

export default ACTIONS