
// Context States
import { CalendarState } from "../../../context/CalendarContext";

// Components
import { Typography,useTheme } from '@mui/material'

// Utility
import { addAlphaToColor } from "../../../utility/addAlphaToColor";
import { isSameDay, isToday } from 'date-fns';
import { days } from "../../../utility/constants"

const WeekDayHeaderElement = props => {
    const { ind, day } = props;
    // States
    const {
        state: { calendarState },
        dispatch,
    } = CalendarState();
    const selected = isSameDay(day, calendarState.selectedDate);

    // Hooks
    const theme = useTheme();

    // Functions
    const handleSelectDate = (e, day) => {
        dispatch({
            type: "SET_SELECTED_DATE",
            payload: {
                day
            },
        });
    }

    return (
        <div style={{
            cursor: 'pointer',
            width: "100%",
            height: "100%",
            padding: 2,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            backgroundColor: selected ? theme.palette.primary.light : "",
            borderBottom: isToday(day) ? `5px solid ${theme.palette.primary.light}` : (selected ? theme.palette.primary.main : `5px solid ${theme.palette.backgroundLight}`),
            borderRight: ((ind + 1) % 7) != 0 ? `1px solid ${theme.palette.backgroundLight}` : "",
            color: selected ? theme.palette.primary.contrastText : ""
        }}
            onClick={(e) => handleSelectDate(e, day)}>
            <Typography fontSize="small" variant="body1">{day.getDate()} {days[day.getDay()]}</Typography>

        </div>
    )
}


const WeekViewDayHeaders = (props) => {
    // States
    const {
        state: { calendarState },
        dispatch,
    } = CalendarState();
    const weekDays = calendarState.weekDays;

    // Hooks
    const theme = useTheme();

    return (
        <div style={{ width: "100%", height: 40, minHeight: 40, paddingRight: 16 }}>
            <div style={{
                width: "100%",
                height: "100%",
                display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gridAutoColumns: "auto", gridAutoRows: "auto",
            }}>
                <div style={{
                    borderRight: `1px solid ${theme.palette.backgroundLight}`,
                    height: "100%",
                    width: "100%", overflow: "hidden", textOverflow: "ellipsis",
                }}>
                    <Typography variant="body1" fontSize="small">
                    </Typography>
                </div>
                {weekDays.map((day, ind) => {
                    return (
                        <WeekDayHeaderElement key={day + ind} ind={ind} day={day} />
                    )
                })}
            </div>
        </div>
    )
}

export default WeekViewDayHeaders;