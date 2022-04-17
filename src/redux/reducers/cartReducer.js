import ACTIONS from "../actions/cartActions"

const initialState = {
    loading: false,
    cartItems: [],
    error: '',
    message: ''
}

export function cartReducer(state = initialState, { type, payload }) {
    switch (type) {
        case ACTIONS.ADD_TO_CART_START:
            return {
                ...state,
                loading: true,
                error: '',
                message: ''
            }
        case ACTIONS.ADD_TO_CART_FAIL:
            return {
                ...state,
                loading: false,
                error: "Failed to load the cart"
            }
        case ACTIONS.ADD_TO_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                message: "The item has been added to your cart"
            }
        case ACTIONS.GET_CART_START:
            return {
                ...state,
                loading: true,
                error: '',
                message: '',
                cartItems: [],
            }
        case ACTIONS.GET_CART_FAIL: 
            return {
                ...state,
                loading: false,
                error: 'Failed to load the items in your cart. Please refresh the page.'
            }
        case ACTIONS.GET_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                message: "Your cart items have been loaded",
                cartItems: payload.items,
            }
        case ACTIONS.UPDATE_CART_ITEM_AMOUNT_START:
            return {
                ...state,
                loading: true,
                message: '',
                error: ''
            }
        case ACTIONS.UPDATE_CART_ITEM_AMOUNT_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Failed to update the amount of the item to your cart'
            }
        case ACTIONS.UPDATE_CART_ITEM_AMOUNT_SUCCESS:
            return {
                ...state,
                loading: false,
                message: 'The amount of the item has been updated'
            }
        default:
            return state
    }
} 