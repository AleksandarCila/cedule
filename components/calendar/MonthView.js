
import { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Grid, Divider } from '@mui/material'

import { startOfWeek, startOfMonth, endOfMonth, endOfWeek, eachDayOfInterval, isToday } from 'date-fns'

import { CalendarState } from "../../context/CalendarContext";
import DayGridElement from './DayGridElement'

import { days } from '../../utility/constants';

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

    const [monthDays, setMonthDays] = useState(getMonthDays(calendarState.selectedDate));
    const [selectedDate, setSelectedDate] = useState(calendarState.selectedDate);

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
            <Divider sx={{width:"100%",}}/>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gridAutoColumns: "auto", width: "100%" }}>
                {days.map((day,ind) => (
                    <div style={{ padding:8, borderRight: ((ind+1) % 7) != 0 ? "1px solid #e2e2e2" : "", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {day}
                    </div>
                ))}
            </div>
            <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gridAutoColumns: "auto", gridAutoRows: "auto", width: "100%", borderTop: "1px solid #e2e2e2"}}>
                {monthDays.map((day,ind) => {
                    return (
                        <DayGridElement key={day.toString(36)} day={day} ind={ind}/>
                    )
                })}
            </div>
        </div>
        // </CalendarLayout>
    )
}

export default MonthView;