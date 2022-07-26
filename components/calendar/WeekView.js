
import { useEffect, useState } from 'react';
import { List, ListItem } from '@mui/material'

import { startOfWeek, startOfMonth, endOfMonth, endOfWeek, eachDayOfInterval, isToday } from 'date-fns'

import { CalendarState } from "../../context/CalendarContext";
import CalendarLayout from './CalendarLayout';

import { days, hours } from "../../utility/constants"



const getWeekDays = (date) => {
  const start = startOfWeek(date)
  const end = endOfWeek(date)
  return eachDayOfInterval({
    start: start,
    end: end
  });
}

const WeekView = (props) => {
  const {
    state: { calendarState },
    dispatch,
  } = CalendarState();
  const [weekDays, setWeekDays] = useState(getWeekDays(calendarState.selectedDate));
  const [selectedDate, setSelectedDate] = useState(calendarState.selectedDate);


  useEffect(() => {
    const oldDate = selectedDate;
    const newDate = calendarState.selectedDate;

    setWeekDays(getWeekDays(newDate));
  }, [calendarState])

  return (
    <CalendarLayout style={props.style}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gridAutoColumns: "auto", width: "100%" }}>
        {weekDays.map((day, ind) => {
          return (
            <div style={{ gridColumnStart: ind + 2, backgroundColor: isToday(day) ? "red" : "" }}>
              {day.getDate()} {days[day.getDay()]}
            </div>)
        })}
      </div>
      <div style={{ flex:1,display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gridAutoColumns: "auto", width: "100%", overflowY: "scroll" }}>
        {hours.map((hour, ind) => (
          <>
            <div key={hour + ind} style={{ height: 80 }} >
              {hour}
            </div>
            {weekDays.map((day, ind) => {
              return (
                <div style={{ border: "1px solid black" }} >
                  Blok
                </div>)
            })}

          </>
        ))}

      </div>
      {/* <Grid container sx={{ width: "100%" }}>
        <Grid item xs={3} direction="column">
          {hours.map((hour, ind) => (
            <div key={hour + ind} style={{ width: '100%', height: 80 }}>
              {hour}
            </div>
          ))}
        </Grid>
        <Grid item xs={9}>
        </Grid>
      </Grid> */}
    </CalendarLayout>
  )
}

export default WeekView;