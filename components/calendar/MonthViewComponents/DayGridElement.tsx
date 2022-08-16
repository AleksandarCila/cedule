import { useMemo } from "react";

// Context States
import { CalendarState } from "../../../context/CalendarContext";

// Components
import { Box, Divider, Typography, Skeleton, useTheme } from "@mui/material";
import EventsBox from './EventsBox'

// Utility
import { isToday, isSameDay, isSameMonth, isWeekend } from 'date-fns'

// Types
import Event from '../../../types/interfaces/Event'
interface IDayGridElement {
    day: Date;
    ind: number;
    allEvents: Event[];
}
const DayGridElement = (props:IDayGridElement) => {
    const { day, ind, allEvents } = props;
    // States
    const {
        state: { calendarState },
        dispatch,
    } = CalendarState();
    const selected = isSameDay(day, calendarState.selectedDate);
    const isThisMonth = isSameMonth(day, calendarState.selectedDate);
    const isWeekendDay = isWeekend(day);

    const events = useMemo(() => {
        let dayEvents = allEvents.filter((event) => {
            if (isSameDay(day, event.eventDate)) return event;
        });
        dayEvents = dayEvents.sort((a, b) => { return a.eventStartTime - b.eventStartTime })
        return dayEvents;
    }, [calendarState.calendars]);

    // Hooks
    const theme = useTheme();

    return (
        <Box sx={{
            p: 0.75,
            cursor: "pointer",
            minHeight: { xs: 180, lg: 100 },
            bgcolor: selected ? theme.palette.primary.dark :
                (isThisMonth && !isWeekendDay) ? "" : theme.palette.backgroundLighter,
            borderRight: ((ind + 1) % 7) != 0 ? `1px solid ${theme.palette.backgroundLight}` : "",
            borderBottom: `1px solid ${theme.palette.backgroundLight}`,
            borderTop: isToday(day) ? `5px solid ${theme.palette.primary.light}` : "5px solid transparent",
            overflow: 'hidden',
            color: selected ? theme.palette.primary.contrastText : ""
        }}
            onClick={() => {
                dispatch({
                    type: "SET_SELECTED_DATE",
                    payload: {
                        day
                    },
                });
            }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'column',
                width: "100%"

            }}>
                <Box sx={{ width: "100%", }}>
                    <Typography variant="body1" sx={{ fontSize: { xs: "small", lg: "medium" } }}>{day.getDate()} </Typography>
                    {events.length > 0 && <Divider sx={{ width: "100%", mb: 0.5 }} />}
                </Box>
                {calendarState.loading ?
                    <>
                        <Skeleton animation="wave" sx={{ width: "100%" }} />
                        <Skeleton animation="wave" sx={{ width: "100%" }} />
                    </> :
                    <EventsBox events={events} />}
            </Box>
        </Box >
    )
}

export default DayGridElement;