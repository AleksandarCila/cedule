import { useState, useEffect } from 'react'

import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import getDaysInMonth from 'date-fns/getDaysInMonth'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import enUS from 'date-fns/locale/en-US'
import { startOfMonth, endOfMonth, endOfWeek, isToday } from 'date-fns'

import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material'

import MonthInput from './MonthInput'
import YearInput from './YearInput'

import WeekView from './WeekView'

const locales = {
    'en-US': enUS,
}

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const minYear = 2021;
const maxYear = 2024;

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

const getMonthDays = (date) => {
    const start = startOfWeek(startOfMonth(date))
    const end = endOfWeek(endOfMonth(date))
    return eachDayOfInterval({
        start: start,
        end: end
    });
}

const getWeekDays = (date) => {
    const start = startOfWeek(date)
    const end = endOfWeek(date)
    return eachDayOfInterval({
        start: start,
        end: end
    });
}

const MyCalendar = props => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [monthDays, setMonthDays] = useState([]);
    const [weekDays, setWeekDays] = useState([]);

    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());

    const handleMonthChange = (newMonth) => {
        const newDate = new Date(selectedDate.getFullYear(), newMonth, 1);
        setMonth(newMonth);
        setMonthDays(getMonthDays(newDate));

        setSelectedDate(newDate);
    };
    const handleYearChange = (newYear) => {
        const newDate = new Date(newYear, selectedDate.getMonth(), 1);
        setYear(newYear);
        setMonthDays(getMonthDays(newDate));

        setSelectedDate(newDate);
    };

    const handleYearAndMonthChange = (newYear, newMonth) => {
        const newDate = new Date(newYear, newMonth, 1);
        setMonth(newMonth);
        setYear(newYear);
        setMonthDays(getMonthDays(newDate));

        setSelectedDate(newDate);
    }

    const handleTodayClick = () => {
        const newDate = new Date();
        setMonthDays(getMonthDays(newDate));
        setMonth(newDate.getMonth());
        setYear(newDate.getFullYear());
        setSelectedDate(new Date());
    }

    const handlePrevMonth = () => {
        let newMonth = month - 1;
        let newYear = year;
        if (newMonth < 0) {
            if (newYear >= minYear) {
                newMonth = month;
            }
            else {
                newYear -= 1;
                newMonth = 11;
            }
        }
        handleYearAndMonthChange(newYear, newMonth);
    }

    const handleNextMonth = () => {
        let newMonth = month + 1;
        let newYear = year;
        if (newMonth > 11) {
            if (newYear <= maxYear) {
                newMonth = month;
            }
            else {
                newYear += 1;
                newMonth = 0;
            }
        }
        handleYearAndMonthChange(newYear, newMonth);
    }

    useEffect(() => {
        setMonthDays(getMonthDays(selectedDate));
        setWeekDays(getWeekDays(selectedDate));
    }, [])

    useEffect(() => {
        setWeekDays(getWeekDays(selectedDate));
    }, [selectedDate])

    return (
        <div>
            <WeekView weekDays={weekDays}/>
            <div onClick={handleTodayClick}> TODAY </div>
            <div onClick={handlePrevMonth}> Prev </div>
            <div onClick={handleNextMonth}> Next </div>
            <MonthInput value={month} handleMonthChange={handleMonthChange} />
            <YearInput value={year} handleYearChange={handleYearChange} />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
                {days.map((day) => (
                    <div style={{ width: 120 }}>
                        {day}
                    </div>
                ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
                {monthDays.map((day) => {
                    return (
                        <div style={{ width: 120, backgroundColor: isToday(day) ? "red" : "" }}
                            onClick={() => { setSelectedDate(day) }}>
                            {day.getDate()}
                        </div>)
                })}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
                {weekDays.map((day) => {
                    return (
                        <div style={{ width: 120, backgroundColor: isToday(day) ? "red" : "" }}>
                            {day.getDate()} {days[day.getDay()]}
                        </div>)
                })}
            </div>
        </div>)
}

export default MyCalendar;