import { AnyAction } from 'redux'
import {CarEnumTypes} from "./types";
export interface IOpenItem {
    open: boolean,
    id: string | undefined
}
interface CarState {
    error?: string
    loading: boolean
    car?: any
}

const initState: CarState = {
    loading: false,
}

function carReducer(state = initState, action: AnyAction): CarState {
    switch (action.type) {
        case CarEnumTypes.GET_USER_CAR_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CarEnumTypes.GET_USER_CAR_RESPONSE:
            return {
                ...state,
                car: action.payload,
                loading: false,
            }
        case CarEnumTypes.GET_USER_CAR_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case CarEnumTypes.POST_USER_CAR_REQUEST:
            return {
                ...state,
            }
        case CarEnumTypes.POST_USER_CAR_RESPONSE:
            return {
                ...state,
                car: action.payload,
            }
        case CarEnumTypes.POST_USER_CAR_ERROR:
            return {
                ...state,
                error: action.payload,
            }
        case CarEnumTypes.PUT_USER_CAR_REQUEST:
            return {
                ...state,
            }
        case CarEnumTypes.PUT_USER_CAR_RESPONSE:
            return {
                ...state,
                car: action.payload,
            }
        case CarEnumTypes.PUT_USER_CAR_ERROR:
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state
    }
}
export default carReducer
