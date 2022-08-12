import { useEffect, useState } from 'react';

// Context States
import { CalendarState } from "../../../context/CalendarContext";

// Components
import { Divider, useTheme } from '@mui/material'
import DayGridElement from './DayGridElement'

// Utility
import { startOfWeek, startOfMonth, endOfMonth, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns'
import { days } from '../../../utility/constants';

const getMonthDays = (date) => {
    const start = startOfWeek(startOfMonth(date))
    const end = endOfWeek(endOfMonth(date))
    return eachDayOfInterval({
        start: start,
        end: end
    });
}

const MonthView = (props) => {
    // States
    const {
        state: { calendarState },
        dispatch,
    } = CalendarState();
    const [loading, setLoading] = useState(true);

    const [monthDays, setMonthDays] = useState(getMonthDays(calendarState.selectedDate));
    const [selectedDate, setSelectedDate] = useState(calendarState.selectedDate);

    let events = [];
    calendarState.calendars.forEach((calendar) => {
        if (calendar.visible)
            events = events.concat(calendar.events)
    })

    // Hooks
    const theme = useTheme();
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
    }, [calendarState.selectedDate])


    return (
        <div style={{
            width: "100%", height: "100%", display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column',
            overflowY: "auto",
        }}>
            <Divider sx={{ width: "100%", }} />

            <div style={{
                minHeight: 0,
                minWidth: 0, display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gridAutoColumns: "auto", width: "100%",
            }}>
                {days.map((day, ind) => (
                    <div key={day.toString(36)} style={{ padding: 8, borderRight: ((ind + 1) % 7) != 0 ? `1px solid ${theme.palette.backgroundLight}` : "", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {day}
                    </div>
                ))}
            </div>
            <div style={{
                minHeight: 0,
                minWidth: 0,
                flex: 1, display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gridAutoColumns: "auto", gridAutoRows: "1fr", width: "100%", borderTop: `1px solid ${theme.palette.backgroundLight}`
            }}>
                {!loading && monthDays && monthDays.map((day, ind) => {
                    let dayEvents = events.filter((event) => {
                        if (isSameDay(day, event.eventDate)) return event;
                    });
                    return (
                        <DayGridElement key={day.toString(36)} day={day} ind={ind} events={dayEvents} />
                    )
                })}
            </div>
        </div>
    )
}

export default MonthView;