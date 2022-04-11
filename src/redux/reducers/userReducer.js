import ACTIONS from "../actions/userActions";

const initialState = {
    currentUser: null,
    loading: false,
    error: '',
    message: '',
}

export function userReducer(state = initialState, { type, payload }) {
    switch (type) {
        case ACTIONS.SET_USER:
            return {
                ...state,
                currentUser: payload.currentUser
            }
        case ACTIONS.REMOVE_USER: 
            return {
                ...state,
                currentUser: null
            }
        case ACTIONS.USER_SIGNUP_START:
        case ACTIONS.USER_LOGIN_START:
        case ACTIONS.USER_LOGOUT_START:
        case ACTIONS.USER_RESET_PASSWORD_START:
            return {
                ...state,
                loading: true,
                message: '',
                error: ''
            }
        case ACTIONS.USER_SIGNUP_SUCCESS: 
        case ACTIONS.USER_LOGIN_SUCCESS: 
        case ACTIONS.USER_LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case ACTIONS.USER_RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: 'We have sent you an email to reset your password. Check your inbox for further instruction.'
            }
        case ACTIONS.USER_SIGNUP_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Failed to create account. Please check the email address and password the try again later'
            }
        case ACTIONS.USER_LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Failed to login. Please check the email address and password the try again later'
            }
        case ACTIONS.USER_LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Failed to logout. Please try again later'
            }
        case ACTIONS.USER_RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Failed to reset password. Please check your email address then try again.'
            }
        case ACTIONS.RESET_ERROR_AND_MESSAGE:
            return {
                ...state,
                error: '',
                message: ''
            }
        default: 
            return state
    }
}