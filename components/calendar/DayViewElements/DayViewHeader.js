
// Context States
import { CalendarState } from "../../../context/CalendarContext";

// Components
import { Typography, useTheme } from '@mui/material'

// Utility
import { addAlphaToColor } from "../../../utility/addAlphaToColor";
import { isToday } from 'date-fns';
import { days } from "../../../utility/constants"


const DayHeaderElement = props => {
    const { day } = props;

    // Hooks
    const theme = useTheme();

    return (
        <div style={{
            cursor: 'pointer',
            width: "100%",
            height: "100%",
            padding: 2,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            backgroundColor: addAlphaToColor(theme.palette.primary.light, 0.3),
            borderBottom: isToday(day) ? `5px solid ${theme.palette.primary.light}` : addAlphaToColor(theme.palette.primary.main, 1),
        }}
        >
            <Typography fontSize="small" variant="span">{day.getDate()} {days[day.getDay()]}</Typography>
        </div>
    )
}


const DayViewHeader = (props) => {
    // States
    const {
        state: { calendarState },
    } = CalendarState();
    const selectedDate = calendarState.selectedDate;

    // Hooks
    const theme = useTheme();

    return (
        <div style={{ width: "100%", height: 40, minHeight: 40, paddingRight: 18 }}>
            <div style={{
                width: "100%",
                height: "100%",
                display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridAutoColumns: "auto", gridAutoRows: "auto",
            }}>
                <div style={{
                    borderRight: `1px solid ${theme.palette.grey['300']}`,
                    height: "100%",
                    width: "100%", overflow: "hidden", textOverflow: "ellipsis",
                }}>
                </div>
                <DayHeaderElement day={selectedDate} />
            </div>
        </div>
    )
}

export default DayViewHeader;