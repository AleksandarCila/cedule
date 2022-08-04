import { useState } from 'react';
import { Button, Box, Divider } from '@mui/material'

import EventList from './EventListComponents/EventList'
import CalendarTabPanel from './CalendarTabPanel.js'
import ResponsiveDrawer from './ResponsiveDrawer'
import CalendarList from './CalendarListComponents/CalendarList'

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';

const drawerStyle = { width: { xs: "0%", lg: "20%" }, maxWidth: { xs: 0, lg: 240 } }

const daysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const minYear = 2021;
const maxYear = 2024;

const MyCalendar = props => {
    const [openOptions, setOpenOptions] = useState(false);
    const [openTasks, setOpenTasks] = useState(false);

    return (
        <div style={{ width: "100%" }}>


            <Box sx={{ width: "100%", display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box sx={drawerStyle}>
                    <ResponsiveDrawer anchor="left" mobileOpenCalendarList={openOptions} closeCalendarList={() => setOpenOptions(false)}>
                        <CalendarList />
                    </ResponsiveDrawer>
                </Box>
                <Box sx={{ flex: 1, height: "100vh",border:"1px solid #e2e2e2", display: 'flex', justifyContent: 'space-between', flexDirection: 'column', overflowY: "hidden" }}>
                    <Box sx={{ pt:1,px:1,display: { xs: "flex", lg: "none" }, justifyContent: 'space-between', alignItems: 'center' }}>
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