import { CalendarState } from "../../../context/CalendarContext";
import Image from 'next/image'
import { useTheme, Skeleton, Typography, Box, Divider } from '@mui/material';
import { addAlphaToColor } from "../../../utility/addAlphaToColor";
import { isSameDay } from "date-fns";
import { useState, useEffect } from "react";
import EventCollapseGroup from './EventCollapseGroup'

import { daysLong, months } from "../../../utility/constants";

const EventList = props => {
    const {
        state: { calendarState },
        dispatch,
    } = CalendarState();

    const [loading, setLoading] = useState(true);

    const theme = useTheme();

    // let events = calendarState.events.filter((event) => {
    //     if (isSameDay(calendarState.selectedDate, event.eventDate)) return event;

    // });
    // events = events.sort((a, b) => { return a.eventStartTime - b.eventStartTime })

    const events=calendarState.todayEvents;
    console.log(events);
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
                {!loading && events && events.map((event, ind) => {
                    return <Box key={ind} sx={{my:1}}>
                        <EventCollapseGroup events={event.events} label={event.name} color={event.color}/>
                        {/* <Divider /> */}
                    </Box>

                })}
                {loading && <Skeleton variant="rectangular" width="100%" height={118} />}
            </Box>

        </div>
    )
}

export default EventList;