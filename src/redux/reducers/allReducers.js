import { combineReducers } from "redux"
import { cartReducer } from "./cartReducer"
import { productReducer } from "./productReducer"
import toastReducer from "./toastReducer"
import { userReducer } from "./userReducer"

const allReducers = combineReducers({
    userStatus: userReducer,
    productStatus: productReducer,
    cartStatus: cartReducer,
    toasts: toastReducer, 
})

export default allReducers