import { ReactNode, useEffect, useState } from "react";

// Context States
import { CalendarState } from "../../../context/CalendarContext";
import { ModalState } from "../../../context/ModalContext";

// Components
import { Box, TextField, Switch, FormControlLabel, Grid, Select, DialogActions, MenuItem, FormControl, Divider, Typography, Button } from "@mui/material";
import { MobileDatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from "@mui/x-date-pickers";
import TimePickerComboBox from './TimePickerComboBox'

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
    children?: ReactNode;
    title:string;
}
interface INewTaskForm {
    day?:Date;
    time?: number;
    calendars: Calendar[];
    event?:Event
}
const SectionDivider = (props:ISectionDivider) => {
    const { children, title } = props;
    return (
        <Box sx={{ mb: 2, width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ pr: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {children}
                <Typography sx={{ px: 2, }} variant="body1">{title}</Typography>
            </Box>
            <Divider sx={{ width: "100%", flex: 1 }} />
        </Box>
    )
}

const NewTaskForm = (props:INewTaskForm) => {
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
        timeValue: event ? event.eventStartTime : time ? new Date().setTime(time) : 0,
        allDay: event ? event.allDay : false,
        taskDescription: event ? event.description : "",
        calendar: event ? 0 : 0,
        formErrors: { name: '', dateValue: '', timeValue: '' },
        nameValid: event ? true : false,
        dateValid: true,
        timeValid: true,
    })
    const [formValid, setFormValid] = useState(event ? true : false);

    // Hooks
    useEffect(() => {
        setFormValid(formState.nameValid && formState.dateValid && formState.timeValid);
    }, [formState.nameValid, formState.dateValid, formState.timeValid])

    // Functions
    const handleUserInput = (e:any, inputName = "", inputValue = "") => {
        const name = e ? e.target.name : inputName;
        const value = e ? e.target.value : inputValue;
        validateField(name, value);
    }

    const validateField = (fieldName:string, value:any) => {
        let fieldValidationErrors = formState.formErrors;
        let nameValid = formState.nameValid;
        let dateValid = formState.dateValid;
        let timeValid = formState.timeValid;

        switch (fieldName) {
            case 'name':
                nameValid = value.length > 0 ? true : false;
                fieldValidationErrors.name = nameValid ? '' : ' is empty';
                break;
            case 'allDay':
                if (!formState.allDay) {
                    timeValid = true;
                }
                else {
                    if (formState.timeValue < 0) {
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

    const handleAddTask = async () => {
        const eventData = {
            calendar_id: calendars[formState.calendar].id,
            name: formState.name,
            description: formState.taskDescription,
            type: 'task',
            eventDate: addHours(formState.dateValue, 6),
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
                body: JSON.stringify({ ...eventData, id: event.id }),
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
                body: JSON.stringify(eventData),
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
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',

                }}
            >
                <Box sx={{ width: "100%", mb: 2 }}>
                    <SectionDivider title="Task Name"><BorderColorIcon color="primary" /></SectionDivider>

                    <TextField required onChange={(e) => handleUserInput(e)} id="name" name="name" label=""
                        value={formState.name} placeholder="Add a Task name" variant="outlined" size="small"
                        fullWidth
                        helperText={formState.nameValid ? "" : "Task must have a name"}
                        error={!formState.nameValid}
                        inputProps={{ maxLength: 60 }} />
                </Box>
                <SectionDivider title="Task Time & Date"><AccessTimeIcon color="primary" /></SectionDivider>
                <Grid container sx={{ width: '100%', mb: 2 }} spacing={2}>
                    <Grid item xs={9}>
                        <MobileDatePicker
                            inputFormat="MM/dd/yyyy"
                            value={formState.dateValue}
                            onChange={(newValue:any) => {
                                handleUserInput(null, 'dateValue', newValue)
                            }}
                            onError={() => { setFormState({ ...formState, dateValid: false }) }}
                            onAccept={(newValue) => {
                                setFormState({ ...formState, dateValid: true });
                            }}

                            renderInput={(params) => <TextField size="small" sx={{ my: 0, }} fullWidth {...params} />}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Box sx={{ width: "100%", height: "100%", display: 'flex', alignItems: 'center' }}>
                            <FormControlLabel sx={{}} control={<Switch size="small" checked={formState.allDay}
                                onChange={(event: any) => {
                                    handleUserInput(null, 'allDay', event.target.checked);
                                }} />} label={<Typography fontSize="small" variant="body1">All Day</Typography>} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} >
                        <TimePickerComboBox
                            onChange={(newValue:any) => {
                                handleUserInput(null, 'timeValue', newValue);
                            }}
                            value={timeStamps[formState.timeValue]}
                            error={formState.timeValid}
                            disabled={formState.allDay}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ width: "100%", mb: 2, }}>
                    <SectionDivider title="Task Description"><TocIcon color="primary" /></SectionDivider>

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

                <DialogActions>

                    <Button onClick={handleAddTask} size="large" variant="contained" disabled={!formValid}>
                        {event ? "Save Task" : "Add Task"}
                    </Button>
                </DialogActions>
            </Box>
        </LocalizationProvider >
    )
}

export default NewTaskForm;