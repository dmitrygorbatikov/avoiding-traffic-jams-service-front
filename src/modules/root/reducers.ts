import { combineReducers } from 'redux'
import authReducer from "../auth/reducers";
import userReducer from "../user/reducers";
import chatReducer from "../chat/reducers";
import carReducer from "../car/reducers";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    chat: chatReducer,
    car: carReducer,
})

export default rootReducer