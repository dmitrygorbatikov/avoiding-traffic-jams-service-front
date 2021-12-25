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
import {useDispatch} from "react-redux";
import {putCar} from "../../modules/car/actions";

export const EditCarDialog = (props: any) => {
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
                <DialogTitle>Edit your car data</DialogTitle>
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
                        label="Title"
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
                        label="Number"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant={'outlined'} color={'error'} onClick={handleClose}>Cancel</Button>
                    <Button variant={'contained'} color={'success'} onClick={saveCarData}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}