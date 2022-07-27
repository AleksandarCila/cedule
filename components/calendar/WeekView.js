
import { useEffect, useState } from 'react';
import { Box, ListItem, Typography, Divider, Fab, IconButton } from '@mui/material'
import { useTheme } from '@mui/material';
import { addAlphaToColor } from "../../utility/addAlphaToColor";
import AddIcon from '@mui/icons-material/Add';

import { startOfWeek, startOfMonth, endOfMonth, endOfWeek, eachDayOfInterval, isToday, isWeekend, isSameDay } from 'date-fns'

import { CalendarState } from "../../context/CalendarContext";
import CalendarLayout from './CalendarLayout';
import NewEventModal from './NewEvent/NewEventModal';

import { days, hours } from "../../utility/constants"



const getWeekDays = (date) => {
  const start = startOfWeek(date)
  const end = endOfWeek(date)
  return eachDayOfInterval({
    start: start,
    end: end
  });
}

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

const WeekEventSlotElement = props => {
  const { ind, day, time } = props;
  const [hover, setHover] = useState(false);

  const theme = useTheme();
  const isWeekendDay = isWeekend(day);

  const [openAddEventModal, setOpenAddEventModal] = useState(false);
  const handleOpenAddEventModal = () => {
    setOpenAddEventModal(prev => !prev)
  }
  return (
    <div style={{
      padding: 2,
      borderRight: ((ind + 1) % 7) != 0 ? `1px solid ${theme.palette.grey['300']}` : "",
      borderBottom: `1px solid ${theme.palette.grey['300']}`,
      width: "100%", height: "100%",
      backgroundColor: isWeekendDay ? theme.palette.grey['200'] : "000",
      position: 'relative'
    }}
    >
      <NewEventModal time={time} day={day} openAddEventModal={openAddEventModal} handleOpenAddEventModal={handleOpenAddEventModal} />

      <Box onClick={handleOpenAddEventModal} onMouseOver={() => { setHover(true) }} onMouseOut={() => { setHover(false) }} sx={{ width: "100%", height: "100%" }
      }>
        Blok
        <Fab variant="extended" color="primary" size="small" sx={{ position: 'absolute', bottom: 3, right: 3, display: hover ? "" : "none" }}><AddIcon /></Fab>
      </Box>
    </div >)

}

const WeekView = (props) => {
  const {
    state: { calendarState },
    dispatch,
  } = CalendarState();
  const [weekDays, setWeekDays] = useState(getWeekDays(calendarState.selectedDate));
  const [selectedDate, setSelectedDate] = useState(calendarState.selectedDate);
  const theme = useTheme();


  useEffect(() => {
    const oldDate = selectedDate;
    const newDate = calendarState.selectedDate;

    setWeekDays(getWeekDays(newDate));
  }, [calendarState])

  return (
    <CalendarLayout style={props.style}>

      <Divider />
      <div style={{ width: "100%", height: 40, minHeight: 40, paddingRight: 18 }}>
        <div style={{
          width: "100%",
          height: "100%",
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
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
          })

          }
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${theme.palette.grey['300']}`, overflowY: "scroll" }}>{
        hours.map((hour, hourInd) => (
          <div key={hour + hourInd} style={{ height: 80, width: "100%" }}>
            <div style={{
              height: "100%", display: 'flex', justifyContent: 'space-between', alignItems: 'center',

            }}>
              <div style={{
                width: "100%", height: "100%", overflow: "hidden", textOverflow: "ellipsis",
                borderRight: ((hourInd + 1) % 7) != 0 ? `1px solid ${theme.palette.grey['300']}` : "",
                borderBottom: `1px solid ${theme.palette.grey['300']}`,
                backgroundColor: hourInd < 12 ? addAlphaToColor(theme.palette.primary.light, 0.15) : addAlphaToColor(theme.palette.primary.light, 0.2)
              }}>
                <Typography variant="span" fontSize="small">
                  {hour}
                </Typography>
              </div>

              {weekDays.map((day, ind) => {
                return (
                  <WeekEventSlotElement key={hour + ind} ind={ind} day={day} time={new Date(day.getFullYear(),day.getMonth(),day.getDate(), hourInd+1)} />)
              })}
            </div>
          </div>

        ))}
      </div>

    </CalendarLayout >
  )
}

export default WeekView;