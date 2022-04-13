import ACTIONS from "../actions/userActions";
import { capitalize } from '../../helper'

const initialState = {
    currentUser: null,
    loading: false,
    error: '',
    message: '',
    errors: [],
    messages: [],
    accountConfirmed: false
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
        case ACTIONS.USER_UPDATE_START:
        case ACTIONS.USER_CONFIRM_ACCOUNT_START:
            return {
                ...state,
                loading: true,
                message: '',
                error: '',
                errors: [],
                messages: [],
                accountConfirmed: false
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
        case ACTIONS.USER_CONFIRM_ACCOUNT_SUCCESS: 
            return {
                ...state,
                loading: false,
                accountConfirmed: true
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
        case ACTIONS.USER_CONFIRM_ACCOUNT_FAIL: 
            return {
                ...state,
                loading: false,
                error: 'Failed to authorize you to update the profile. Check your account email address and password then try again.'
            }
        case ACTIONS.RESET_ERROR_AND_MESSAGE:
            return {
                ...state,
                error: '',
                message: ''
            }
        case ACTIONS.USER_UPDATE_SUCCESS: 
            return {
                ...state,
                loading: false,
                message: 'Your profile has been updated',
            }
        case ACTIONS.USER_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: "Failed to update your profile"
            }
        case ACTIONS.SET_UPDATE_ERROR:
            return {
                ...state,
                errors: [...state.errors, `Failed to update ${payload.field}`]
            }
        case ACTIONS.SET_UPDATE_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, `${capitalize(payload.field)} has been updated`]
            }
        default: 
            return state
    }
}