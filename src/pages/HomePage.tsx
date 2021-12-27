import React, {useEffect} from "react";
import {Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import MenuDrawer from "../components/home/MenuDrawer";
import {getUserProfile} from "../modules/user/actions";
import {getUserProfileLoadingSelector} from "../modules/user/selectors";
import {getCar} from "../modules/car/actions";
import {languageSelector} from "../modules/auth/selectors";
import {engLanguage, uaLanguage} from "../localization";
import { createClient } from "@google/maps"

const HomePage = () => {
    const dispatch = useDispatch()
    const loadingProfile = useSelector(getUserProfileLoadingSelector)
    const language = useSelector(languageSelector)
    const currentLanguage = language === 'ua' ? uaLanguage : engLanguage
    const googleMaps = createClient({
        key: "YOUR_API_KEY"
    })
    console.log(googleMaps)
    useEffect(() => {
        dispatch(getCar())
        dispatch(getUserProfile())
    }, [])
    return (
        <>{
            !loadingProfile &&
            <div className="home">
                <div className="home__navigation">
                    <div style={{marginLeft: 10}}><Typography variant="h4">{currentLanguage.home}</Typography></div>
                    <div><MenuDrawer/></div>
                </div>
            </div>
        }
            <div id="map"/>
        </>
    )
}
export default HomePage