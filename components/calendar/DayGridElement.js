import { CalendarState } from "../../context/CalendarContext";
import { isToday, isSameDay, isSameMonth, isWeekend } from 'date-fns'
import { Box } from "@mui/material";
import { useTheme } from '@mui/material';
import { addAlphaToColor } from "../../utility/addAlphaToColor";

const DayGridElement = props => {
    const { day, ind } = props;
    const {
        state: { calendarState },
        dispatch,
    } = CalendarState();
    const theme = useTheme();
    const selected = isSameDay(day, calendarState.selectedDate);
    const isThisMonth = isSameMonth(day, calendarState.selectedDate);
    const isWeekendDay=isWeekend(day);
    return (
        <Box sx={{
            p: 1,
            cursor:"pointer",
            bgcolor: selected ? addAlphaToColor(theme.palette.primary.light, 0.3) : 
            (isThisMonth && !isWeekendDay) ? "" : theme.palette.grey['200'],
            borderRight: ((ind + 1) % 7) != 0 ? `1px solid ${theme.palette.grey['300']}` : "",
            borderBottom: `1px solid ${theme.palette.grey['300']}`,
            borderTop: isToday(day) ? `5px solid ${theme.palette.primary.light}` : "5px solid transparent"
        }}
            onClick={() => {
                dispatch({
                    type: "SET_SELECTED_DATE",
                    payload: {
                        day
                    },
                });
            }}>
            {day.getDate()}
        </Box>
    )
}

export default DayGridElement;