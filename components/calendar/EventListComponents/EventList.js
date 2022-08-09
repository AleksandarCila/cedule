import { CalendarState } from "../../../context/CalendarContext";
import Image from 'next/image'
import { useTheme, Skeleton, Typography, Box, Divider } from '@mui/material';
import { addAlphaToColor } from "../../../utility/addAlphaToColor";
import { isSameDay } from "date-fns";
import { useState, useEffect } from "react";
import EventCollapseGroup from './EventCollapseGroup'

import { daysLong, months } from "../../../utility/constants";

import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventIcon from '@mui/icons-material/Event';


const EventList = props => {
    const {
        state: { calendarState },
        dispatch,
    } = CalendarState();

    const [loading, setLoading] = useState(true);

    const theme = useTheme();

    const events = calendarState.todayEvents;
    useEffect(() => (setLoading(false)), [])
    return (
        <div>
            <div style={{ width: "100%", height: 113, position: 'relative' }}>
                <Image
                    src="/assets/tasks_header_image.jpg"
                    alt="To Do list on the computer cartoon"
                    layout='fill'
                    objectFit="cover"
                />
                <div
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: addAlphaToColor(theme.palette.primary.main, 0.4) }}
                >
                </div>
            </div>
            <Box sx={{ width: '100%', p: 1 }}>
                <Typography variant="h6">
                    {daysLong[calendarState.selectedDate.getDay()] + " " + calendarState.selectedDate.getDate() + ", " + months[calendarState.selectedDate.getMonth()]}
                </Typography>
                {/* <EventCollapseGroup events={events} label="Events" /> */}
                {events && events.length>0 && <>
                    <EventCollapseGroup events={events[1].events} label={events[1].label}><AssignmentIcon /></EventCollapseGroup>
                    <EventCollapseGroup events={events[2].events} label={events[2].label}><NotificationsActiveIcon /></EventCollapseGroup>
                    <EventCollapseGroup events={events[0].events} label={events[0].label}><EventIcon /></EventCollapseGroup>
                </>
                }
                {loading && <Skeleton variant="rectangular" width="100%" height={118} />}
            </Box>

        </div>
    )
}

export default EventList;