import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getUsersList} from "../../modules/user/actions";
import {usersListSelector, usersLoadingSelector} from "../../modules/user/selectors";
import {Avatar, Card, Grid, Typography} from "@mui/material";
import * as React from "react";
import {getChat, openItem} from "../../modules/chat/actions";
import {chatsLoadingSelector, openItemSelector} from "../../modules/chat/selectors";
import ViewChatComponent from "./ViewChatComponent";
import {defaultImage} from "../../helpers/common";

export const UsersSearchPage = () => {
    const dispatch = useDispatch()
    const users = useSelector(usersListSelector)
    const openChat = useSelector(openItemSelector)
    const loading = useSelector(chatsLoadingSelector)
    const usersLoading = useSelector(usersLoadingSelector)
    useEffect(() => {
        dispatch(getUsersList())
    }, [])

    const itemOnclick = (id: string) => {
        dispatch(getChat(id))
        dispatch(openItem({open: true, id}))
    }
    return (
        <>
            {!loading && !usersLoading && <ViewChatComponent open={openChat.open}/>}
            <Grid style={{marginTop: 40, padding: 10}} container spacing={2}>
                {users.length > 0 && users.map((user: any, index: number) => {
                    return (
                        <Grid item xs={3} key={index} onClick={() => {
                            itemOnclick(user.id)
                        }}>
                            <Card style={{padding: 15}} className="card-search-users">
                                <div style={{display: 'flex'}}>
                                    <div>
                                        <Avatar alt="gay-sex" scr={user.image ? user.image : defaultImage}/>
                                    </div>
                                    <div style={{marginLeft: 10}}>
                                        <div>
                                            <Typography variant="overline">{user?.name} {user.surname}</Typography>
                                        </div>
                                        <div>
                                            <Typography variant="body2">{user.username}</Typography>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}