import {Avatar, Card, List, ListItem, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getChat, getUserChats, openItem} from "../../modules/chat/actions";
import {chatsLoadingSelector, chatsSelector, openUserChatSelector} from "../../modules/chat/selectors";
import {defaultImage} from "../../helpers/common";
import ViewChatComponent from "./ViewChatComponent";
import * as React from "react";
import {userProfileSelector, usersLoadingSelector} from "../../modules/user/selectors";

export const ChatComponents = () => {
    const dispatch = useDispatch()
    const chatsList = useSelector(chatsSelector)
    const profile = useSelector(userProfileSelector)
    const loading = useSelector(chatsLoadingSelector)
    const usersLoading = useSelector(usersLoadingSelector)

    const openUserChat = useSelector(openUserChatSelector)
    const itemOnclick = (id: string) => {
        dispatch(getChat(id))
        dispatch(openItem({open: true, id}))
    }
    useEffect(() => {
        dispatch(getUserChats())
    }, [])
    return (
        <div>
            {!loading && !usersLoading && <ViewChatComponent open={openUserChat.open}/>}
            <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                {chatsList.length > 0 && chatsList.map((item: any, index: number) => {
                    return (
                        <ListItem>
                            <ListItemButton
                                onClick={() => {
                                    itemOnclick(item.secondUserId === profile.id ? item.chatCreatorId : item.secondUserId)
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar alt={item.secondUserName}
                                            src={item.secondUserImage ? item.secondUserImage : defaultImage}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${item.secondUserName} ${item.secondUserSurname}`}
                                    secondary={item.secondUserUsername}
                                />
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
        </div>

    )
}