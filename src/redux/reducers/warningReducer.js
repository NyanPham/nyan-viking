import ACTIONS from "../actions/warningActions"

export default function warningReducer(state = null, { type, payload }) {
    switch (type) {
        case ACTIONS.SHOW_WARNING:
            return payload.content
        case ACTIONS.STOP_WARNING:
            return null
        default: 
            return state
    }
}