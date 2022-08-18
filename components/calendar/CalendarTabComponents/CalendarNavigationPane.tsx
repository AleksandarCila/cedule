
// Context States
import { CalendarState } from '../../../context/CalendarContext'

// Components
import { Box, Button, IconButton } from '@mui/material'

// Icons
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';

// Types
interface ICalendarNavigationPane {
    isMobile: boolean,
    handleAddTimeClick(qty: number): void
}
const CalendarNavigationPane = (props: ICalendarNavigationPane) => {
    const {  isMobile, handleAddTimeClick } = props;
    // States
    const {
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

    return (
        <Box sx={{ display: "flex", justifyContent: 'flex-start', alignItems: 'center' }}>
            <Button variant="contained" size="small" onClick={handleTodayClick}>
                Today
            </Button>
            {!isMobile && <>
                <IconButton color="primary" onClick={() => handleAddTimeClick(-1)}>
                    <WestIcon />
                </IconButton>
                <IconButton color="primary" onClick={() => handleAddTimeClick(1)}>
                    <EastIcon />
                </IconButton>
            </>}
        </Box>
    )
}

export default CalendarNavigationPane;