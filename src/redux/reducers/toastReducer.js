import ACTIONS from "../actions/toastAction"

export default function toastReducer(state = [], { type, payload }) {
    switch (type) {
        case ACTIONS.ADD_TOAST: 
            return [...state, {...payload.toast, toastId: payload.toastId }]
        case ACTIONS.DELETE_TOAST:
            return state.filter(toast => toast.toastId !== payload.toastId)
        default:
            return state
    }
} 