import {CarEnumTypes, PostCar} from "./types";
import {Dispatch} from "redux";
import CarService from "../../services/car.service";

export const getCarRequest = () => {
    return {
        type: CarEnumTypes.GET_USER_CAR_REQUEST,
    }
}

export const getCarResponse = (car: any[]) => {
    return {
        type: CarEnumTypes.GET_USER_CAR_RESPONSE,
        payload: car,
    }
}

export const getCarError = (error: string | undefined) => {
    return {
        type: CarEnumTypes.GET_USER_CAR_ERROR,
        payload: error,
    }
}

export const getCar = () => {
    return async (dispatch: Dispatch) => {
        dispatch(getCarRequest())
        const res = await CarService.getCar()
        if (res.error) {
            // @ts-ignore
            dispatch(getCarResponse(undefined))
        } else if (res.car !== undefined) {
            dispatch(getCarResponse(res.car))
        }
    }
}

export const postCarRequest = () => {
    return {
        type: CarEnumTypes.POST_USER_CAR_REQUEST,
    }
}

export const postCarResponse = (car: any) => {
    return {
        type: CarEnumTypes.POST_USER_CAR_RESPONSE,
        payload: car,
    }
}

export const postCarError = (error: string | undefined) => {
    return {
        type: CarEnumTypes.POST_USER_CAR_ERROR,
        payload: error,
    }
}

export const postCar = (data: PostCar) => {
    return async (dispatch: Dispatch) => {
        dispatch(postCarRequest())
        const res = await CarService.postCar(data)
        if (res.error) {
            postCarError(res.error)
        } else if (res.car !== undefined) {
            postCarError(undefined)
            dispatch(postCarResponse(res.car))
        }
    }
}


export const putCarRequest = () => {
    return {
        type: CarEnumTypes.PUT_USER_CAR_REQUEST,
    }
}

export const putCarResponse = (car: any) => {
    return {
        type: CarEnumTypes.PUT_USER_CAR_RESPONSE,
        payload: car,
    }
}

export const putCarError = (error: string | undefined) => {
    return {
        type: CarEnumTypes.PUT_USER_CAR_ERROR,
        payload: error,
    }
}

export const putCar = (data: PostCar) => {
    return async (dispatch: Dispatch) => {
        dispatch(putCarRequest())
        const res = await CarService.editCar(data)
        if (res.error) {
            putCarError(res.error)
        } else if (res.car !== undefined) {
            putCarError(undefined)
            dispatch(putCarResponse(res.car))
        }
    }
}
