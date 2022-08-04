import { useState, useEffect, useRef } from "react";

import { CalendarState } from "../../../context/CalendarContext";
import { isSameDay } from "date-fns";

import { timeStamps } from "../../../utility/constants"
import { Typography, Box } from "@mui/material";



const WeekViewDayEvents = (props) => {
    const {
        state: { calendarState },
        dispatch,
    } = CalendarState();
    const [loading, setLoading] = useState(true);
    const { weekDayIndex } = props;

    const dragItem = useRef();
    const dragOverItem = useRef();

    const day = calendarState.weekDays[weekDayIndex];

    let events = [];
    calendarState.calendars.forEach((calendar) => {
        if (calendar.visible)
            events = events.concat(calendar.events)
    })


    events = events.filter((event) => {
        if (isSameDay(day, event.eventDate)) return event;

    });
    events = events.sort((a, b) => { return a.eventStartTime - b.eventStartTime })

    useEffect(() => (setLoading(false)), [])

    const dragStart = (e, position, event) => {
        // dragItem.current = position;
        // console.log(e.target.innerHTML);
        let data = {
            name: 'foobar',
            age: 15
        };

        e.dataTransfer.setData('data', JSON.stringify(event));
    };

    const dragEnter = (e, position) => {
        dragOverItem.current = position;
        console.log(e.target.innerHTML);
    };

    const onDragOver = (event) => {
        event.stopPropagation();
        event.preventDefault();
    }

    const dragEnd = (e, position) => {
        // console.log(e.target);
    }

    return (
        <>
            {!loading && events && events.map((event, ind) => {
                console.log(event);
                return (
                    <Box
                        key={ind}
                        sx={{
                            position: 'absolute',
                            top: `${event.eventStartTime / timeStamps.length * 100}%`,
                            left: `${ind * 2}%`,
                            width: `${100 - 2 * ind}%`,
                            height: `${event.eventLength * (1 / timeStamps.length * 100)}%`,
                            backgroundColor: event.color,
                            borderRadius: 2,
                            // border: "1px solid black",
                            zIndex: 999 + ind,
                            boxShadow: 3,
                            py: 0.1,
                            px: 0.5,
                        }} draggable
                        onDragStart={(e) => dragStart(e, ind, event)}
                        onDragEnd={(e) => dragEnd(e, ind)}
                        onDragOver={onDragOver}

                    // onDragEnter={(e) => dragEnter(e, ind)}
                    >
                        <Typography fontSize="small" noWrap={true}>{timeStamps[event.eventStartTime].label}-{timeStamps[event.eventStartTime + event.eventLength].label}</Typography>
                    </Box>)
            })}
        </>
    )
}

export default WeekViewDayEvents