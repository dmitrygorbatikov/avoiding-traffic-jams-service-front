import {Button, ButtonGroup} from "@mui/material";
import {ChatComponents} from "../components/chats/ChatComponents";
import {UsersSearchPage} from "../components/chats/UsersSearchPage";
import {useDispatch, useSelector} from "react-redux";
import {changeSelectButton, getUserProfile} from "../modules/user/actions";
import {selectButtonSelector} from "../modules/user/selectors";
import * as React from "react";
import {useEffect} from "react";
import MenuDrawer from "../components/home/MenuDrawer";
import {getCar} from "../modules/car/actions";
import {languageSelector} from "../modules/auth/selectors";
import {engLanguage, uaLanguage} from "../localization";

export const ChatsPage = () => {
    const selectButton = useSelector(selectButtonSelector)
    const dispatch = useDispatch()
    const language = useSelector(languageSelector)
    const currentLanguage = language === 'ua' ? uaLanguage : engLanguage
    useEffect(() => {
        dispatch(getUserProfile())
        dispatch(getCar())
    }, [])
    return (
        <div style={{padding: 20}}>
            <div style={{display: 'flex', justifyContent: 'space-between', padding: 10}}>
                <div>
                    <ButtonGroup disableElevation variant="contained">
                        <Button color={'warning'} disabled={selectButton === 'chats'} onClick={() => {
                            dispatch(changeSelectButton('chats'))
                        }}>{currentLanguage.yourChats}</Button>
                        <Button color={'warning'} disabled={selectButton === 'near'} onClick={() => {
                            dispatch(changeSelectButton('near'))
                        }}>{currentLanguage.peopleNear}</Button>
                    </ButtonGroup>
                </div>
                <div>
                    <MenuDrawer/>
                </div>
            </div>

            {selectButton === 'chats' ? <ChatComponents/> : <UsersSearchPage/>}
        </div>
    )
}