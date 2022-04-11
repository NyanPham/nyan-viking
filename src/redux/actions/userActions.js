import { auth } from "../../firebase"
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth"

const ACTIONS = {
    SET_USER: 'set-user',
    REMOVE_USER: 'remove-user',

    USER_SIGNUP_START: 'user-signup-start',
    USER_SIGNUP_FAIL: 'user-signup-fail',
    USER_SIGNUP_SUCCESS: 'user-signup-success',

    USER_LOGIN_START: 'user-login-start',
    USER_LOGIN_FAIL: 'user-login-fail',
    USER_LOGIN_SUCCESS: 'user-login-success',

    USER_LOGOUT_START: 'user-logout-start',
    USER_LOGOUT_FAIL: 'user-logout-fail',
    USER_LOGOUT_SUCCESS: 'user-logout-success',

    USER_RESET_PASSWORD_START: 'user-reset-password-start',
    USER_RESET_PASSWORD_FAIL: 'user-reset-password-fail',
    USER_RESET_PASSWORD_SUCCESS: 'user-reset-password-sucess',

    RESET_ERROR_AND_MESSAGE: 'reset-error-and-message'
}

export function setUser(user) {
    return {
        type: ACTIONS.SET_USER,
        payload: {
            currentUser: user
        }
    }
}

export function removeUser() {
    return {
        type: ACTIONS.REMOVE_USER
    }
}

export function signUp(email, password) {
    return async (dispatch) => {
        try {
            dispatch({ type: ACTIONS.USER_SIGNUP_START })
            await createUserWithEmailAndPassword(auth, email, password)
            dispatch({ type: ACTIONS.USER_SIGNUP_SUCCESS })
        } catch {
            dispatch({ type:ACTIONS.USER_SIGNUP_FAIL })
        }
    }
}

export function logIn(email, password) {
    return async (dispatch) => {
        try {
            dispatch({ type: ACTIONS.USER_LOGIN_START })
            await signInWithEmailAndPassword(auth, email, password)
            dispatch({ type: ACTIONS.USER_LOGIN_SUCCESS })
        } catch {
            dispatch({ type:ACTIONS.USER_LOGIN_FAIL })
        }
    }
}

export function logOut() {
    return async (dispatch) => {
        try {
            dispatch({ type: ACTIONS.USER_LOGOUT_START })
            await signOut(auth)
            dispatch({ type: ACTIONS.USER_LOGOUT_SUCCESS })
        } catch {
            dispatch({ type: ACTIONS.USER_LOGOUT_FAIL })
        }
    }
}

export function resetPassword(email) {
    return async (dispatch) => {
        try {
            dispatch({ type: ACTIONS.USER_RESET_PASSWORD_START })
            await sendPasswordResetEmail(auth, email)
            dispatch({ type: ACTIONS.USER_RESET_PASSWORD_SUCCESS })
        } catch {
            dispatch({ type: ACTIONS.USER_RESET_PASSWORD_FAIL })
        }
    }
}

export function resetErrorsAndMessages() {
    return {
        type: ACTIONS.RESET_ERROR_AND_MESSAGE
    }
}

export default ACTIONS