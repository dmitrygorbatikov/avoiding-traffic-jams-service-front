import {RootState} from "../root/store";
import {IOpenItem} from "./reducers";

export const chatsSelector = (state: RootState) => state.chat.chatsList as any[]
export const chatSelector = (state: RootState) => state.chat.chatItem as any

export const chatsLoadingSelector = (state: RootState) => state.chat.chatsLoading as boolean
export const chatLoadingSelector = (state: RootState) => state.chat.chatLoading as boolean

export const openItemSelector = (state: RootState) => state.chat.openItem as IOpenItem
export const openUserChatSelector = (state: RootState) => state.chat.openItem as IOpenItem
export const messagesSelector = (state: RootState) => state.chat.messages as any[]

export const messagesLoadingSelector = (state: RootState) => state.chat.messagesLoading as boolean
export const sendMessageSelector = (state: RootState) => state.chat.messagesLoading as boolean

