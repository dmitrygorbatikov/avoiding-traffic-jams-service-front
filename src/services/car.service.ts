import axios from 'axios'
import {SERVICE_NAME} from "../helpers/common";
import {PostCar} from "../modules/car/types";

class CarService {
    private static apiUrl = SERVICE_NAME + '/car'

    public static getCar() {
        return axios
            .get(`${this.apiUrl}`, {
                headers: {
                    token: localStorage.getItem('token') ?? ''
                }
            })
            .then((res) => {
                return res.data
            })
            .catch((err) => {
            })
    }

    public static postCar(data: PostCar) {
        return axios
            .post(`${this.apiUrl}`, data, {
                headers: {
                    token: localStorage.getItem('token') ?? ''
                }
            })
            .then((res) => {
                return res.data
            })
            .catch((err) => {
            })
    }

    public static editCar(data: PostCar) {
        return axios
            .put(`${this.apiUrl}`, data, {
                headers: {
                    token: localStorage.getItem('token') ?? ''
                }
            })
            .then((res) => {
                return res.data
            })
            .catch((err) => {
            })
    }
}

export default CarService
