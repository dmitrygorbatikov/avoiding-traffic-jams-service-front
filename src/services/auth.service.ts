import axios from 'axios'
import {LoginData, RegisterData} from "../modules/auth/types";
import {SERVICE_NAME} from "../helpers/common";

class AuthService {
    private static apiUrl = SERVICE_NAME + '/auth'

    public static login(data: LoginData) {
        return axios
            .post(`${this.apiUrl}/login`, data, {})
            .then((res) => {
                return res.data
            })
            .catch((err) => {})
    }
    public static register(data: RegisterData) {
        return axios
            .post(`${this.apiUrl}/register`, data, {})
            .then((res) => {
                return res.data
            })
            .catch((err) => {})
    }
}

export default AuthService
