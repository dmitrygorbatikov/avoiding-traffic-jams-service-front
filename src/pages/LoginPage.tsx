import React, {useState} from "react";
import {Alert, Box, Button, ButtonGroup, Card, LinearProgress, OutlinedInput, Snackbar} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {changeLanguage, login} from "../modules/auth/actions";
import {errorSelector, languageSelector, loadingSelector} from "../modules/auth/selectors";
import {useHistory} from "react-router";
import {PROJECT_NAME} from "../helpers/common";
import {engLanguage, uaLanguage} from "../localization";

const LoginPage = () => {
    const history = useHistory()
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useDispatch()
    const [openSnackBar, setOpenSnackBar] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const error = useSelector(errorSelector)
    const loading = useSelector(loadingSelector)
    const language = useSelector(languageSelector)
    const currentLanguage = language === 'ua' ? uaLanguage : engLanguage
    const loginUser = () => {
        if (!username || !password) {
            setErrorMessage(currentLanguage.usernameAndPasswordNotMustBeEmpty)
            setOpenSnackBar(true)
            setUsername('')
            setPassword('')
        } else {
            dispatch(login({username, password}))
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
        <div className="login">
            <span className="login__header">{`${PROJECT_NAME} | ${currentLanguage.login}`}</span>
            <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={() => setOpenSnackBar(false)}>
                <Alert onClose={() => setOpenSnackBar(false)} severity="error" sx={{width: '100%'}}>
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Card className="login__form">
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
                <div>
                    <OutlinedInput
                        className="login__email-input"
                        placeholder={currentLanguage.userName} type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <br/>
                <div>
                    <OutlinedInput
                        className="login__input"
                        placeholder={currentLanguage.password}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <br/>
                <Button
                    variant="outlined"
                    color="primary"
                    className="login__button"
                    onClick={loginUser}
                >
                    {currentLanguage.signIn}
                </Button>
                <div className="login__not-registered">
                    <p className="login__bottom-p">{currentLanguage.notRegistered}</p>
                    <Button onClick={() => {
                        history.push('/register')
                    }}>{currentLanguage.signUp}</Button>
                </div>
            </Card>
        </div>
    )
}
export default LoginPage