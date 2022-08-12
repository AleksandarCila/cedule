import { useState, useRef } from 'react';

// Context States
import { ModalState } from "../../../context/ModalContext";
import { CalendarState } from '../../../context/CalendarContext'

// Components
import { Divider, useTheme } from '@mui/material'
import WeekViewDayHeaders from './WeekViewDayHeaders'
import WeekViewDayEvents from './WeekViewDayEvents'
import TimeStamp from './TimeStamp'

// Utility
import { days, timeStamps } from "../../../utility/constants"
import { addHours } from 'date-fns';

const WeekEventSlotElement = props => {
  const { ind, hourInd, handleOpenAddEventModal } = props;
  // States
  const {
    state: { calendarState },
    dispatch
  } = CalendarState();
  const [hover, setHover] = useState(false);
  const isWeekendDay = (ind == 0 || ind == 6) ? true : false;

  // Drag Functions
  const dragEnter = (event) => {
    setHover(true);
    event.stopPropagation();
    event.preventDefault();
  };

  const dragExit = (event) => {
    setHover(false);
    event.stopPropagation();
    event.preventDefault();
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
      return;
    }

    const newDate = calendarState.weekDays[ind]
    dispatch({
      type: "CHANGE_EVENT_DATE",
      event: data,
      newDate: newDate,
      startTime: hourInd,
    })
    await fetch("/api/events/updateEvent", {
      method: "POST",
      body: [JSON.stringify({ ...data, eventDate: addHours(newDate, 6), eventStartTime: hourInd })],
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  // Hooks
  const theme = useTheme();

  return (
    <div style={{
      padding: 2,
      borderRight: ((ind + 1) % 7) != 0 ? `1px solid ${theme.palette.backgroundLight}` : "",
      borderBottom: `1px solid ${theme.palette.backgroundLight}`,
      width: "100%", height: "100%",
      backgroundColor: (hover ? theme.palette.primary.main : isWeekendDay ? theme.palette.backgroundLighter : ""),
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
  // States
  const {
    dispatch: dispatchModal
  } = ModalState();

  // Hooks
  const theme = useTheme();

  // Functions
  const handleOpenModal = (type, props = {}) => {
    dispatchModal({
      type: "SHOW_MODAL",
      modalType: type,
      modalProps: props,
    })
  }
  return (
    <>
      <Divider />
      <WeekViewDayHeaders />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gridAutoColumns: "auto", gridAutoRows: "auto", overflowY: "scroll", }}>
        <div style={{
          borderTop: `1px solid ${theme.palette.backgroundLight}`,
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
            borderTop: `1px solid ${theme.palette.backgroundLight}`,
            position: 'relative',
            display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gridAutoColumns: "auto", gridAutoRows: "auto"
          }}>
            <WeekViewDayEvents weekDayIndex={ind} />
            {timeStamps && timeStamps.map((hour, hourInd) => {
              return (
                <WeekEventSlotElement key={hourInd} ind={ind} hourInd={hourInd}
                  handleOpenAddEventModal={(time, day) => { handleOpenModal("NEW_EVENT", { time: time, day: day }) }}
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