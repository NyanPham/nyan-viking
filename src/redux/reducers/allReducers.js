import { combineReducers } from "redux"
import { userReducer } from "./userReducer"

const allReducers = combineReducers({
    userStatus: userReducer,
})

export default allReducers