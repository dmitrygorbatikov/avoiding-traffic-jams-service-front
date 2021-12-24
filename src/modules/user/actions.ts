import {Dispatch} from "redux";
import {UserEnumTypes, UserProfile} from "./types";
import UserService from "../../services/user.service";

export const userRequest = () => {
    return {
        type: UserEnumTypes.GET_USER_PROFILE_REQUEST,
    }
}

export const userProfileResponse = (profile: UserProfile) => {
    return {
        type: UserEnumTypes.GET_USER_PROFILE_RESPONSE,
        payload: profile,
    }
}

export const userProfileError = (error: string | undefined) => {
    return {
        type: UserEnumTypes.GET_USER_PROFILE_ERROR,
        payload: error,
    }
}
export const getUserProfile = () => {
    return async (dispatch: Dispatch) => {
        dispatch(userRequest())
        const res = await UserService.getProfile()
        if (res.error) {
            dispatch(userProfileError(res.error))
        } else if (res.user !== undefined) {
            dispatch(userProfileResponse(res.user))
        }
    }
}

export const editUserProfile = (body: {name: string, surname: string}) => {
    return async (dispatch: Dispatch) => {
        const res = await UserService.editProfile(body)
        if (res.error) {
            dispatch(userProfileError(res.error))
        } else if (res.user !== undefined) {
            dispatch(userProfileResponse(res.user))
        }
    }
}

export const usersListRequest = () => {
    return {
        type: UserEnumTypes.GET_USERS_REQUEST,
    }
}

export const usersListResponse = (users: any[]) => {
    console.log(users)
    return {
        type: UserEnumTypes.GET_USERS_RESPONSE,
        payload: users,
    }
}
export const usersListError = (error: any) => {
    return {
        type: UserEnumTypes.GET_USERS_ERROR,
        payload: error,
    }
}
export const getUsersList = () => {
    return async (dispatch: Dispatch) => {
        dispatch(usersListRequest())
        const res = await UserService.getUsers()
        if (res.error) {
            dispatch(usersListError(res.error))
        } else if (res.users !== undefined) {
            dispatch(usersListResponse(res.users))
        }
    }
}

export const changeSelectButton = (selectButton: string) => {
    return {
        type: UserEnumTypes.SELECT_BUTTON,
        payload: selectButton,
    }
}