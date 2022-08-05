import { useState, useEffect } from 'react';

import { Modal, Box, Typography, Button, Fab, TextField, FormControl, RadioGroup, Radio, FormControlLabel, FormLabel } from '@mui/material'

import { ModalState } from '../../context/ModalContext'


import { useTheme } from '@mui/material';
import { addAlphaToColor } from '../../utility/addAlphaToColor';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close'

import { calendarColors } from '../../utility/constants';

const NewCalendarModal = props => {
    const [value, setValue] = useState(0);

    const handleChange = (event) => {
        setFormState({
            ...formState,
            color: calendarColors[event.target.value]
        })
        setValue(event.target.value);
    };
    const [formState, setFormState] = useState({
        name: "",
        color: calendarColors[0],
        formErrors: { name: '', },
        nameValid: false,
    })
    const [formValid, setFormValid] = useState(false);
    const {
        state: { modalState },
        dispatch
    } = ModalState();

    const open = modalState.modalType === "NEW_CALENDAR" ? true : false;
    const theme = useTheme();

    const handleUserInput = (e, inputName = "", inputValue = "") => {
        const name = e ? e.target.name : inputName;
        const value = e ? e.target.value : inputValue;
        validateField(name, value);
    }

    const validateField = (fieldName, value) => {
        let fieldValidationErrors = formState.formErrors;
        let nameValid = formState.nameValid;

        switch (fieldName) {
            case 'name':
                nameValid = value.length > 0 ? true : false;
                fieldValidationErrors.nameValue = nameValid ? '' : ' is empty';
                break;
            default:
                break;
        }
        setFormState({
            ...formState,
            [fieldName]: value,
            formErrors: fieldValidationErrors,
            nameValid: nameValid,

        });

    }

    useEffect(() => {
        setFormValid(formState.nameValid);
    }, [formState.nameValid])

    const handleAddCalendar = () => {
        console.log("add Calendar")
    }


    return (
        <>
            {open &&
                <Modal
                    open={open}
                    onClose={() => dispatch(
                        {
                            type: "HIDE_MODAL",
                        }
                    )}
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',

                        width: { xs: "80vw", md: "50vw" },
                        height: "70vh",
                        overflow: 'hidden',
                        bgcolor: "#fff",
                        borderRadius: 5,
                        boxShadow: 24,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}>
                        <div style={{ width: "100%" }}>
                            <Fab
                                color="primary"
                                size="small"
                                onClick={() => {
                                    dispatch({
                                        type: "HIDE_MODAL",
                                    });
                                }}
                                sx={{
                                    position: 'absolute', top: 7, right: 10,
                                    display: "flex", justifyContent: 'center', alignItems: "center"
                                }}>
                                <CloseIcon />
                            </Fab>
                            <Box sx={{ width: "100%", height: 50, bgcolor: theme.palette.primary.main }}>

                            </Box>
                            <Typography variant="h5" sx={{ p: 2, }}>Add a new Calendar</Typography>
                            <Box sx={{ width: '100%', p: 2 }}>
                                <TextField required onChange={(e) => handleUserInput(e)} id="name" name="name" label="Calendar Name"
                                    value={formState.name} placeholder="Add a Calendar name" variant="outlined" size="small"
                                    fullWidth sx={{ mb: 2 }}
                                    helperText={formState.nameValid ? "" : "Calendar must have a name"}
                                    error={!formState.nameValid} />
                            </Box>
                            <Typography variant="body1" sx={{ px: 2, }}>Pick a Calendar color</Typography>
                            <FormControl sx={{ px: 3 }}>
                                <RadioGroup
                                    row
                                    aria-labelledby="colors-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={value}
                                    onChange={handleChange}
                                >
                                    {calendarColors.map((color, ind) => {
                                        return (

                                            <FormControlLabel value={ind} control={<Radio sx={{
                                                color: color, '&.Mui-checked': {
                                                    color: color,
                                                },
                                            }} />} />
                                        )
                                    })}
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <Button onClick={handleAddCalendar} size="large" variant="contained" disabled={!formValid} sx={{ my: 2, }}>
                            Add Calendar
                        </Button>
                    </Box>
                </Modal>}</>
    )

}

export default NewCalendarModal;