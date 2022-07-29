import { CalendarState } from "../../context/CalendarContext";
import { isToday, isSameDay, isSameMonth, isWeekend } from 'date-fns'
import { Box, Divider, Typography, Stack, Chip } from "@mui/material";
import { useTheme } from '@mui/material';
import { addAlphaToColor } from "../../utility/addAlphaToColor";
import { calendarTheme } from '../../styles/theme/calendarTheme'

const DayGridElement = props => {
    const { day, ind, events } = props;
    const {
        state: { calendarState },
        dispatch,
    } = CalendarState();
    const theme = useTheme();
    const selected = isSameDay(day, calendarState.selectedDate);
    const isThisMonth = isSameMonth(day, calendarState.selectedDate);
    const isWeekendDay = isWeekend(day);

    let numberOfEvents = 0
    let numberOfTasks = 0
    let numberOfReminders = 0

    events.filter((event) => {
        switch (event.eventType) {
            case 0:
                numberOfEvents++;
                break;
            case 1:
                numberOfTasks++;
                break;
            case 2:
                numberOfReminders++;
                break;
            default:

        }
    })

    return (
        <Box sx={{
            p: 0.75,
            cursor: "pointer",
            bgcolor: selected ? addAlphaToColor(theme.palette.primary.light, 0.3) :
                (isThisMonth && !isWeekendDay) ? "" : theme.palette.grey['200'],
            borderRight: ((ind + 1) % 7) != 0 ? `1px solid ${theme.palette.grey['300']}` : "",
            borderBottom: `1px solid ${theme.palette.grey['300']}`,
            borderTop: isToday(day) ? `5px solid ${theme.palette.primary.light}` : "5px solid transparent",
            minWidth:0,
            minHeight:0,
            overflow:'hidden',
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
                    {events.length > 0 && <Divider sx={{ width: "100%" }} />}
                </Box>
                <Box sx={{ width: "100%" }}>

                    <Stack direction='row'
                        spacing={{ xs: 1, sm: 1 }}>

                        {numberOfTasks > 0 && <Typography sx={{ fontSize: { xs: 8, lg: 12 }, textAlign: 'center', }} ><Chip size="small" sx={{ bgcolor: calendarTheme.events.task, width: 10, height: 10 }} /> {numberOfTasks} </Typography>}
                        {numberOfReminders > 0 && <Typography sx={{ fontSize: { xs: 8, lg: 12 }, textAlign: 'center', }} ><Chip size="small" sx={{ bgcolor: calendarTheme.events.reminder, width: 10, height: 10 }} /> {numberOfReminders} </Typography>}
                        {numberOfEvents > 0 && <Typography sx={{ display: { xs: 'block', lg: 'none' }, fontSize: { xs: 8, lg: 12 }, textAlign: 'center', }} ><Chip size="small" sx={{ bgcolor: theme.palette.primary.main, width: 10, height: 10 }} /> {numberOfEvents} </Typography>}

                    </Stack>
                    <Box sx={{
                        pb:1,
                        my: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap',
                    }}>

                        {events.map((event) => {
                            if (event.eventType == 0) return (
                                <Typography sx={{
                                    display: { xs: 'none', lg: 'block' }, borderRadius: 5, bgcolor: theme.palette.primary.main,
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