import { useEffect, useState } from "react";

// Context States
import { CalendarState } from "../../../context/CalendarContext";
import { ModalState } from "../../../context/ModalContext";

// Components
import { Box, TextField, Switch, FormControlLabel, Grid, Select, DialogActions, MenuItem, FormControl, Divider, Typography, Button } from "@mui/material";
import { MobileDatePicker } from '@mui/x-date-pickers';
import TimePickerComboBox from './TimePickerComboBox'
import { LocalizationProvider } from "@mui/x-date-pickers";

// Utility
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addHours } from "date-fns";
import { timeStamps } from '../../../utility/constants'

// Icons
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TocIcon from '@mui/icons-material/Toc';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BorderColorIcon from '@mui/icons-material/BorderColor';

// Types
import TimeStampObject from '../../../types/interfaces/TimeStampObject'
import Calendar from '../../../types/interfaces/Calendar'
import Event from '../../../types/interfaces/Event'
interface ISectionDivider {
    children?: React.ReactNode;
    title: string;
}
interface INewEventForm {
    day?: Date;
    time?: number;
    calendars: Calendar[];
    event?: Event
}
const SectionDivider = (props: ISectionDivider) => {
    const { children, title } = props;
    return (
        <Box sx={{ mb: 2, width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ pr: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {children}
                <Typography sx={{ px: 2, }} variant="body1">{title}</Typography>
            </Box>
            <Divider sx={{ flex: 1 }} />

        </Box>
    )
}

const NewEventForm = (props: INewEventForm) => {
    const { day, time, calendars, event } = props;

    // States
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
        timeValueEnd: event ? (event.eventStartTime + event.eventLength) : time ? new Date().setTime(time + 1) : 1,
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

    // Hooks
    useEffect(() => {
        setFormValid(formState.nameValid && formState.dateValid && formState.timeStartValid && formState.timeEndValid);
    }, [formState.nameValid, formState.dateValid, formState.timeStartValid, formState.timeEndValid])

    // Functions
    const handleUserInput = (e: any, inputName = "", inpuValue = "") => {
        const name = e ? e.target.name : inputName;
        const value = e ? e.target.value : inpuValue;
        validateField(name, value);
    }

    const validateField = (fieldName: string, value: any) => {
        let fieldValidationErrors = formState.formErrors;
        let nameValid = formState.nameValid;
        let dateValid = formState.dateValid;
        let timeStartValid = formState.timeStartValid;
        let timeEndValid = formState.timeEndValid;

        let timeValueEnd = formState.timeValueEnd;
        switch (fieldName) {
            case 'name':
                nameValid = value.length > 0 ? true : false;
                fieldValidationErrors.name = nameValid ? '' : ' is empty';
                break;
            case 'allDay':
                if (!formState.allDay) {
                    timeEndValid = true;
                    timeStartValid = true;
                }
                else {
                    if (formState.timeValueStart < 0) {
                        timeStartValid = false
                    }
                    else { timeStartValid = true; }
                    if (formState.timeValueEnd < 0)
                        timeEndValid = false;
                    else timeEndValid = true;
                }
                break;
            case 'dateValue':
                fieldValidationErrors.dateValue = dateValid ? '' : ' is invalid';
                break;
            case 'timeValueStart':
                if (value > timeValueEnd) {
                    timeValueEnd = value + 1;
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

    const handleAddEvent = async () => {
        const eventData = {
            calendar_id: calendars[formState.calendar].id,
            name: formState.name,
            description: formState.taskDescription,
            type: 'event',
            eventDate: addHours(formState.dateValue, 2),
            eventStartTime: formState.timeValueStart,
            eventLength: formState.timeValueEnd - formState.timeValueStart,
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
                body: JSON.stringify({ ...eventData, id: event.id }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
        else {

            await fetch("/api/events/addNewEvent", {
                method: "POST",
                body: JSON.stringify(eventData),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(async (response) => {
                const newEvent = await response.json();

                dispatch({
                    type: "ADD_NEW_EVENT",
                    eventData: { ...eventData, id: newEvent.result.insertId }
                })
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
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <Box sx={{ width: "100%", mb: 2 }}>
                    <SectionDivider title="Event Name"><BorderColorIcon color="primary" /></SectionDivider>

                    <TextField required onChange={(e) => handleUserInput(e)} id="name" name="name" label=""
                        value={formState.name} placeholder="Add an Event name" variant="outlined" size="small"
                        fullWidth
                        helperText={formState.nameValid ? "" : "Event must have a name"}
                        error={!formState.nameValid}
                        inputProps={{ maxLength: 60 }} />
                </Box>

                <SectionDivider title="Event Time & Date"><AccessTimeIcon color="primary" /></SectionDivider>

                <Grid container sx={{ width: '100%', mb: 2 }} spacing={2}>
                    <Grid item xs={9}>
                        <MobileDatePicker
                            // label="Event Date"
                            inputFormat="MM/dd/yyyy"
                            value={formState.dateValue}
                            onChange={(newValue: any) => {
                                handleUserInput(null, 'dateValue', newValue)
                            }}
                            onError={() => { setFormState({ ...formState, dateValid: false }) }}
                            onAccept={(newValue) => {
                                setFormState({ ...formState, dateValid: true });
                            }}

                            renderInput={(params) => <TextField size="small" sx={{ my: 0, }} fullWidth {...params} />}
                        />
                    </Grid>
                    <Grid item xs={3} >
                        <Box sx={{ width: "100%", height: "100%", display: 'flex', alignItems: 'center' }}>
                            <FormControlLabel sx={{}} control={<Switch size="small" checked={formState.allDay}
                                onChange={(event: any) => {
                                    handleUserInput(null, 'allDay', event.target.checked);
                                }} />} label={<Typography fontSize="small" variant="body1">All Day</Typography>} />
                        </Box>
                    </Grid>
                    <Grid item xs={6} >

                        <TimePickerComboBox
                            label="Start Time"
                            onChange={(newValue: any) => {
                                handleUserInput(null, 'timeValueStart', newValue);
                            }}
                            value={timeStamps[formState.timeValueStart]}
                            error={formState.timeStartValid}
                            disabled={formState.allDay}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TimePickerComboBox
                            label="End Time"
                            onChange={(newValue: any) => {
                                handleUserInput(null, 'timeValueEnd', newValue);
                            }}
                            value={timeStamps[formState.timeValueEnd]}
                            minTime={timeStamps[formState.timeValueStart]}
                            error={formState.timeEndValid}
                            disabled={formState.allDay}

                        />
                    </Grid>

                </Grid>
                <Box sx={{ width: "100%", mb: 2 }}>
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
                </Box>

                <Box sx={{ width: "100%", mb: 2, }}>
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


                <DialogActions>
                    <Button onClick={async () => await handleAddEvent()} size="large" variant="contained" disabled={!formValid}>
                        {event ? "Save Event" : "Add Event"}
                    </Button>
                </DialogActions>
            </Box>
        </LocalizationProvider >
    )
}

export default NewEventForm;