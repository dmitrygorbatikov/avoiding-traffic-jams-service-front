import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import {useState} from "react";
import TableRowsIcon from '@mui/icons-material/TableRows';
import {IconButton} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {
    userProfileSelector
} from "../../modules/user/selectors";
import {logoutUser} from "../../modules/auth/actions";
import {useHistory} from "react-router";

const MenuDrawer = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const profile = useSelector(userProfileSelector)
    const pathName = document.location.pathname
    return (
        <div>
            <IconButton onClick={() => {
                setOpen(true)
            }}>
                <TableRowsIcon/>
            </IconButton>
            <Drawer
                anchor="right"
                open={open}
                onClose={() => setOpen(false)}
            >
                <div className="drawer">
                    <div className="drawer__header">
                        <p>Hi, {profile?.username}!</p>
                    </div>
                    <div className="menu">
                        <div className={`menu__item ${pathName === '/' ? 'menu__item-active' : ''}`}
                             onClick={() => {
                                 history.push('/')
                             }
                             }>
                            <p>HOME</p>
                        </div>
                        <div className={`menu__item ${pathName.includes('car') ? 'menu__item-active' : ''}`}
                             onClick={() => {
                                 history.push('/car')
                             }
                             }>
                            <p>MY CAR</p>
                        </div>
                        <div className={`menu__item ${pathName.includes('chats') ? 'menu__item-active' : ''}`}
                             onClick={() => {
                                 history.push('/chats')
                             }
                             }>
                            <p>CHATS</p>
                        </div>
                        <div className={`menu__item ${pathName.includes('profile') ? 'menu__item-active' : ''}`}
                             onClick={() => {
                                 history.push('/profile')
                             }
                             }>
                            <p>PROFILE</p>
                        </div>
                        <div className="menu__item" onClick={() => {
                            dispatch(logoutUser())
                        }
                        }>
                            <p>LOGOUT</p>
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    )
}
export default MenuDrawer