
import axios from 'axios'
import {SERVICE_NAME} from "../helpers/common";

class UserService {
    private static apiUrl = SERVICE_NAME + '/user'

    public static getProfile() {
        return axios
            .get(this.apiUrl + '/profile', {
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

    public static editProfile(body: {name: string, surname: string}) {
        return axios
            .put(this.apiUrl + '/edit', {
                name: body.name,
                surname: body.surname
            },{
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

    public static getUsers() {
        return axios
            .get(this.apiUrl + '/search',{
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

export default UserService
