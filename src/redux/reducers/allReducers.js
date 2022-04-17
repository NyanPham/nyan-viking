import { combineReducers } from "redux"
import { cartReducer } from "./cartReducer"
import { productReducer } from "./productReducer"
import { userReducer } from "./userReducer"

const allReducers = combineReducers({
    userStatus: userReducer,
    productStatus: productReducer,
    cartStatus: cartReducer
})

export default allReducers