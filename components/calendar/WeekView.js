
import { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Grid } from '@mui/material'

import { isToday } from 'date-fns';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const hours = ["1am", "1am", "1am", "1am", "1am", "1am", "1am", "1am", "1am", "1am", "1am", "1am", "1am",]

const WeekView = (props) => {


  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)" }}>
        {props.weekDays.map((day, ind) => {
          return (
            <div style={{ width: 120, gridColumnStart: ind + 2, backgroundColor: isToday(day) ? "red" : "" }}>
              {day.getDate()} {days[day.getDay()]}
            </div>)
        })}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)" }}>
        {hours.map((hour, ind) => (
          <>
            <div key={hour + ind} style={{ width: '100%', height: 80 }} >
              {hour}
            </div>
            {props.weekDays.map((day, ind) => {
              return (
                <div style={{ width: 120, border: "1px solid black" }} >
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
    </div>
  )
}

export default WeekView;