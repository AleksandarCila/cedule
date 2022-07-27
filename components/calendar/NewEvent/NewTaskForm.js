import { Box, TextField, Switch, FormControlLabel, Grid, Select, InputLabel, MenuItem, FormControl, Divider, Typography, Button } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";

import { TimePicker, MobileDatePicker } from '@mui/x-date-pickers';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TocIcon from '@mui/icons-material/Toc';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BorderColorIcon from '@mui/icons-material/BorderColor';

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

const NewTaskForm = props => {
    const {day, time} = props;
    const [dateValue, setDateValue] = useState(day);
    const [timeValue, setTimeValue] = useState(new Date().setTime(time))
    const [allDay, setAllDay] = useState(false);
    const [taskDescription, setTaskDescription] = useState("");
    const [calendar, setCalendar] = useState('Kalendar1');

    const handleChange = (event) => {
        setCalendar(event.target.value);
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>

            <Box
                component="form"
                sx={{
                    m: 1,
                    minHeight: 400,
                }}
                noValidate
                autoComplete="off"
            >

                <SectionDivider title="Task Name"><BorderColorIcon color="primary" /></SectionDivider>

                <TextField id="name" label="" placeholder="Add a Task name" variant="outlined" size="small" fullWidth sx={{ mb: 2 }} />
                <SectionDivider title="Task Time & Date"><AccessTimeIcon color="primary" /></SectionDivider>

                <Grid container sx={{ width: '100%' }} rowSpacing={2}>
                    <Grid item xs={12}>
                        <MobileDatePicker
                            label="Task Date"
                            inputFormat="MM/dd/yyyy"
                            value={dateValue}
                            onChange={(newValue) => setDateValue(newValue)}
                            renderInput={(params) => <TextField size="small" sx={{ my: 0, }} fullWidth {...params} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControlLabel sx={{}} control={<Switch checked={allDay}
                            onChange={(event) => {
                                setAllDay(event.target.checked);
                            }} />} label="All day" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TimePicker
                            label="Task Time"
                            value={timeValue}
                            onChange={(newValue) => {
                                setTimeValue(newValue);
                            }}
                            disabled={allDay}
                            renderInput={(params) => <TextField fullWidth size="small"  {...params} />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SectionDivider title="Task Description"><TocIcon color="primary" /></SectionDivider>

                        <TextField
                            id="task-description-input"
                            label=""
                            placeholder="Add a short description"
                            size="small"
                            multiline
                            rows={5}
                            fullWidth
                            value={taskDescription}
                            onChange={(event) => {
                                setTaskDescription(event.target.value);
                            }}
                        />
                    </Grid>
                </Grid>

                <Box sx={{ width: "100%", my: 2, }}>
                    <SectionDivider title="My Calendars"><ListAltIcon color="primary" /></SectionDivider>

                    <FormControl fullWidth>
                        {/* <InputLabel id="demo-simple-select-label">Calendars</InputLabel> */}
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={calendar}
                            label=""
                            onChange={handleChange}
                            size="small"
                        >
                            <MenuItem value="Kalendar1">Kal Ime 1</MenuItem>
                            <MenuItem value="Kalendar2">Kal Ime 2</MenuItem>
                            <MenuItem value="Kalendar3">Kal Ime 3</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <div style={{width:"100%", display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Button size="large" variant="contained">
                        Add Task
                    </Button>
                </div>
            </Box>
        </LocalizationProvider >
    )
}

export default NewTaskForm;