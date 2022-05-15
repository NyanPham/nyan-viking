import { combineReducers } from "redux"
import { cartReducer } from "./cartReducer"
import { productReducer } from "./productReducer"
import toastReducer from "./toastReducer"
import { userReducer } from "./userReducer"
import warningReducer from "./warningReducer"

const allReducers = combineReducers({
    userStatus: userReducer,
    productStatus: productReducer,
    cartStatus: cartReducer,
    toasts: toastReducer, 
    warning: warningReducer,
})

export default allReducers