import {AuthEnumTypes, LoginData, RegisterData} from "./types";
import {Dispatch} from "redux";
import AuthService from "../../services/auth.service";

export const loginRequest = () => {
    return {
        type: AuthEnumTypes.LOGIN_REQUEST,
    }
}

export const loginResponse = (token: string) => {
    localStorage.setItem('token', token)
    return {
        type: AuthEnumTypes.LOGIN_RESPONSE,
        payload: token,
    }
}

export const loginError = (error: string | undefined) => {
    return {
        type: AuthEnumTypes.LOGIN_ERROR,
        payload: error,
    }
}

export const userLoginError = (error: string | undefined) => {
    return (dispatch: Dispatch) => {
        dispatch(loginError(error))
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    return {
        type: AuthEnumTypes.LOGOUT,
    }
}
export const logoutUser = () => {
    return (dispatch: Dispatch) => {
        dispatch(logout())
    }
}


export const login = (data: LoginData) => {
    return async (dispatch: Dispatch) => {
        dispatch(loginRequest())
        const res = await AuthService.login(data)
        if (res.error) {
            userLoginError(res.error)
            logoutUser()
        } else if (res.token !== undefined) {
            userLoginError(undefined)
            dispatch(loginResponse(res.token))
        }
    }
}

export const registerRequest = () => {
    return {
        type: AuthEnumTypes.REGISTER_REQUEST,
    }
}

export const registerResponse = (token: string) => {
    localStorage.setItem('token', token)
    return {
        type: AuthEnumTypes.REGISTER_RESPONSE,
        payload: token,
    }
}

export const registerError = (error: string | undefined) => {
    return {
        type: AuthEnumTypes.REGISTER_ERROR,
        payload: error,
    }
}

export const userRegisterError = (error: string | undefined) => {
    return (dispatch: Dispatch) => {
        dispatch(registerError(error))
    }
}

export const register = (data: RegisterData) => {
    return async (dispatch: Dispatch) => {
        dispatch(registerRequest())
        const res = await AuthService.register(data)
        if (res.error) {
            userRegisterError(res.error)
            dispatch(logout())
        } else if (res.token !== undefined) {
            userRegisterError(undefined)
            dispatch(registerResponse(res.token))
        }
    }
}