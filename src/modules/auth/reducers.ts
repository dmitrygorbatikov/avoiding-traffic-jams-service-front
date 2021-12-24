import { AnyAction } from 'redux'
import {AuthEnumTypes} from "./types";

interface AuthState {
    token?: string | null
    error?: string
    authLoading: boolean
}

const initState: AuthState = {
    authLoading: false,
    token: localStorage.getItem('token') ?? null,
}

function authReducer(state = initState, action: AnyAction): AuthState {
    switch (action.type) {
        case AuthEnumTypes.LOGIN_REQUEST:
            return {
                ...state,
                authLoading: true,
            }
        case AuthEnumTypes.LOGIN_RESPONSE:
            return {
                ...state,
                token: action.payload,
                authLoading: false,
            }
        case AuthEnumTypes.LOGIN_ERROR:
            return {
                ...state,
                authLoading: false,
                error: action.payload,
            }
        case AuthEnumTypes.REGISTER_REQUEST:
            return {
                ...state,
                authLoading: true,
            }
        case AuthEnumTypes.REGISTER_RESPONSE:
            return {
                ...state,
                token: action.payload,
                authLoading: false,
            }
        case AuthEnumTypes.REGISTER_ERROR:
            return {
                ...state,
                authLoading: false,
                error: action.payload,
            }
        case AuthEnumTypes.LOGOUT:
            return {
                ...state,
                token: null,
            }
        default:
            return state
    }
}
export default authReducer
