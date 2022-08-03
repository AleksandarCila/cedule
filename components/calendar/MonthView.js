
import { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Grid, Divider } from '@mui/material'
import { useTheme } from '@mui/material';

import { startOfWeek, startOfMonth, endOfMonth, endOfWeek, eachDayOfInterval, isToday, isSameDay } from 'date-fns'

import { CalendarState } from "../../context/CalendarContext";
import DayGridElement from './DayGridElement'

import { days, USERS } from '../../utility/constants';
const getMonthDays = (date) => {
    const start = startOfWeek(startOfMonth(date))
    const end = endOfWeek(endOfMonth(date))
    return eachDayOfInterval({
        start: start,
        end: end
    });
}

const MonthView = (props) => {
    const {
        state: { calendarState },
        dispatch,
    } = CalendarState();

    const [loading, setLoading] = useState(true);

    const theme = useTheme();

    const [monthDays, setMonthDays] = useState(getMonthDays(calendarState.selectedDate));
    const [selectedDate, setSelectedDate] = useState(calendarState.selectedDate);

    useEffect(() => (setLoading(false)), []);

    useEffect(() => {
        const oldDate = selectedDate;
        const newDate = calendarState.selectedDate;

        if (newDate.getMonth() == oldDate.getMonth()) {
            if (newDate.getFullYear() != oldDate.getFullYear()) {
                setSelectedDate(newDate);
                setMonthDays(getMonthDays(newDate));
            }
        }
        else {
            setSelectedDate(newDate);
            setMonthDays(getMonthDays(newDate));
        }
    }, [calendarState])


    return (
        // <CalendarLayout>
        <div style={{ width: "100%", height: "100%", display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
            <Divider sx={{ width: "100%", }} />

            <div style={{
                minHeight: 0,
                minWidth: 0, display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gridAutoColumns: "auto", width: "100%"
            }}>
                {!loading && days && days.map((day, ind) => (
                    <div key={day.toString(36)} style={{ padding: 8, borderRight: ((ind + 1) % 7) != 0 ? `1px solid ${theme.palette.grey['300']}` : "", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {day}
                    </div>
                ))}
            </div>
            <div style={{
                minHeight: 0,
                minWidth: 0,
                flex: 1, display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gridAutoColumns: "auto", gridAutoRows: "1fr", width: "100%", borderTop: `1px solid ${theme.palette.grey['300']}`
            }}>
                {!loading && monthDays && monthDays.map((day, ind) => {
                    let events = USERS.filter((event) => {
                        if (isSameDay(day, event.eventDate)) return event;

                    });
                    return (
                        <DayGridElement key={day.toString(36)} day={day} ind={ind} events={events} />
                    )
                })}
            </div>
        </div>
        // </CalendarLayout>
    )
}

export default MonthView;