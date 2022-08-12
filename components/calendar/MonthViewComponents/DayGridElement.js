import { useEffect, useState } from "react";

// Context States
import { CalendarState } from "../../../context/CalendarContext";

// Components
import { Box, Divider, Typography, Skeleton, useTheme } from "@mui/material";
import EventsBox from './EventsBox'

// Utility
import { isToday, isSameDay, isSameMonth, isWeekend } from 'date-fns'
import { addAlphaToColor } from "../../../utility/addAlphaToColor";


const DayGridElement = props => {
    const { day, ind, events } = props;
    // States
    const {
        state: { calendarState },
        dispatch,
    } = CalendarState();
    const [loading, setLoading] = useState(true);
    const selected = isSameDay(day, calendarState.selectedDate);
    const isThisMonth = isSameMonth(day, calendarState.selectedDate);
    const isWeekendDay = isWeekend(day);

    // Hooks
    const theme = useTheme();

    useEffect(() => (setLoading(false)), []);

    return (
        <Box sx={{
            p: 0.75,
            cursor: "pointer",
            minHeight:{xs:180, lg:100},
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
                width:"100%"
                
            }}>
                <Box sx={{ width: "100%", }}>
                    <Typography variant="span" sx={{ fontSize: { xs: "small", lg: "medium" } }}>{day.getDate()} </Typography>
                    {events.length > 0 && <Divider sx={{ width: "100%", mb: 0.5 }} />}
                </Box>
                {calendarState.loading ?
                    <>
                        <Skeleton animation="wave" sx={{width:"100%"}}/>
                        <Skeleton animation="wave" sx={{width:"100%"}}/>
                    </> :
                    <EventsBox events={events} />}
            </Box>
        </Box >
    )
}

export default DayGridElement;