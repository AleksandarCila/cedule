import { Typography } from '@mui/material'
import { useTheme } from '@mui/material';
import { addAlphaToColor } from "../../../utility/addAlphaToColor";

import { CalendarState } from "../../../context/CalendarContext";

import { isSameDay, isToday } from 'date-fns';

import { days } from "../../../utility/constants"

const WeekDayHeaderElement = props => {
    const {
        state: { calendarState },
        dispatch,
    } = CalendarState();
    const { ind, day } = props;

    const theme = useTheme();
    const selected = isSameDay(day, calendarState.selectedDate);
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
            backgroundColor: selected ? addAlphaToColor(theme.palette.primary.light, 0.3) : "#fff",
            borderBottom: isToday(day) ? `5px solid ${theme.palette.primary.light}` : (selected ? addAlphaToColor(theme.palette.primary.main, 1) : `5px solid ${theme.palette.grey['200']}`),
            borderRight: ((ind + 1) % 7) != 0 ? `1px solid ${theme.palette.grey['300']}` : "",
        }}
            onClick={(e) => handleSelectDate(e, day)}>
            <Typography fontSize="small" variant="span">{day.getDate()} {days[day.getDay()]}</Typography>

        </div>
    )
}


const WeekViewDayHeaders = (props) => {
    const {
        state: { calendarState },
        dispatch,
    } = CalendarState();
    // const { weekDays } = props;
    const weekDays = calendarState.weekDays;

    const theme = useTheme();

    return (
        <div style={{ width: "100%", height: 40, minHeight: 40, paddingRight: 18 }}>
            <div style={{
                width: "100%",
                height: "100%",
                display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gridAutoColumns: "auto", gridAutoRows: "auto",
            }}>
                <div style={{
                    borderRight: `1px solid ${theme.palette.grey['300']}`,
                    height: "100%",
                    width: "100%", overflow: "hidden", textOverflow: "ellipsis",
                }}>
                    <Typography variant="span" fontSize="small">
                        1am
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