import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {useDispatch, useSelector} from "react-redux";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    chatLoadingSelector,
    chatSelector,
    messagesLoadingSelector,
    messagesSelector,
    openItemSelector, sendMessageSelector
} from "../../modules/chat/selectors";
import {
    getChatResponse,
    getUserMessages,
    openItem,
    postMessage,
    sendMessageResponse
} from "../../modules/chat/actions";
import {useEffect, useRef, useState} from "react";
import {
    Avatar,
    Card,
    FilledInput,
    FormControl,
    InputAdornment,
    InputLabel,
    List,
    ListItem,
    ListItemAvatar, ListItemText
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {io} from "socket.io-client";
import {defaultImage, SERVICE_NAME} from "../../helpers/common";
import {userProfileSelector} from "../../modules/user/selectors";
import {msToTime} from "../../helpers/functions";

export default function ViewUserChatsItem(props: any) {
    const chat = useSelector(chatSelector)
    const profile = useSelector(userProfileSelector)

    const chatLoading = useSelector(chatLoadingSelector)
    const messages = useSelector(messagesSelector)
    const socketRef = useRef(null)

    const [message, setMessage] = useState('')
    const {id} = useSelector(openItemSelector)
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(openItem({open: false, id: undefined}))
        dispatch(getChatResponse({}))
    };
    const sendMessage = () => {
        dispatch(sendMessageResponse(true))
        if (message !== '' && id) {
            dispatch(postMessage(chat._id, messages, message, id, socketRef))
        }
        setMessage('')
    }
    function updateScroll(){
        let element = document.getElementById("messages-block");
        // @ts-ignore
        element.scrollTop = element.scrollHeight;
    }

    useEffect(() => {
        // @ts-ignore
        socketRef.current = io(SERVICE_NAME, {
            transports: ["websocket"]
        })
        // @ts-ignore
        socketRef.current.on('joinRoom', (data) => {
        })
        // @ts-ignore
        socketRef.current.on('message', (data) => {
            if (chat && id && props.open && !chatLoading) {
                dispatch(getUserMessages(chat._id, id))
                setTimeout(() => {
                    updateScroll()
                },500)
            }
        })
        return () => {
            // @ts-ignore
            socketRef.current.disconnect()
        }
    }, [chat, id, props.open, chatLoading])
    useEffect(() => {
        if (chat && id && props.open && !chatLoading) {
            dispatch(getUserMessages(chat._id, id))
            // @ts-ignore
            socketRef.current.emit('joinRoom', chat._id)
            setTimeout(() => {
                updateScroll()
            },250)
        }
    }, [chatLoading, chat, id, props.open])
    return (
        <div>
            <Dialog
                fullScreen
                open={props.open && chat && id}
                onClose={handleClose}
            >
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <ArrowBackIosNewIcon/>
                        </IconButton>
                        {chat && chat?.secondUserId === profile.id && chat?.chatCreatorImage &&
                            <Avatar src={chat?.chatCreatorImage}/>
                        }
                        {chat && chat?.secondUserId === profile.id && chat?.secondUserImage &&
                            <Avatar src={chat?.secondUserImage}/>
                        }
                        {chat && !chat?.secondUserImage && !chat?.chatCreatorImage &&
                            <Avatar src={defaultImage}/>

                        }

                        <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                            {
                                chat?.secondUserId === profile.id
                                    ?
                                    `${chat?.chatCreatorName} ${chat?.chatCreatorSurname}`
                                    :
                                    `${chat?.secondUserName} ${chat?.secondUserSurname}`

                            }
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <MoreVertIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <div style={{justifyContent: 'space-between'}}>
                    <div className="messages-block" id="messages-block">
                        {messages.length > 0 && messages.map((message: any, index: number) => {
                            console.log(message)
                            return (
                                <div style={{width: '98vw'}}>
                                    {message.from === profile.id &&
                                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <div>
                                            </div>
                                            <div>
                                                <List style={{
                                                    background: '#b8dfff',
                                                    margin: 10,
                                                    borderRadius: 3
                                                }} sx={{width: '100%', minWidth: 360, bgcolor: 'background.paper'}}>
                                                    <ListItem>
                                                        <ListItemAvatar>
                                                            <Avatar>{message.fromName[0].toUpperCase()}</Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={message.fromUsername}
                                                            secondary={message.message}
                                                        />
                                                        <Typography variant="caption">{msToTime(Date.parse(message.sendTime))}</Typography>
                                                    </ListItem>
                                                </List>
                                            </div>
                                        </div>}
                                    {message.from !== profile.id &&
                                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <div>
                                                <List style={{
                                                    background: '#bff7be',
                                                    margin: 10,
                                                    borderRadius: 3
                                                }} sx={{width: '100%', minWidth: 360, bgcolor: 'background.paper'}}>
                                                    <ListItem>
                                                        <ListItemAvatar>
                                                            <Avatar>{message.fromName[0].toUpperCase()}</Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={message.fromUsername}
                                                            secondary={message.message}
                                                        />
                                                        <Typography variant="caption">{msToTime(Date.parse(message.sendTime))}</Typography>

                                                    </ListItem>
                                                </List>
                                            </div>
                                            <div></div>
                                        </div>}
                                </div>
                            )
                        })}
                    </div>
                    <div style={{margin: '0 auto'}}>
                        <FormControl sx={{m: 1, width: '25ch'}} variant="filled">
                            <InputLabel htmlFor="filled-adornment-password">Message</InputLabel>
                            <FilledInput
                                id="filled-adornment-password"
                                type={'text'}
                                value={message}
                                style={{width: '99vw'}}
                                onChange={(e) => {
                                    setMessage(e.target.value)
                                }}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        sendMessage()
                                    }
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={sendMessage}
                                            onMouseDown={(e) => {

                                            }
                                            }
                                            edge="end"
                                        >
                                            <SendIcon/>
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
