import ACTIONS from "../actions/productActions"

const initialState = {
    products: [],
    loading: false,
    error: '',
    message: '',
    unsubscribe: null
}

export function productReducer(state = initialState, { type, payload }) {
    switch (type) {
        case ACTIONS.ADD_PRODUCT_START:
            return {
                ...state,
                loading: true,
                error: '',
                message: ''
            }
        case ACTIONS.ADD_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Failed to add product. Please check the input data',
            }
        case ACTIONS.ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                message: 'The product has been added successfully',
                products: [
                    ...state.products,
                    payload.newProduct
                ]
            }
        case ACTIONS.GET_PRODUCT_START:
            return {
                ...state,
                loading: true,
                message: '',
                error: '',
                products: [],
                unsubscribe: null,
            }
        case ACTIONS.GET_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Failed to load products data. You might need to refresh the site.'
            }
        case ACTIONS.GET_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: payload.products,
                unsubscribe: payload.unsubscribe
            }
        default:
            return state
    }
}