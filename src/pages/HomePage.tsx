import React, {useEffect} from "react";
import {Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import MenuDrawer from "../components/home/MenuDrawer";
import {getUserProfile} from "../modules/user/actions";
import {getUserProfileLoadingSelector} from "../modules/user/selectors";
import {getCar} from "../modules/car/actions";

const HomePage = () => {
    const dispatch = useDispatch()
    const loadingProfile = useSelector(getUserProfileLoadingSelector)

    useEffect(() => {
        dispatch(getCar())
        dispatch(getUserProfile())
    }, [])
    return (
        <>{
            !loadingProfile &&
            <div className="home">
                <div className="home__navigation">
                    <div style={{marginLeft: 10}}><Typography variant="h4">Home</Typography></div>
                    <div><MenuDrawer/></div>
                </div>
            </div>
        }
        </>
    )
}
export default HomePage