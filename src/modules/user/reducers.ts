import { AnyAction } from 'redux'
import {UserEnumTypes, UserProfile} from "./types";

interface StoragesState {
    error?: string
    profileLoading: boolean
    usersLoading: boolean
    profile?: UserProfile
    users: any[]
    selectButton: string
}

const initState: StoragesState = {
    profileLoading: false,
    usersLoading: false,
    users: [],
    selectButton: 'chats'
}

function userReducer(state = initState, action: AnyAction): StoragesState {
    switch (action.type) {
        case UserEnumTypes.GET_USER_PROFILE_REQUEST:
            return {
                ...state,
                profileLoading: true,
            }
        case UserEnumTypes.GET_USER_PROFILE_RESPONSE:
            return {
                ...state,
                profile: action.payload,
                profileLoading: false,
            }
        case UserEnumTypes.GET_USER_PROFILE_ERROR:
            return {
                ...state,
                profileLoading: false,
                error: action.payload,
            }
        case UserEnumTypes.GET_USERS_REQUEST:
            return {
                ...state,
                usersLoading: true,
            }
        case UserEnumTypes.GET_USERS_RESPONSE:
            console.log(action.payload)
            return {
                ...state,
                users: action.payload,
                usersLoading: false,
            }
        case UserEnumTypes.GET_USERS_ERROR:
            return {
                ...state,
                usersLoading: false,
                error: action.payload,
            }

        case UserEnumTypes.SELECT_BUTTON:
            return {
                ...state,
                usersLoading: false,
                selectButton: action.payload,
            }
        default:
            return state
    }
}
export default userReducer
