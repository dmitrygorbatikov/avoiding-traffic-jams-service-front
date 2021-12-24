import { combineReducers } from 'redux'
import authReducer from "../auth/reducers";
import userReducer from "../user/reducers";
import chatReducer from "../chat/reducers";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    chat: chatReducer,
})

export default rootReducer