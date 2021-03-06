import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    TextField
} from "@mui/material";
import React, {useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import {useDispatch, useSelector} from "react-redux";
import {putCar} from "../../modules/car/actions";
import {languageSelector} from "../../modules/auth/selectors";
import {engLanguage, uaLanguage} from "../../localization";

export const EditCarDialog = (props: any) => {
    const language = useSelector(languageSelector)
    const currentLanguage = language === 'ua' ? uaLanguage : engLanguage
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState<string>(props.data.title ?? '')
    const [number, setNumber] = useState<string>(props.data.number ?? '')
    const [titleError, setTitleError] = useState(false)
    const [numberError, setNumberError] = useState(false)
    const handleClickOpen = () => {
        setOpen(true);
    };
    const saveCarData = () => {
        if (title !== '' && number !== '') {
            dispatch(putCar({title, number}))
            handleClose()
        }
        if (!title) {
            setTitleError(true)
        }
        if (!number) {
            setNumberError(true)
        }
    }
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <IconButton style={{color: '#fff'}} onClick={handleClickOpen}>
                <EditIcon/>
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{currentLanguage.editYourCarData}</DialogTitle>
                <DialogContent>
                    <DialogContentText
                        style={{
                            color: 'red',
                            display: `${!titleError && !numberError ? 'none' : ''}`
                        }}>
                        Fields are required
                    </DialogContentText>
                    <TextField
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                            setTitleError(false)

                        }}
                        error={titleError}
                        autoFocus
                        margin="dense"
                        label={currentLanguage.title}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        value={number}
                        onChange={(e) => {
                            setNumber(e.target.value)
                            setNumberError(false)
                        }}
                        error={numberError}
                        margin="dense"
                        label={currentLanguage.number}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant={'outlined'} color={'error'} onClick={handleClose}>{currentLanguage.cancel}</Button>
                    <Button variant={'contained'} color={'success'} onClick={saveCarData}>{currentLanguage.save}</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}