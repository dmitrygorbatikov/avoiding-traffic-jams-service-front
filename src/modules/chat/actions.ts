import {ChatEnumTypes} from "./types";
import {Dispatch} from "redux";
import ChatService from "../../services/chat.serivce";
import {IOpenItem} from "./reducers";
import MessagesService from "../../services/messages.service";

export const getUserChatsRequest = () => {
    return {
        type: ChatEnumTypes.GET_USER_CHATS_REQUEST,
    }
}

export const getUserChatsResponse = (chats: any[]) => {
    return {
        type: ChatEnumTypes.GET_USER_CHATS_RESPONSE,
        payload: chats,
    }
}

export const getUserChatsError = (error: string | undefined) => {
    return {
        type: ChatEnumTypes.GET_USER_CHATS_ERROR,
        payload: error,
    }
}

export const getUserChats = () => {
    return async (dispatch: Dispatch) => {
        dispatch(getUserChatsRequest())
        const res = await ChatService.getChats()
        if (res.error) {
            getUserChatsError(res.error)
        } else if (res.chats !== undefined) {
            getUserChatsError(undefined)
            dispatch(getUserChatsResponse(res.chats))
        }
    }
}

export const getChatRequest = () => {
    return {
        type: ChatEnumTypes.GET_CHAT_REQUEST,
    }
}

export const getChatResponse = (chat: any) => {
    return {
        type: ChatEnumTypes.GET_CHAT_RESPONSE,
        payload: chat,
    }
}

export const getChatError = (error: string | undefined) => {
    return {
        type: ChatEnumTypes.GET_CHAT_ERROR,
        payload: error,
    }
}

export const getChat = (secondUserId: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(getChatRequest())
        const res = await ChatService.getChat(secondUserId)
        if (res.error) {
            getChatError(res.error)
        } else if (res.chat !== undefined) {
            getChatError(undefined)
            dispatch(getChatResponse(res.chat))
        }
    }
}

export const openItem = (openItem: IOpenItem) => {
    return {
        type: ChatEnumTypes.OPEN_ITEM,
        payload: openItem,
    }
}


//messages
export const getMessagesRequest = () => {
    return {
        type: ChatEnumTypes.GET_MESSAGES_REQUEST,
    }
}

export const getMessagesResponse = (messages: any) => {
    return {
        type: ChatEnumTypes.GET_MESSAGES_RESPONSE,
        payload: messages,
    }
}

export const getMessagesError = (error: string | undefined) => {
    return {
        type: ChatEnumTypes.GET_MESSAGES_ERROR,
        payload: error,
    }
}

export const getUserMessages = (chatId: string, secondUserId: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(getMessagesRequest())
        const res = await MessagesService.getMessages(chatId, secondUserId)
        if (res.error) {
            getMessagesError(res.error)
        } else if (res.messages !== undefined) {
            getMessagesError(undefined)
            dispatch(getMessagesResponse(res.messages))
        }
    }
}

export const postMessageRequest = () => {
    return {
        type: ChatEnumTypes.POST_MESSAGE_REQUEST,
    }
}

export const postMessageResponse = (message: any, messages: any[]) => {

    messages.push(message)
    return {
        type: ChatEnumTypes.POST_MESSAGE_RESPONSE,
        payload: messages,
    }
}

export const postMessageError = (error: string | undefined) => {
    return {
        type: ChatEnumTypes.POST_MESSAGE_ERROR,
        payload: error,
    }
}

export const postMessage = (chatId: string, messages: any[], message: string, toUser: string, socketRef: any) => {
    return async (dispatch: Dispatch) => {
        dispatch(postMessageRequest())
        const res = await MessagesService.postMessage({chatId, message, toUser})
        if (res.error) {
            postMessageError(res.error)
        } else if (res.message !== undefined) {
            const newMessage = res.message
            newMessage.room = chatId
            socketRef.current.emit('message', newMessage)
            postMessageError(undefined)
        }
    }
}
export const sendMessageResponse = (sendMessage: boolean) => {
    return {
        type: ChatEnumTypes.SEND_MESSAGE,
        payload: sendMessage,
    }
}