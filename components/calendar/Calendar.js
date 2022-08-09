import { useState, useEffect } from 'react';
import { Button, Box, Divider } from '@mui/material'

import { CalendarState } from '../../context/CalendarContext';

import EventList from './EventListComponents/EventList'
import CalendarTabPanel from './CalendarTabPanel.js'
import ResponsiveDrawer from './ResponsiveDrawer'
import CalendarList from './CalendarListComponents/CalendarList'

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';

const drawerStyle = { width: { xs: "0%", lg: "20%" }, maxWidth: { xs: 0, lg: 240 } }


const MyCalendar = props => {
    const [openOptions, setOpenOptions] = useState(false);
    const [openTasks, setOpenTasks] = useState(false);

    const {
        state: { calendarState },
        dispatch,
    } = CalendarState();

    useEffect(async() => {
        const res = await fetch("api/calendar/getAllCalendars", {
            method: "GET",
        });
        const calendars = await res.json();
        console.log(calendars);
        dispatch({
            type:"SET_CALENDARS",
            calendars:calendars,
        })
    }, [])

    // Using the hook
    return (
        <div style={{ width: "100%" }}>


            <Box sx={{ width: "100%", display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box sx={drawerStyle}>
                    <ResponsiveDrawer anchor="left" mobileOpenCalendarList={openOptions} closeCalendarList={() => setOpenOptions(false)}>
                        <CalendarList />
                    </ResponsiveDrawer>
                </Box>
                <Box sx={{ flex: 1, height: "100vh", border: "1px solid #e2e2e2", display: 'flex', justifyContent: 'space-between', flexDirection: 'column', overflowY: "hidden" }}>
                    <Box sx={{ pt: 1, px: 1, display: { xs: "flex", lg: "none" }, justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button size="small" variant="outlined" endIcon={<CalendarMonthIcon />} onClick={() => setOpenOptions(prev => !prev)}>
                            Calendars
                        </Button>
                        <Button size="small" variant="outlined" startIcon={<ScheduleIcon />} onClick={() => setOpenTasks(prev => !prev)}>
                            Agenda
                        </Button>

                    </Box>
                    <CalendarTabPanel />
                </Box>
                <Box sx={drawerStyle}>
                    <ResponsiveDrawer anchor="right" mobileOpenCalendarList={openTasks} closeCalendarList={() => setOpenTasks(false)}>
                        <EventList />
                    </ResponsiveDrawer>
                </Box>
            </Box>

        </div>
    )
}

export default MyCalendar;