
import { useState, useRef } from 'react';
import { Box, Typography, Divider, Fab } from '@mui/material'
import { useTheme } from '@mui/material';
import { addAlphaToColor } from "../../utility/addAlphaToColor";
import AddIcon from '@mui/icons-material/Add';

import CalendarLayout from './CalendarLayout';
import NewEventModal from './NewEvent/NewEventModal';
import WeekViewDayHeaders from './WeekViewComponents/WeekViewDayHeaders'
import WeekViewDayEvents from './WeekViewComponents/WeekViewDayEvents'
import TimeStamp from './WeekViewComponents/TimeStamp'

import { days, timeStamps } from "../../utility/constants"

const WeekEventSlotElement = props => {
  const { ind, day, events, handleOpenAddEventModal } = props;
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

  const handleDrop = event => {
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
    // draggable
    >
    </div >)

}

const WeekView = (props) => {


  const theme = useTheme();

  const [addEventModalState, setAddEvenModalState] = useState({
    time: new Date(),
    day: new Date()
  })

  const [openAddEventModal, setOpenAddEventModal] = useState(false);
  const handleOpenAddEventModal = (time, day) => {

    setAddEvenModalState({
      time: time, day: day
    })
    setOpenAddEventModal(prev => !prev)
  }

  return (
    <CalendarLayout style={props.style}>
      <NewEventModal time={addEventModalState.time} day={addEventModalState.day} openAddEventModal={openAddEventModal} handleOpenAddEventModal={handleOpenAddEventModal} />

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
                <WeekEventSlotElement key={hourInd} ind={ind}
                  // time={time}
                  // handleOpenAddEventModal={() => (handleOpenAddEventModal(time, day))
                  handleOpenAddEventModal={() => { }}
                  draggable
                  onDragEnter={(e) => dragEnter(e, ind)}

                />
              )
            })}
          </div>)
        })}

      </div>
    </CalendarLayout >
  )
}

export default WeekView;