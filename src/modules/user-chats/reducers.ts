import { AnyAction } from 'redux'
import {ChatEnumTypes} from "./types";
export interface IOpenItem {
    open: boolean,
    id: string | undefined
}
interface ChatState {
    error?: string
    chatsLoading: boolean
    chatLoading: boolean
    chatItem?: any
    chatsList: any[]
    openItem: IOpenItem
    openUserChat: IOpenItem
    messages: any[],
    messagesLoading: boolean
    sendMessage: boolean
}

const initState: ChatState = {
    chatsLoading: false,
    chatLoading: false,
    chatsList: [],
    openItem: {
        id: undefined,
        open: false
    },
    openUserChat: {
        id: undefined,
        open: false
    },
    messages: [],
    messagesLoading: false,
    sendMessage: false
}

function chatReducer(state = initState, action: AnyAction): ChatState {
    switch (action.type) {
        case ChatEnumTypes.GET_USER_CHATS_REQUEST:
            return {
                ...state,
                chatsLoading: true,
            }
        case ChatEnumTypes.GET_USER_CHATS_RESPONSE:
            return {
                ...state,
                chatsList: action.payload,
                chatsLoading: false,
            }
        case ChatEnumTypes.GET_USER_CHATS_ERROR:
            return {
                ...state,
                chatsLoading: false,
                error: action.payload,
            }
        case ChatEnumTypes.GET_CHAT_REQUEST:
            return {
                ...state,
                chatLoading: true,
            }
        case ChatEnumTypes.GET_CHAT_RESPONSE:
            return {
                ...state,
                chatItem: action.payload,
                chatLoading: false,
            }
        case ChatEnumTypes.GET_CHAT_ERROR:
            return {
                ...state,
                chatLoading: false,
                error: action.payload,
            }
        case ChatEnumTypes.OPEN_ITEM:
            return {
                ...state,
                openItem: action.payload,
            }
        case ChatEnumTypes.OPEN_USER_CHAT:
            return {
                ...state,
                openUserChat: action.payload,
            }
        case ChatEnumTypes.GET_MESSAGES_REQUEST:
            return {
                ...state,
                messagesLoading: true,
            }
        case ChatEnumTypes.GET_MESSAGES_RESPONSE:
            return {
                ...state,
                messagesLoading: false,
                messages: action.payload,
            }
        case ChatEnumTypes.GET_MESSAGES_ERROR:
            return {
                ...state,
                messagesLoading: false,
                error: action.payload
            }
        case ChatEnumTypes.POST_MESSAGE_REQUEST:
            return {
                ...state,
            }
        case ChatEnumTypes.POST_MESSAGE_RESPONSE:
            return {
                ...state,
                messages: action.payload,
            }
        case ChatEnumTypes.POST_MESSAGE_ERROR:
            return {
                ...state,
                error: action.payload,
            }
        case ChatEnumTypes.SEND_MESSAGE:
            return {
                ...state,
                sendMessage: action.payload,
            }
        default:
            return state
    }
}
export default chatReducer
