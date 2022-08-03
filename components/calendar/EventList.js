import { CalendarState } from "../../context/CalendarContext";
import Image from 'next/image'
import { useTheme, Skeleton } from '@mui/material';
import { addAlphaToColor } from "../../utility/addAlphaToColor";
import { isSameDay } from "date-fns";
import { useState, useEffect } from "react";

const EventList = props => {
    const {
        state: { calendarState },
        dispatch,
    } = CalendarState();

    const [loading, setLoading] = useState(true);

    const theme = useTheme();

    let events = calendarState.events.filter((event) => {
        if (isSameDay(calendarState.selectedDate, event.eventDate)) return event;

    });
    events = events.sort((a, b) => { return a.eventStartTime - b.eventStartTime })

    useEffect(()=>(setLoading(false)), [])

    return (
        <div>
            <div style={{ width: "100%", height: 113, position: 'relative' }}>
                <Image
                    src="/assets/tasks_header_image.jpg"
                    alt="To Do list on the computer cartoon"
                    layout='fill'
                    // width={300}
                    // height="100"

                    objectFit="cover"
                // height={300}
                />
                <div
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: addAlphaToColor(theme.palette.primary.main, 0.4) }}
                >

                </div>

            </div>
            {calendarState.selectedDate.getDate()}
            {!loading && events && events.map((event, ind) => {
                return <div key={ind}>{event.username}</div>
            })}
            {loading && <Skeleton variant="rectangular" width="100%" height={118} />}
        </div>
    )
}

export default EventList;