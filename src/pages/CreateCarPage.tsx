import {Button, Card, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getCar, postCar} from "../modules/car/actions";

export const CreateCarPage = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [number, setNumber] = useState('')
    const [titleError, setTitleError] = useState(false)
    const [numberError, setNumberError] = useState(false)
    const createCar = () => {
        if (title && number) {
            dispatch(postCar({title, number}))
        }
        if (!title) {
            setTitleError(true)
        }
        if (!number) {
            setNumberError(true)
        }
    }
    useEffect(() => {
        dispatch(getCar())
    }, [])
    return (
        <div>
            <div style={{textAlign: 'center', marginTop: 20}}>
                <Typography>You need to create car</Typography>
            </div>
            <div style={{
                margin: '0 auto',
                marginTop: '8vh',
                background: '#f7f7f7',
                border: '1px solid #c9c9c9',
                borderRadius: 4,
                boxShadow: '5px 5px 5px #8a8a8a',
                width: 300,
                textAlign: 'center'
            }}>
                <Typography
                    style={{
                        color: 'red',
                        display: `${!titleError && !numberError ? 'none' : ''}`
                    }}
                >
                    Fields are required
                </Typography>
                <div style={{marginTop: 20}}>
                    <TextField
                        error={titleError}
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                            setTitleError(false)
                        }}
                        placeholder="Title"
                    />
                </div>
                <div style={{marginTop: 15}}>
                    <TextField
                        error={numberError}
                        value={number}
                        onChange={(e) => {
                            setNumber(e.target.value)
                            setNumberError(false)
                        }}
                        placeholder="Number"
                    />
                </div>
                <div style={{marginTop: 15, marginBottom: 20}}>
                    <Button color="success" variant="contained" onClick={createCar}>Create car</Button>
                </div>
            </div>
        </div>
    )
}