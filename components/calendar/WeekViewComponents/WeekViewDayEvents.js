import { useState, useEffect, useMemo } from "react";

// Context States
import { CalendarState } from "../../../context/CalendarContext";
import { ModalState } from '../../../context/ModalContext'

// Components
import { Typography, Box } from "@mui/material";

// Utility
import { isSameDay } from "date-fns";
import { timeStamps } from "../../../utility/constants"
import { addAlphaToColor } from "../../../utility/addAlphaToColor";

// Icons
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventIcon from '@mui/icons-material/Event';

const WeekViewDayEvents = (props) => {
    // States
    const {
        state: { calendarState },
        dispatch,
    } = CalendarState();
    const {
        dispatch: dispatchModal
    } = ModalState();
    const [loading, setLoading] = useState(true);

    const day = props.day ? props.day : calendarState.weekDays[props.weekDayIndex];
    // let events = [];

    const events = useMemo(() => {
        let events=[];
        calendarState.calendars.forEach((calendar) => {
            if (calendar.visible)
                events = events.concat(calendar.events)
        })
        events = events.filter((event) => {
            if (isSameDay(day, event.eventDate)) return event;
        });
        events = events.sort((a, b) => { return a.eventStartTime - b.eventStartTime })
        return events;
    }, [calendarState.calendars, calendarState.weekDays]);
    // Hooks
    useEffect(() => (setLoading(false)), [])

    // Drag Handles
    const dragStart = (e, event) => {
        e.dataTransfer.setData('data', JSON.stringify(event));
    };

    const onDragOver = (event) => {
        event.stopPropagation();
        event.preventDefault();
    }

    // Functions
    const handleOpenModal = (type, props = {}) => {
        dispatchModal({
            type: "SHOW_MODAL",
            modalType: type,
            modalProps: props,
        })
    }
    return (
        <>
            {!loading && events && events.map((event, ind) => {
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
                            zIndex: 999 + ind,
                            boxShadow: 3,
                            py: 0.2,
                            px: 1,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            "&:hover": {
                                cursor: "pointer",
                                backgroundColor: addAlphaToColor(event.color, 0.9)
                            }
                        }}
                        draggable
                        onDragStart={(e) => dragStart(e, event)}
                        onDragOver={onDragOver}
                        onClick={() => { handleOpenModal("EVENT_INFO", { event: event }) }}
                    >
                        <Box sx={{ display: "flex", justifyContent: 'flex-start', alignItems: 'center' }}>
                            {event.type === 'reminder' ? <NotificationsActiveIcon sx={{ fontSize: 16, mr: 1 }} /> : event.type === 'task' ? <AssignmentIcon sx={{ fontSize: 16, mr: 1 }} /> : ""}
                            <Typography fontSize="small" variant="body1" noWrap={true}>
                                {event.type === "event" ? `${timeStamps[event.eventStartTime].label}-${timeStamps[event.eventStartTime + event.eventLength].label}` : event.name}
                            </Typography>
                        </Box>
                        <Typography fontSize="small" variant="body1" noWrap={true}>
                            {event.name}
                        </Typography>
                    </Box>)
            })}
        </>
    )
}

export default WeekViewDayEvents