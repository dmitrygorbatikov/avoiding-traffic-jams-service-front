export enum UserEnumTypes {
    GET_USER_PROFILE_REQUEST = 'GET_USER_PROFILE_REQUEST',
    GET_USER_PROFILE_RESPONSE = 'GET_USER_PROFILE_RESPONSE',
    GET_USER_PROFILE_ERROR = 'GET_USER_PROFILE_ERROR',

    GET_USERS_REQUEST = 'GET_USERS_REQUEST',
    GET_USERS_RESPONSE = 'GET_USER_RESPONSE',
    GET_USERS_ERROR = 'GET_USER_ERROR',

    SELECT_BUTTON = 'SELECT_BUTTON',
}

export interface UserProfile {
    id: string
    name: string
    surname: string
    username: string
    registerDate: number
    image: string
    role: string
    online: boolean
    lng: number
    lat: number
    lastSeen: string
}