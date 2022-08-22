import React, { useState, useRef } from "react";

// Context States
import { ModalState } from "../../../context/ModalContext";
import { CalendarState } from "../../../context/CalendarContext";

// Components
import { Divider, useTheme, Box, useMediaQuery } from "@mui/material";
import WeekViewDayHeaders from "./WeekViewDayHeaders";
import WeekViewDayEvents from "./WeekViewDayEvents";
import TimeStamp from "./TimeStamp";

// Utility
import { days, timeStamps } from "../../../utility/constants";
import { addHours } from "date-fns";

// Types
interface IWeekEventsSlotElement {
  ind: number;
  hourInd: number;
  handleOpenAddEventModal(time: number, day: Date): void;
}
const WeekEventSlotElement = (props: IWeekEventsSlotElement) => {
  const { ind, hourInd, handleOpenAddEventModal } = props;
  // States
  const {
    state: { calendarState },
    dispatch,
  } = CalendarState();
  const [hover, setHover] = useState<boolean>(false);
  const isWeekendDay = ind == 0 || ind == 6 ? true : false;

  // Drag Functions
  const dragEnter = (event: React.DragEvent<HTMLElement>) => {
    setHover(true);
    event.stopPropagation();
    event.preventDefault();
  };

  const dragExit = (event: React.DragEvent<HTMLElement>) => {
    setHover(false);
    event.stopPropagation();
    event.preventDefault();
  };

  const onDragOver = (event: React.DragEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const handleDrop = async (event: React.DragEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setHover(false);
    let data;
    try {
      data = JSON.parse(event.dataTransfer.getData("data"));
    } catch (e) {
      return;
    }

    const newDate = calendarState.weekDays[ind];
    dispatch({
      type: "CHANGE_EVENT_DATE",
      event: data,
      newDate: newDate,
      startTime: hourInd,
    });
    await fetch("/api/events/updateEvent", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        eventDate: addHours(newDate, 6),
        eventStartTime: hourInd,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  // Hooks
  const theme = useTheme();

  return (
    <div
      style={{
        padding: 2,
        borderRight:
          (ind + 1) % 7 != 0
            ? `1px solid ${theme.palette.backgroundLight}`
            : "",
        borderBottom: `1px solid ${theme.palette.backgroundLight}`,
        width: "100%",
        height: 20,
        backgroundColor: hover
          ? theme.palette.primary.main
          : isWeekendDay
          ? theme.palette.backgroundLighter
          : "",
      }}
      onDragEnter={dragEnter}
      onDragStart={(e) => {
        e.preventDefault();
      }}
      onDragLeave={dragExit}
      onDragOver={onDragOver}
      onDrop={handleDrop}
      onClick={() =>
        handleOpenAddEventModal(hourInd, calendarState.weekDays[ind])
      }
    ></div>
  );
};


const WeekView = () => {
  // States
  const { dispatch: dispatchModal } = ModalState();
  const {
    state: { calendarState },
  } = CalendarState();
  // Hooks
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const days = isMobile ? calendarState.threeDays : calendarState.weekDays;
  // Functions
  const handleOpenModal = (type: string, props: object = {}) => {
    dispatchModal({
      type: "SHOW_MODAL",
      modalType: type,
      modalProps: props,
    });
  };
  return (
    <>
      <Divider />
      <WeekViewDayHeaders />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          overflowY: "scroll",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            borderTop: `1px solid ${theme.palette.backgroundLight}`,
            width: "20%",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          {timeStamps.map((hour, hourInd) => {
            return <TimeStamp key={hourInd} hour={hour} hourInd={hourInd} />;
          })}
        </div>

        {days.map((day:Date, ind:number) => {
          return (
            <div
            key={ind}
              style={{
                borderTop: `1px solid ${theme.palette.backgroundLight}`,
                position: "relative",
                width: `${80 / (isMobile ? 3 : 7)}%`,
              }}
            >
              <WeekViewDayEvents weekDayIndex={-1} day={day}/>
              {timeStamps &&
                timeStamps.map((hour, hourInd) => {
                  return (
                    <WeekEventSlotElement
                      key={hourInd}
                      ind={ind}
                      hourInd={hourInd}
                      handleOpenAddEventModal={(time, day) => {
                        handleOpenModal("NEW_EVENT", { time: time, day: day });
                      }}
                    />
                  );
                })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WeekView;
