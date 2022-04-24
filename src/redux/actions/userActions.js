import { auth, db, storage } from "../../firebase"
import { 
    createUserWithEmailAndPassword, 
    sendPasswordResetEmail,
    signInWithEmailAndPassword, 
    signOut,
    updateEmail,
    updatePassword,
    updateProfile
} from "firebase/auth"

import { addDoc, doc, collection, getDocs, where, query, updateDoc } from 'firebase/firestore'
import { formatDoc } from "../../helper"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

const ACTIONS = {
    SET_USER: 'set-user',
    REMOVE_USER: 'remove-user',
    GET_USER_INFO: 'get-user-info',

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

    USER_UPDATE_START: 'user-update-start',
    USER_UPDATE_FAIL: 'user-update-fail',
    USER_UPDATE_SUCCESS: 'user-update-success',

    USER_UPLOAD_PHOTO_START: 'user-upload-photo-start',
    USER_UPLOAD_PHOTO_FAIL: 'user-upload-photo-fail',
    USER_UPLOAD_PHOTO_SUCCESS: 'user-upload-photo-success',

    USER_CONFIRM_ACCOUNT_START: "user-confirm-account-start",
    USER_CONFIRM_ACCOUNT_FAIL: "user-confirm-account-fail",
    USER_CONFIRM_ACCOUNT_SUCCESS: "user-confirm-account-success",

    SET_UPDATE_ERROR: 'set-update-error',
    SET_UPDATE_MESSAGE: 'set-update-message',

    RESET_ERROR_AND_MESSAGE: 'reset-error-and-message',
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
            await addDoc(collection(db, 'userProfile'), {
                userId: auth.currentUser.uid,
                firstName: '',
                lastName: '',
                address: '',
                phoneNUmber: ''
            })
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

export function confirmAccount(email, password) {
    return async (dispatch) => {
        try {
            dispatch({ type: ACTIONS.USER_CONFIRM_ACCOUNT_START })
            await signInWithEmailAndPassword(auth, email, password)
            dispatch({ type: ACTIONS.USER_CONFIRM_ACCOUNT_SUCCESS })
        } catch {
            dispatch({ type: ACTIONS.USER_CONFIRM_ACCOUNT_FAIL })
        }
    }
}

export function userUpdateProfileInfo(email, password, firstName, lastName, displayName, address, phone, userId) {
    return async (dispatch) => {
        try {
            dispatch({ type: ACTIONS.USER_UPDATE_START })
            const items = []
            
            if (email.changed) {
                items.push({ name: 'email', value: email.changed , promise: updateEmail(auth.currentUser, email.value)})
            }

            if (password.changed) {
                items.push({ name: 'password', value: password.value, promise: updatePassword(auth.currentUser, password.value)})
            }
            
            if (displayName.changed) {
                items.push({ name: 'displayName', value: displayName.value , promise: updateProfile(auth.currentUser, { displayName: displayName.value })})
            }

            if (firstName.changed) {
                items.push({ name: 'firstName', value: firstName.value , promise: userUpdateOtherInfo(userId, 'firstName', firstName.value) })
            }
            
            if (lastName.changed) {
                items.push({ name: 'lastName', value: lastName.value , promise: userUpdateOtherInfo(userId, 'lastName', lastName.value) })
            }

            if (address.changed) {
                items.push({ name: 'address', value: address.value , promise: userUpdateOtherInfo(userId, 'address', address.value) })
            }
            
            if (phone.changed) {
                items.push({ name: 'phoneNumber', value: phone.value, promise: userUpdateOtherInfo(userId, 'phoneNumber', phone.value) })
            }
            
            const updatingItems = items.map(item => item.promise)

            const results = await Promise.allSettled(updatingItems)
            results.forEach((result, index) => {
                const field = items[index].name
                const value = items[index].value
                if (result.status === 'fulfilled') {
                    dispatch({ 
                        type: ACTIONS.SET_UPDATE_MESSAGE, 
                        payload: { field, value }
                    })
                } else {
                    dispatch({ 
                        type: ACTIONS.SET_UPDATE_ERROR, 
                        payload: { field }
                    })
                }
            })

            dispatch({ type: ACTIONS.USER_UPDATE_SUCCESS })
        } catch(error) {
            console.log(error)
            dispatch({ type: ACTIONS.USER_UPDATE_FAIL })
        }
    }
}

export function updateProfilePhoto(userId, imageFile) {
    return async (dispatch) => {
        try {  
            dispatch({ type: ACTIONS.USER_UPLOAD_PHOTO_START })
            const path = `profile_photos/${userId}/photo`
            const storageRef = ref(storage, path)
            await uploadBytes(storageRef, imageFile)
            const photoImageURL = await getDownloadURL(storageRef)
            await updateProfile(auth.currentUser, { photoURL: photoImageURL })
            dispatch({ type: ACTIONS.USER_UPLOAD_PHOTO_SUCCESS })
        } catch {
            dispatch({ type: ACTIONS.USER_UPLOAD_PHOTO_FAIL })
        }
    }
}

async function userUpdateOtherInfo(userId, field, value) {
    const q = query(collection(db, 'userProfile'), where('userId', '==', userId))
    const existingDocs = await getDocs(q)
    const existingDoc = existingDocs.docs[0]
    if (existingDoc) {
        return updateDoc(doc(db, 'userProfile', existingDoc.id), {
            [field]: value
        })
    }
}

export function resetErrorsAndMessages() {
    return {
        type: ACTIONS.RESET_ERROR_AND_MESSAGE
    }
}

export function getUserProfileInfo(userId) {
    return async (dispatch) => {
        try {
            const q = query(collection(db, 'userProfile'), where('userId', '==', userId))
            const existingDocs = await getDocs(q)
            const existingDoc = existingDocs.docs[0]
            if (existingDoc) {
                const userInfo = formatDoc(existingDoc)
                dispatch({
                    type: ACTIONS.GET_USER_INFO,
                    payload: {
                        userOtherInfo: userInfo
                    }
                })
            } else {
                dispatch({ 
                    type: ACTIONS.GET_USER_INFO,
                    payload: {
                        userOtherInfo: {}
                    }
                })
            }
        } catch (error) {
            console.error(error.message)
        }
    }
}



export default ACTIONS


// export function userUpdateEmail(email) {
//     return async (dispatch) => {
//         try {
//             dispatch({ type: ACTIONS.USER_UPDATE_START })
//             await updateEmail(auth, email)
//             dispatch({ 
//                 type: ACTIONS.USER_UPDATE_SUCCESS,
//                 payload: {
//                     field: 'email'
//                 } 
//             })
//         } catch {
//             dispatch({
//                 type: ACTIONS.USER_UPDATE_FAIL,
//                 payload: {
//                     field: 'email'
//                 }
//             })
//         }
//     }
// }

// export function userUpdatePassword(password) {
//     return async (dispatch) => {
//         try {
//             dispatch({ type: ACTIONS.USER_UPDATE_START })
//             await updatePassword(auth, password)
//             dispatch({ 
//                 type: ACTIONS.USER_UPDATE_SUCCESS,
//                 payload: {
//                     field: 'password'
//                 } 
//             })
//         } catch {
//             dispatch({
//                 type: ACTIONS.USER_UPDATE_FAIL,
//                 payload: {
//                     field: 'password'
//                 }
//             })
//         }
//     }
// }

// export function userUpdateDisplayName(displayName) {
//     return async (dispatch) => {
//         try {
//             dispatch({ type: ACTIONS.USER_UPDATE_START })
//             await updateProfile(auth, {
//                 displayName: displayName
//             })
//             dispatch({ 
//                 type: ACTIONS.USER_UPDATE_SUCCESS,
//                 payload: {
//                     field: 'display-name'
//                 } 
//             })
//         } catch {
//             dispatch({
//                 type: ACTIONS.USER_UPDATE_FAIL,
//                 payload: {
//                     field: 'display-name'
//                 }
//             })
//         }
//     }
// }