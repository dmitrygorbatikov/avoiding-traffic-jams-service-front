import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {errorSelector, languageSelector, loadingSelector} from "../modules/auth/selectors";
import {changeLanguage, register} from "../modules/auth/actions";
import {Alert, Box, Button, ButtonGroup, Card, LinearProgress, OutlinedInput, Snackbar} from "@mui/material";
import {useHistory} from "react-router";
import {PROJECT_NAME} from "../helpers/common";
import {engLanguage, uaLanguage} from "../localization";

const RegisterPage = () => {
    const history = useHistory()
    const [name, setName] = useState<string>('')
    const [surname, setSurname] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useDispatch()
    const [openSnackBar, setOpenSnackBar] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const error = useSelector(errorSelector)
    const loading = useSelector(loadingSelector)
    const language = useSelector(languageSelector)
    const currentLanguage = language === 'ua' ? uaLanguage : engLanguage
    const registerUser = () => {
        if (!username || !password) {
            setErrorMessage(currentLanguage.usernameAndPasswordNotMustBeEmpty)
            setOpenSnackBar(true)
            setName('')
            setSurname('')
            setUsername('')
            setPassword('')
        } else {
            dispatch(register({name, surname, username, password}))
            setName('')
            setSurname('')
            setUsername('')
            setPassword('')
            if (!loading) {
                if (error) {
                    setErrorMessage(error)
                    setOpenSnackBar(true)
                }
            }
        }
    }
    if (loading) {
        return (
            <Box sx={{width: '100%'}}>
                <LinearProgress/>
            </Box>
        )
    }
    return (
        <div className="register">
            <span className="register__header">{`${PROJECT_NAME} | ${currentLanguage.register}`}</span>
            <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={() => setOpenSnackBar(false)}>
                <Alert onClose={() => setOpenSnackBar(false)} severity="error" sx={{width: '100%'}}>
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Card className="register__form">
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
                <OutlinedInput
                    className="register__name-input"
                    placeholder={currentLanguage.name}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
                <OutlinedInput
                    className="register__surname-input"
                    placeholder={currentLanguage.surname}
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}/>
                <OutlinedInput
                    className="register__email-input"
                    placeholder={currentLanguage.userName}
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
                <br/>
                <OutlinedInput
                    className="register__password-input"
                    placeholder={currentLanguage.password}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                <br/>
                <Button variant="outlined" color="primary" className="register__button" onClick={registerUser}>{currentLanguage.signUp}</Button>
                <div className="register__not-registered">
                    <p className="register__bottom-p">{currentLanguage.alreadyRegistered}</p>
                    <Button onClick={() => {
                        history.push('/login')
                    }}>{currentLanguage.signIn}</Button>
                </div>
            </Card>
        </div>
    )
}
export default RegisterPage