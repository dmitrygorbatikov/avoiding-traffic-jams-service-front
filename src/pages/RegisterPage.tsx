import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {errorSelector, loadingSelector} from "../modules/auth/selectors";
import {register} from "../modules/auth/actions";
import {Alert, Box, Button, Card, LinearProgress, OutlinedInput, Snackbar} from "@mui/material";
import {useHistory} from "react-router";
import {PROJECT_NAME} from "../helpers/common";

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
    const registerUser = () => {
        if (!username || !password) {
            setErrorMessage('Username and password not must be empty')
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
            <span className="register__header">{`${PROJECT_NAME} | REGISTER`}</span>
            <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={() => setOpenSnackBar(false)}>
                <Alert onClose={() => setOpenSnackBar(false)} severity="error" sx={{width: '100%'}}>
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Card className="register__form">
                    <OutlinedInput className="register__name-input" placeholder="Name" type="text"
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}/>
                    <OutlinedInput className="register__surname-input" placeholder="Surname" type="text"
                                   value={surname}
                                   onChange={(e) => setSurname(e.target.value)}/>
                    <OutlinedInput className="register__email-input" placeholder="Username" type="text"
                                   value={username}
                                   onChange={(e) => setUsername(e.target.value)}/>
                <br/>
                    <OutlinedInput className="register__password-input" placeholder="Password" type="password" value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                <br/>
                <Button variant="outlined" color="primary" className="register__button" onClick={registerUser}>Sign
                    In</Button>
                <div className="register__not-registered">
                    <p className="register__bottom-p">Already registered ?</p>
                    <Button onClick={() => {
                        history.push('/login')
                    }}>Sign In</Button>
                </div>
            </Card>
        </div>
    )
}
export default RegisterPage