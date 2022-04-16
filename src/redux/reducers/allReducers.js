import { combineReducers } from "redux"
import { productReducer } from "./productReducer"
import { userReducer } from "./userReducer"

const allReducers = combineReducers({
    userStatus: userReducer,
    productStatus: productReducer,
})

export default allReducers