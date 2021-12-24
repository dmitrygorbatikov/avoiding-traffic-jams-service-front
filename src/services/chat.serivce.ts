import axios from 'axios'
import {SERVICE_NAME} from "../helpers/common";

class ChatService {
    private static apiUrl = SERVICE_NAME + '/chat'

    public static getChats() {
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

    public static getChat(secondUserId: string) {
        return axios
            .post(`${this.apiUrl}?secondUserId=${secondUserId}`, {}, {
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

export default ChatService
