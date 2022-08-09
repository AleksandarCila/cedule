import { CalendarState } from "../../context/CalendarContext";
import { isToday, isSameDay, isSameMonth, isWeekend } from 'date-fns'
import { Box, Divider, Typography, Stack, Chip, Badge } from "@mui/material";
import { useTheme } from '@mui/material';
import { addAlphaToColor } from "../../utility/addAlphaToColor";
import { calendarTheme } from '../../styles/theme/calendarTheme'
import { useEffect, useState } from "react";

import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventIcon from '@mui/icons-material/Event';

const DayGridElement = props => {
    const { day, ind, events } = props;
    const {
        state: { calendarState },
        dispatch,
    } = CalendarState();

    const [loading, setLoading] = useState(true);

    const theme = useTheme();
    const selected = isSameDay(day, calendarState.selectedDate);
    const isThisMonth = isSameMonth(day, calendarState.selectedDate);
    const isWeekendDay = isWeekend(day);

    let numberOfEvents = 0
    let numberOfTasks = 0
    let numberOfReminders = 0

    events.filter((event) => {
        switch (event.type) {
            case 'event':
                numberOfEvents++;
                break;
            case 'task':
                numberOfTasks++;
                break;
            case 'reminder':
                numberOfReminders++;
                break;
            default:

        }
    })

    useEffect(() => (setLoading(false)), []);

    return (
        <Box sx={{
            p: 0.75,
            cursor: "pointer",
            bgcolor: selected ? addAlphaToColor(theme.palette.primary.light, 0.3) :
                (isThisMonth && !isWeekendDay) ? "" : theme.palette.grey['200'],
            borderRight: ((ind + 1) % 7) != 0 ? `1px solid ${theme.palette.grey['300']}` : "",
            borderBottom: `1px solid ${theme.palette.grey['300']}`,
            borderTop: isToday(day) ? `5px solid ${theme.palette.primary.light}` : "5px solid transparent",
            minWidth: 0,
            minHeight: 0,
            overflow: 'hidden',
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
                // height:"100%",

            }}>
                <Box sx={{ width: "100%", }}>
                    <Typography variant="span" sx={{ fontSize: { xs: "small", lg: "medium" } }}>{day.getDate()} </Typography>
                    {events.length > 0 && <Divider sx={{ width: "100%", mb: 0.5 }} />}
                </Box>
                <Box sx={{ width: "100%", py: 0.5 }}>
                    {numberOfTasks > 0 && <Badge
                        badgeContent={numberOfTasks}
                        color="primary" variant="dot" sx={{ mr: 1 }}>
                        <AssignmentIcon fontSize="small" color="action" />
                    </Badge>}
                    {numberOfReminders > 0 && <Badge
                        badgeContent={numberOfReminders}
                        color="primary" variant="dot" sx={{ mr: 1 }}>
                        <NotificationsActiveIcon fontSize="small" color="action" />
                    </Badge>}
                    {numberOfEvents > 0 &&
                        <Box component="span" sx={{ display: { xs: 'block', lg: 'none' } }}><Badge
                            badgeContent={numberOfEvents}
                            color="primary" variant="dot" sx={{ mr: 1 }}>
                            <EventIcon fontSize="small" color="action" />
                        </Badge></Box>}

                    <Box sx={{
                        pb: 1,
                        my: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap',
                    }}>

                        {!loading && events && events.map((event, ind) => {
                            if (event.type === 'event') return (
                                <Typography
                                    key={ind}
                                    sx={{
                                        display: { xs: 'none', lg: 'block' }, borderRadius: 5, bgcolor: theme.custom.events.event,
                                        color: 'white', textAlign: 'center',

                                        fontSize: 12, mr: 0.3, my: 0.3, py: 0.4, px: 0.8
                                    }}>
                                    12:15pm
                                </Typography>

                            )

                        })}

                    </Box>

                </Box>
            </Box>
        </Box >
    )
}

export default DayGridElement;