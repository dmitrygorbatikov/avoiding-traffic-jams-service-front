import axios from 'axios'
import {SERVICE_NAME} from "../helpers/common";
import {PostMessage} from "../modules/chat/types";

class MessageService {
    private static apiUrl = SERVICE_NAME + '/message'

    public static getMessages(chatId: string, secondUserId: string) {
        return axios
            .get(`${this.apiUrl}/${chatId}?secondUserId=${secondUserId}`, {
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

    public static postMessage(data: PostMessage) {
        return axios
            .post(`${this.apiUrl}/${data.chatId}?toUser=${data.toUser}`, {
                message: data.message
            }, {
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

export default MessageService
