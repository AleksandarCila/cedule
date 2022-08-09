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

const SectionDivider = props => {
    const { children, title } = props;
    return (
        <Box sx={{ mb: 2, width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ pr: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {children}
                <Typography sx={{ px: 2, }} variant="span">{title}</Typography>
            </Box>
            <Divider sx={{ flex: 1 }} />

        </Box>
    )
}

const NewEventForm = props => {
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
        timeValueStart: event ? event.eventStartTime : time ? new Date().setTime(time) : 0,
        timeValueEnd: event ? (event.eventStartTime + event.eventLength) : time ? new Date().setTime(time) : 0,
        allDay: event ? event.allDay : false,
        taskDescription: event ? event.description : "",
        calendar: event ? 0 : 0,
        formErrors: { name: '', dateValue: '', timeValueStart: '', timeValueEnd: '' },
        nameValid: event ? true : false,
        dateValid: true,
        timeStartValid: true,
        timeEndValid: true,
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
        let timeStartValid = formState.timeStartValid;
        let timeEndValid = formState.timeEndValid;

        let timeValueEnd = formState.timeValueEnd;
        switch (fieldName) {
            case 'name':
                nameValid = value.length > 0 ? true : false;
                fieldValidationErrors.nameValue = nameValid ? '' : ' is empty';
                break;
            case 'allDay':
                if (!formState.allDay) {
                    timeEndValid = true;
                    timeStartValid = true;
                }
                else {
                    if (formState.timeValueStart.length === 0) {

                        console.log(formState.timeValueStart.length)

                        timeStartValid = false
                    }
                    else { timeStartValid = true; }
                    if (formState.timeValueEnd === "")
                        timeEndValid = false;
                    else timeEndValid = true;
                }
                break;
            case 'dateValue':
                fieldValidationErrors.dateValue = dateValid ? '' : ' is invalid';
                break;
            case 'timeValueStart':
                if (value > timeValueEnd) {
                    timeValueEnd = value;
                    timeEndValid = true;
                }

                if (value == "") timeStartValid = false;

                else timeStartValid = true;

                fieldValidationErrors.timeValueStart = timeStartValid ? '' : ' is invalid';
                break;
            case 'timeValueEnd':
                timeValueEnd = value;
                if (value == "") timeEndValid = false;
                else timeEndValid = true;

                fieldValidationErrors.timeValueEnd = timeEndValid ? '' : ' is invalid';
                break;
            default:
                break;
        }
        setFormState({
            ...formState,
            [fieldName]: value,
            timeValueEnd: timeValueEnd,
            formErrors: fieldValidationErrors,
            nameValid: nameValid,
            dateValid: dateValid,
            timeStartValid: timeStartValid,
            timeEndValid: timeEndValid,

        });

    }
    useEffect(() => {
        setFormValid(formState.nameValid && formState.dateValid && formState.timeStartValid && formState.timeEndValid);
    }, [formState.nameValid, formState.dateValid, formState.timeStartValid, formState.timeEndValid])

    const handleAddEvent = async () => {
        const eventData = {
            calendar_id: calendars[formState.calendar].id,
            name: formState.name,
            description: formState.taskDescription,
            type: 'event',
            eventDate: formState.dateValue,
            eventStartTime: formState.timeValueStart,
            eventLength: formState.timeValueEnd - formState.timeValueStart,
            color: calendars[formState.calendar].color,
            allDay: formState.allDay
        }
        if (event) {
            dispatch({
                type: "UPDATE_EVENT",
                eventData: {...eventData, id:event.id}
            })
            await fetch("/api/events/updateEvent", {
                method: "POST",
                body: [JSON.stringify({...eventData, id:event.id})],
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
                <Box sx={{ width: "100%" }}>
                    <SectionDivider title="Event Name"><BorderColorIcon color="primary" /></SectionDivider>

                    <TextField required onChange={(e) => handleUserInput(e)} id="name" name="name" label=""
                        value={formState.name} placeholder="Add an Event name" variant="outlined" size="small"
                        fullWidth sx={{ mb: 2 }}
                        helperText={formState.nameValid ? "" : "Event must have a name"}
                        error={!formState.nameValid} />
                    <SectionDivider title="Event Time & Date"><AccessTimeIcon color="primary" /></SectionDivider>

                    <Grid container sx={{ width: '100%' }} spacing={2}>
                        <Grid item xs={6}>
                            <MobileDatePicker
                                label="Event Date"
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

                            <TimePickerComboBox
                                label="Start Time"
                                onChange={(newValue) => {
                                    handleUserInput(null, 'timeValueStart', newValue);
                                    // if (newValue > formState.timeValueEnd) handleUserInput(null, 'timeValueEnd', newValue)
                                }}
                                value={timeStamps[formState.timeValueStart]}
                                error={formState.timeStartValid}
                                disabled={formState.allDay}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TimePickerComboBox
                                label="End Time"
                                onChange={(newValue) => {
                                    handleUserInput(null, 'timeValueEnd', newValue);
                                }}
                                value={timeStamps[formState.timeValueEnd]}
                                minTime={timeStamps[formState.timeValueStart]}
                                error={formState.timeEndValid}
                                disabled={formState.allDay}

                            />
                        </Grid>
                        <Grid item xs={6} >
                            <FormControlLabel sx={{}} control={<Switch checked={formState.allDay}
                                onChange={(event) => {
                                    handleUserInput(null, 'allDay', event.target.checked);
                                }} />} label="All day" />
                        </Grid>

                        <Grid item xs={12}>
                            <SectionDivider title="Event Description"><TocIcon color="primary" /></SectionDivider>

                            <TextField
                                id="task-description-input"
                                label=""
                                name="taskDescription"
                                placeholder="Add a short description"
                                size="small"
                                multiline
                                rows={3}
                                fullWidth
                                value={formState.taskDescription}
                                onChange={(event) => {
                                    handleUserInput(event);
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ width: "100%", my: 2, }}>
                        <SectionDivider title="My Calendars"><ListAltIcon color="primary" /></SectionDivider>

                        <FormControl fullWidth>
                            {/* <InputLabel id="demo-simple-select-label">Calendars</InputLabel> */}
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
                    <Button onClick={handleAddEvent} size="large" variant="contained" disabled={!formValid}>
                        {event ? "Save Event" : "Add Event"}
                    </Button>
                </div>
            </Box>
        </LocalizationProvider >
    )
}

export default NewEventForm;