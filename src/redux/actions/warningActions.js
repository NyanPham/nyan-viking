const ACTIONS = {
    SHOW_WARNING: 'show-warning',
    STOP_WARNING: 'clear-warning'
}

export function showWarning(content) {
    return {
        type: ACTIONS.SHOW_WARNING,
        payload: {
            content
        }
    }
}

export function clearWarning() {
    return {
        type: ACTIONS.STOP_WARNING,
    }
} 

export default ACTIONS