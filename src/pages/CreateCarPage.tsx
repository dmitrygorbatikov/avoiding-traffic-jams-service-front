import {Button, ButtonGroup, Card, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCar, postCar} from "../modules/car/actions";
import {languageSelector} from "../modules/auth/selectors";
import {engLanguage, uaLanguage} from "../localization";
import {changeLanguage} from "../modules/auth/actions";

export const CreateCarPage = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [number, setNumber] = useState('')
    const [titleError, setTitleError] = useState(false)
    const [numberError, setNumberError] = useState(false)
    const language = useSelector(languageSelector)
    const currentLanguage = language === 'ua' ? uaLanguage : engLanguage
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
            <div style={{margin: 20, display: 'flex', justifyContent: 'space-between'}}>
                <div/>
                <div style={{marginTop: 10}}>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button disabled={language === 'ua'} onClick={() => {
                            dispatch(changeLanguage('ua'))
                        }}>Українська</Button>
                        <Button disabled={language === 'eng'} onClick={() => {
                            dispatch(changeLanguage('eng'))
                        }}>English</Button>
                    </ButtonGroup>
                </div>
            </div>
            <div style={{textAlign: 'center', marginTop: 20}}>
                <Typography>{currentLanguage.youNeedToCreateCar}</Typography>
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
                        marginTop: 10,
                        color: 'red',
                        display: `${!titleError && !numberError ? 'none' : ''}`
                    }}
                >
                    {currentLanguage.fieldsAreRequired}
                </Typography>
                <div style={{marginTop: 20}}>
                    <TextField
                        error={titleError}
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                            setTitleError(false)
                        }}
                        placeholder={currentLanguage.title}
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
                        placeholder={currentLanguage.number}
                    />
                </div>
                <div style={{marginTop: 15, marginBottom: 20}}>
                    <Button color="success" variant="contained" onClick={createCar}>{currentLanguage.createCar}</Button>
                </div>
            </div>
        </div>
    )
}