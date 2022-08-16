
// Context States
import { CalendarState } from '../../../context/CalendarContext'

// Components
import { Box, Button, IconButton } from '@mui/material'

// Utility
import { addDays, addMonths, addWeeks } from "date-fns"

// Icons
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';

// Types
interface ICalendarNavigationPane{
    tabValue:number
}
const CalendarNavigationPane = (props:ICalendarNavigationPane) => {
    const {tabValue} = props;
    // States
    const {
        state: { calendarState },
        dispatch,
    } = CalendarState();

    // Functions
    const handleTodayClick = () => {
        dispatch({
            type: "SET_SELECTED_DATE",
            payload: {
                day: new Date()
            },
        });
    }
    const handleAddTimeClick = (qty:number) => {
        let newDate = calendarState.selectedDate;
        switch (tabValue) {
            case 0:
                newDate = addMonths(newDate, qty);
                newDate = new Date(newDate.getFullYear(), newDate.getMonth(), 1)
                break;
            case 1:
                newDate = addWeeks(newDate, qty);
                break;
            case 2:
                newDate = addDays(newDate, qty);
                break;
            case 3:
                newDate = addDays(newDate, qty);
                break;
            default:
        }
        dispatch({
            type: "SET_SELECTED_DATE",
            payload: {
                day: newDate
            },
        });
    }

    return (
        <Box sx={{ display: "flex", justifyContent: 'flex-start', alignItems: 'center' }}>
            <Button variant="contained" size="small" onClick={handleTodayClick}>
                Today
            </Button>
            <IconButton color="primary" onClick={() => handleAddTimeClick(-1)}>
                <WestIcon />
            </IconButton>
            <IconButton color="primary" onClick={() => handleAddTimeClick(1)}>
                <EastIcon />
            </IconButton>
        </Box>
    )
}

export default CalendarNavigationPane;