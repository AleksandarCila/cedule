import { Box, TextField, Switch, FormControlLabel, Grid, Select, InputLabel, MenuItem, FormControl, Divider, Typography, Button } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";

import { TimePicker, MobileDatePicker } from '@mui/x-date-pickers';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TocIcon from '@mui/icons-material/Toc';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import TimePickerComboBox from './TimePickerComboBox'
import { timeStamps } from '../../../utility/constants'

import { CalendarState } from "../../../context/CalendarContext";
import { ModalState } from "../../../context/ModalContext";
import { addHours } from "date-fns";

const SectionDivider = props => {
    const { children, title } = props;
    return (
        <Box sx={{ mb: 2, width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ pr: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {children}
                <Typography sx={{ px: 2, }} variant="span">{title}</Typography>
            </Box>
            <Divider sx={{ width: "100%", flex: 1 }} />

        </Box>
    )
}

const NewReminderForm = props => {
    const { day, time, calendars, event } = props;
    const {
        dispatch,
    } = CalendarState();
    const {
        dispatch: dispatchModal
    } = ModalState();
    const [formState, setFormState] = useState({
        name: event ? event.name : "",
        dateValue: event ? event.eventDate : day ? day : new Date(),
        timeValue: event ? event.eventStartTime : time ? new Date().setTime(time) : 0,
        allDay: event ? event.allDay : false,
        calendar: event ? 0 : 0,
        formErrors: { name: '', dateValue: '', timeValue: '' },
        nameValid: event ? true : false,
        dateValid: true,
        timeValid: true,
    })
    const [formValid, setFormValid] = useState(event ? true : false);

    const handleUserInput = (e, inputName = "", inpuValue = "") => {
        const name = e ? e.target.name : inputName;
        const value = e ? e.target.value : inpuValue;
        validateField(name, value);
    }

    const validateField = (fieldName, value) => {
        let fieldValidationErrors = formState.formErrors;
        let nameValid = formState.nameValid;
        let dateValid = formState.dateValid;
        let timeValid = formState.timeValid;

        switch (fieldName) {
            case 'name':
                nameValid = value.length > 0 ? true : false;
                fieldValidationErrors.nameValue = nameValid ? '' : ' is empty';
                break;
            case 'allDay':
                if (!formState.allDay) {
                    timeValid = true;
                }
                else {
                    if (formState.timeValue.length === 0) {
                        timeValid = false
                    }
                    else { timeValid = true; }

                }
                break;
            case 'dateValue':
                fieldValidationErrors.dateValue = dateValid ? '' : ' is invalid';
                break;
            case 'timeValue':
                if (value == "") timeValid = false;

                else timeValid = true;
                fieldValidationErrors.timeValue = timeValid ? '' : ' is invalid';
                break;
            default:
                break;
        }
        setFormState({
            ...formState,
            [fieldName]: value,
            formErrors: fieldValidationErrors,
            nameValid: nameValid,
            dateValid: dateValid,
            timeValid: timeValid,

        });

    }
    useEffect(() => {
        setFormValid(formState.nameValid && formState.dateValid && formState.timeValid);
    }, [formState.nameValid, formState.dateValid, formState.timeValid])

    const handleAddReminder = async () => {
        const eventData = {
            calendar_id: calendars[formState.calendar].id,
            name: formState.name,
            description: "",
            type: 'reminder',
            eventDate: addHours(formState.dateValue,6),
            eventStartTime: formState.timeValue,
            eventLength: 1,
            color: calendars[formState.calendar].color,
            allDay: formState.allDay
        }
        if (event) {
            dispatch({
                type: "UPDATE_EVENT",
                eventData: { ...eventData, id: event.id }
            })
            await fetch("/api/events/updateEvent", {
                method: "POST",
                body: [JSON.stringify({ ...eventData, id: event.id })],
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
        else {
            dispatch({
                type: "ADD_NEW_EVENT",
                eventData: eventData
            })
            await fetch("/api/events/addNewEvent", {
                method: "POST",
                body: [JSON.stringify(eventData)],
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
        dispatchModal({ type: "HIDE_MODAL" })
    }
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box
                
                component="form"
                sx={{
                    m: 1,
                    // minHeight: 400,
                    height: "100%",
                    width: "100%",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}
                autoComplete="off"
            >
                <Box sx={{
                    width: "100%",
                }}>
                    <SectionDivider title="Reminder Name"><BorderColorIcon color="primary" /></SectionDivider>

                    <TextField required onChange={(e) => handleUserInput(e)} id="name" name="name" label=""
                        value={formState.name} placeholder="Add a Reminder name" variant="outlined" size="small"
                        fullWidth sx={{ mb: 2 }}
                        helperText={formState.nameValid ? "" : "Reminder must have a name"}
                        error={!formState.nameValid} />
                    <SectionDivider title="Reminder Time & Date"><AccessTimeIcon color="primary" /></SectionDivider>

                    <Grid container sx={{ width: '100%' }} rowSpacing={2}>
                        <Grid item xs={12}>
                            <MobileDatePicker
                                label="Reminder Date"
                                inputFormat="MM/dd/yyyy"
                                value={formState.dateValue}
                                onChange={(newValue) => {
                                    handleUserInput(null, 'dateValue', newValue)
                                }}
                                onError={() => { setFormState({ ...formState, dateValid: false }) }}
                                onAccept={(newValue) => {
                                    setFormState({ ...formState, dateValid: true });
                                }}

                                renderInput={(params) => <TextField size="small" sx={{ my: 0, }} fullWidth {...params} />}
                            />
                        </Grid>
                        <Grid item xs={6} >
                            <FormControlLabel sx={{}} control={<Switch checked={formState.allDay}
                                onChange={(event) => {
                                    handleUserInput(null, 'allDay', event.target.checked);
                                }} />} label="All day" />
                        </Grid>
                        <Grid item xs={6} >
                            <TimePickerComboBox
                                label="Start Time"
                                onChange={(newValue) => {
                                    handleUserInput(null, 'timeValue', newValue);
                                }}
                                value={timeStamps[formState.timeValue]}
                                error={formState.timeValid}
                                disabled={formState.allDay}
                            />
                        </Grid>

                    </Grid>
                    <Box sx={{ width: "100%", my: 2, }}>
                        <SectionDivider title="My Calendars"><ListAltIcon color="primary" /></SectionDivider>

                        <FormControl fullWidth>
                            <Select
                                labelId="calendar-select-label"
                                id="calendar-select"
                                value={formState.calendar}
                                label=""
                                name="calendar"
                                onChange={(event) => {
                                    handleUserInput(event);
                                }}
                                size="small"
                            >
                                {calendars.map((calendar, ind) => {
                                    return (
                                        <MenuItem key={ind} value={ind}>{calendar.name}</MenuItem>

                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                <div style={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button onClick={handleAddReminder} size="large" variant="contained" disabled={!formValid}>
                        {event ? "Save Reminder" : "Add Reminder"}
                    </Button>
                </div>
            </Box>
        </LocalizationProvider >
    )
}

export default NewReminderForm;