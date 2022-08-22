
// Context States
import { CalendarState } from "../../../context/CalendarContext";

// Components
import { Typography, useTheme, useMediaQuery, Box } from '@mui/material'

// Utility
import { addAlphaToColor } from "../../../utility/addAlphaToColor";
import { isToday } from 'date-fns';
import { days } from "../../../utility/constants"

// Types
interface IDayHeaderElement {
    day: Date;
}

const DayHeaderElement = (props: IDayHeaderElement) => {
    const { day } = props;

    // Hooks
    const theme = useTheme();

    return (
        <div style={{
            cursor: 'pointer',
            width: "80%",
            height: "100%",
            padding: 2,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            backgroundColor: theme.palette.primary.light,
            borderBottom: isToday(day) ? `5px solid ${theme.palette.primary.light}` : theme.palette.primary.main,
            color: theme.palette.primary.contrastText
        }}
        >
            <Typography fontSize="small" variant="body1">{day.getDate()} {days[day.getDay()]}</Typography>
        </div>
    )
}


const DayViewHeader = () => {
    // States
    const {
        state: { calendarState },
    } = CalendarState();
    const selectedDate = calendarState.selectedDate;

    // Hooks
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));


    return (
        <div style={{ width: "100%", height: 40, minHeight: 40, paddingRight: isMobile ? 0 : 16 }}>
            <Box style={{
                width: "100%",
                height: "100%",
                display: "flex",justifyContent:'space-between', alignItems:'center'
            }}>
                <div style={{
                    borderRight: `1px solid ${theme.palette.backgroundLight}`,
                    height: "100%",
                    width: "20%", overflow: "hidden", textOverflow: "ellipsis",
                }}>
                </div>
                <DayHeaderElement day={selectedDate} />
            </Box>
        </div>
    )
}

export default DayViewHeader;