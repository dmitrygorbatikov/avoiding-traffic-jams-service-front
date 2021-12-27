import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import {useState} from "react";
import TableRowsIcon from '@mui/icons-material/TableRows';
import {Button, ButtonGroup, IconButton} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {
    userProfileSelector
} from "../../modules/user/selectors";
import {changeLanguage, logoutUser} from "../../modules/auth/actions";
import {useHistory} from "react-router";
import {languageSelector} from "../../modules/auth/selectors";
import {engLanguage, uaLanguage} from "../../localization";

const MenuDrawer = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const profile = useSelector(userProfileSelector)
    const pathName = document.location.pathname
    const language = useSelector(languageSelector)
    const currentLanguage = language === 'ua' ? uaLanguage : engLanguage
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
                        <p>{currentLanguage.hi}, {profile?.username}!</p>
                    </div>
                    <div style={{marginLeft: 20, marginTop: 10}}>
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <Button style={{color: '#fff'}} disabled={language === 'ua'} onClick={() => {
                                dispatch(changeLanguage('ua'))
                            }}>Українська</Button>
                            <Button style={{color: '#fff'}} disabled={language === 'eng'} onClick={() => {
                                dispatch(changeLanguage('eng'))
                            }}>English</Button>
                        </ButtonGroup>
                    </div>
                    <div className="menu">
                        <div className={`menu__item ${pathName === '/' ? 'menu__item-active' : ''}`}
                             onClick={() => {
                                 history.push('/')
                             }
                             }>
                            <p>{currentLanguage.home.toUpperCase()}</p>
                        </div>
                        <div className={`menu__item ${pathName.includes('car') ? 'menu__item-active' : ''}`}
                             onClick={() => {
                                 history.push('/car')
                             }
                             }>
                            <p>{currentLanguage.myCar.toUpperCase()}</p>
                        </div>
                        <div className={`menu__item ${pathName.includes('chats') ? 'menu__item-active' : ''}`}
                             onClick={() => {
                                 history.push('/chats')
                             }
                             }>
                            <p>{currentLanguage.chats.toUpperCase()}</p>
                        </div>
                        <div className={`menu__item ${pathName.includes('profile') ? 'menu__item-active' : ''}`}
                             onClick={() => {
                                 history.push('/profile')
                             }
                             }>
                            <p>{currentLanguage.profile.toUpperCase()}</p>
                        </div>
                        <div className="menu__item" onClick={() => {
                            dispatch(logoutUser())
                        }
                        }>
                            <p>{currentLanguage.logout.toUpperCase()}</p>
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    )
}
export default MenuDrawer