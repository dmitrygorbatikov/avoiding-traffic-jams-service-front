export enum AuthEnumTypes {
    LOGIN_REQUEST = 'LOGIN_REQUEST',
    LOGIN_RESPONSE = 'LOGIN_RESPONSE',
    LOGIN_ERROR = 'LOGIN_ERROR',

    REGISTER_REQUEST = 'REGISTER_REQUEST',
    REGISTER_RESPONSE = 'REGISTER_RESPONSE',
    REGISTER_ERROR = 'REGISTER_ERROR',

    LOGOUT = 'LOGOUT',
}

export interface LoginData {
    username: string
    password: string
}

export interface RegisterData {
    name: string
    surname: string
    username: string
    password: string
}