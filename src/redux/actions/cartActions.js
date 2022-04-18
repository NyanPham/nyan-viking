import { db } from "../../firebase"
import { addDoc, doc, updateDoc, deleteDoc, collection, serverTimestamp, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import { formatDoc } from '../../helper'

const ACTIONS = {
    GET_CART_START: 'get-cart-start',
    GET_CART_FAIL: 'get-cart-fail',
    GET_CART_SUCCESS: 'get-cart-success',

    ADD_TO_CART_START: 'get-to-cart-start',
    ADD_TO_CART_FAIL: 'get-to-cart-fail',
    ADD_TO_CART_SUCCESS: 'get-to-cart-success',

    UPDATE_CART_ITEM_AMOUNT_START: 'update-cart-item-amount-start',
    UPDATE_CART_ITEM_AMOUNT_FAIL: 'update-cart-item-amount-fail',
    UPDATE_CART_ITEM_AMOUNT_SUCCESS: 'update-cart-item-amount-success',

    REMOVE_ITEM_START: 'remove-item-start',
    REMOVE_ITEM_FAIL: 'remove-item-fail',
    REMOVE_ITEM_SUCCESS: 'remove-item-success'
}

export function getCart(userId) {
    return async (dispatch) => {
        try {
            dispatch({ type: ACTIONS.GET_CART_START })
            const q = query(collection(db, 'carts'), where('userId', '==', userId), orderBy('createdAt', 'desc'))
            const unsubscribe = onSnapshot(q, snapshot => {
                const items = snapshot.docs.map(formatDoc)
                dispatch({
                    type: ACTIONS.GET_CART_SUCCESS,
                    payload: {
                        items, 
                        unsubscribe
                    }
                })
            })
        } catch {
            dispatch({ type: ACTIONS.GET_CART_FAIL })
        }
    }
}

export function addToCart({ docId, code, imageURL, title }, selectedColor, selectedSize, selectedAmount, userId) {
    return async (dispatch) => {
        try {
            dispatch({ type: ACTIONS.ADD_TO_CART_START })
            await addDoc(collection(db, 'carts'), {
                userId,
                productId: docId, 
                code,
                title,
                imageURL,
                selectedColor,
                selectedSize,
                selectedAmount,
                createdAt: serverTimestamp()
            })
            dispatch({ type: ACTIONS.ADD_TO_CART_SUCCESS })
        } catch {
            dispatch({ type: ACTIONS.ADD_TO_CART_FAIL })
        }
    }
}

export function updateCartItemAmount(cartItemId, newAmount) {
    return async (dispatch) => {
        try {
            dispatch({ type: ACTIONS.UPDATE_CART_ITEM_AMOUNT_START })
            const itemDocRef = doc(db, 'carts', cartItemId)
            await updateDoc(itemDocRef, {
                selectedAmount: newAmount
            })
            dispatch({ type: ACTIONS.UPDATE_CART_ITEM_AMOUNT_SUCCESS })
        } catch {
            dispatch({ type: ACTIONS.UPDATE_CART_ITEM_AMOUNT_FAIL })
        }
    }
}

export function removeItemFromCart(cartItemId) {
    return async (dispatch) => {
        try {
            dispatch({ type: ACTIONS.REMOVE_ITEM_START })
            const cartItemToDelete = doc(db, 'carts', cartItemId)
            await deleteDoc(cartItemToDelete)
            dispatch({ type: ACTIONS.REMOVE_ITEM_SUCCESS })
        } catch {
            dispatch({ type: ACTIONS.REMOVE_ITEM_FAIL})
        }
    }    
}

export default ACTIONS