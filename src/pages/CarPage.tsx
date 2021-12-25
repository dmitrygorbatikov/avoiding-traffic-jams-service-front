import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCar} from "../modules/car/actions";
import {Card, Typography} from "@mui/material";
import {carSelector} from "../modules/car/selectors";
import MenuDrawer from "../components/home/MenuDrawer";
import {EditCarDialog} from "../components/car/EditCarDialog";
import {msToTime} from "../helpers/functions";

export const CarPage = () => {
    const dispatch = useDispatch()
    const car = useSelector(carSelector)
    useEffect(() => {
        dispatch(getCar())
    }, [])
    console.log(car)
    return (
        <div style={{padding: 15}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div></div>
                <div><MenuDrawer/></div>
            </div>
            <div>
                <Typography variant="h3" style={{textAlign: 'center'}}>My car data</Typography>
            </div>
            <div style={{maxWidth: 400, margin: '0 auto', marginTop: 100}}>
                <Card style={{
                    padding: 20,
                    minHeight: 200,
                    background: '#6e6d6d',
                    color: '#fff',
                    boxShadow: '5px 5px 5px #4f4d4d',
                    border: '1px solid #ababab'
                }}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <Typography>Title: {car.title}</Typography>
                            <Typography>Number: {car.number}</Typography>
                            <Typography>Register date: {msToTime(Date.parse(car.registerDate))}</Typography>
                            <Typography>Updated date: {msToTime(Date.parse(car.updatedDate))}</Typography>
                        </div>
                        <div>
                            <EditCarDialog data={{title: car.title, number: car.number}}/>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}