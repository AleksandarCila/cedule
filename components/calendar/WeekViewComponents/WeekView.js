
import { useState, useRef } from 'react';
import { Divider } from '@mui/material'
import { useTheme } from '@mui/material';
import { ModalState } from "../../../context/ModalContext";
import { CalendarState } from '../../../context/CalendarContext'


import WeekViewDayHeaders from './WeekViewDayHeaders'
import WeekViewDayEvents from './WeekViewDayEvents'
import TimeStamp from './TimeStamp'

import { days, timeStamps } from "../../../utility/constants"

import { addHours } from 'date-fns';

const WeekEventSlotElement = props => {
  const { ind, hourInd, handleOpenAddEventModal } = props;
  const {
    state: { calendarState },
    dispatch
  } = CalendarState();


  const [hover, setHover] = useState(false);

  const dragOverItem = useRef();

  const dragEnter = (event, position) => {
    dragOverItem.current = position;
    setHover(true);
    event.stopPropagation();
    event.preventDefault();
    // console.log(e.target.innerHTML);
  };

  const dragExit = (event, position) => {
    setHover(false);
    event.stopPropagation();
    event.preventDefault();
    // console.log("aca");
  };

  const onDragOver = (event) => {
    event.stopPropagation();
    event.preventDefault();
  }

  const handleDrop = async event => {
    event.stopPropagation()
    event.preventDefault()
    setHover(false);

    let data;

    try {
      data = JSON.parse(event.dataTransfer.getData('data'));
    } catch (e) {
      // If the text data isn't parsable we'll just ignore it.
      return;
    }

    // Do something with the data
    const newDate= calendarState.weekDays[ind]
    dispatch({
      type: "CHANGE_EVENT_DATE",
      event: data,
      newDate: newDate,
      startTime: hourInd,
    })
    await fetch("/api/events/updateEvent", {
      method: "POST",
      body: [JSON.stringify({ ...data, eventDate: addHours(newDate,6), eventStartTime: hourInd })],
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(data);
  };

  const theme = useTheme();
  const isWeekendDay = (ind == 0 || ind == 6) ? true : false;

  return (
    <div style={{
      padding: 2,
      borderRight: ((ind + 1) % 7) != 0 ? `1px solid ${theme.palette.grey['300']}` : "",
      borderBottom: `1px solid ${theme.palette.grey['300']}`,
      width: "100%", height: "100%",
      backgroundColor: (hover ? theme.palette.primary.main : isWeekendDay ? theme.palette.grey['200'] : "#fff"),
    }}
      onDragEnter={dragEnter}
      onDragStart={(e) => { e.preventDefault() }}
      onDragLeave={dragExit}
      onDragOver={onDragOver}
      onDrop={handleDrop}
      onClick={() => handleOpenAddEventModal(hourInd, calendarState.weekDays[ind])}
    >
    </div >)

}

const WeekView = (props) => {


  const theme = useTheme();

  const {
    dispatch: dispatchModal
  } = ModalState();


  return (
    <>

      <Divider />
      <WeekViewDayHeaders />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gridAutoColumns: "auto", gridAutoRows: "auto", overflowY: "scroll", }}>
        <div style={{
          borderTop: `1px solid ${theme.palette.grey['300']}`,
          display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gridAutoColumns: "auto", gridAutoRows: "auto"
        }}>{
            timeStamps.map((hour, hourInd) => {
              return (
                <TimeStamp key={hourInd} hour={hour} hourInd={hourInd} />
              )
            })}

        </div>

        {days.map((day, ind) => {

          return (<div key={ind} style={{
            borderTop: `1px solid ${theme.palette.grey['300']}`,
            position: 'relative',
            display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gridAutoColumns: "auto", gridAutoRows: "auto"
          }}>
            <WeekViewDayEvents weekDayIndex={ind} />
            {timeStamps && timeStamps.map((hour, hourInd) => {
              return (
                <WeekEventSlotElement key={hourInd} ind={ind} hourInd={hourInd}
                  // time={time}
                  // handleOpenAddEventModal={() => (handleOpenAddEventModal(time, day))
                  handleOpenAddEventModal={(time, day) => {
                    dispatchModal({
                      type: "SHOW_MODAL",
                      modalType: "NEW_EVENT",
                      modalProps: {
                        time: time,
                        day: day
                      },
                    })
                  }}
                  draggable
                  onDragEnter={(e) => dragEnter(e, ind)}

                />
              )
            })}
          </div>)
        })}

      </div>
    </ >
  )
}

export default WeekView;