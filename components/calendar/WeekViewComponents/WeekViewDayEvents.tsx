import { useState, useEffect, useMemo } from "react";

// Context States
import { CalendarState } from "../../../context/CalendarContext";
import { ModalState } from "../../../context/ModalContext";

// Components
import { Typography, Box, useTheme } from "@mui/material";

// Utility
import { isSameDay } from "date-fns";
import { timeStamps } from "../../../utility/constants";
import { addAlphaToColor } from "../../../utility/addAlphaToColor";

// Icons
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EventIcon from "@mui/icons-material/Event";

// Types
import Event from "../../../types/interfaces/Event";
import Calendar from "../../../types/interfaces/Calendar";
import { Circle } from "@mui/icons-material";
interface IWeekViewDayEvents {
  day?: Date;
  weekDayIndex: number;
}
const WeekViewDayEvents = (props: IWeekViewDayEvents) => {
  const { weekDayIndex } = props;
  // States
  const {
    state: { calendarState },
    dispatch,
  } = CalendarState();
  const { dispatch: dispatchModal } = ModalState();
  const [loading, setLoading] = useState(true);

  const day = props.day
    ? props.day
    : weekDayIndex >= 0
    ? calendarState.weekDays[weekDayIndex]
    : new Date();
  // let events = [];

  const events = useMemo(() => {
    let events: Event[] = [];
    calendarState.calendars.forEach((calendar: Calendar) => {
      if (calendar.visible) events = events.concat(calendar.events);
    });
    events = events.filter((event) => {
      if (isSameDay(day, event.eventDate)) return event;
    });
    events = events.sort((a, b) => {
      return a.eventStartTime - b.eventStartTime;
    });
    return events;
  }, [
    calendarState.calendars,
    calendarState.weekDays,
    calendarState.threeDays,
    calendarState.selectedDate,
    day,
  ]);
  // Hooks
  const theme = useTheme();
  useEffect(() => setLoading(false), []);

  // Drag Handles
  const dragStart = (e: React.DragEvent<HTMLElement>, event: Event) => {
    e.dataTransfer.setData("data", JSON.stringify(event));
  };

  const onDragOver = (event: React.DragEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
  };

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
      {!loading &&
        events &&
        events.map((event, ind) => {
          return (
            <Box
              key={ind}
              sx={{
                position: "absolute",
                top: `${
                  (event.eventStartTime / timeStamps.length) * 100 + 0.05
                }%`,
                left: `${2 + ind * 2}%`,
                width: `${96 - 2 * ind}%`,
                height: `${
                  event.eventLength * ((1 / timeStamps.length) * 100) - 0.1
                }%`,
                backgroundColor: theme.palette.primary.main,
                borderRadius: 2,
                zIndex: 999 + ind,
                boxShadow: 3,
                py: 0.1,
                px: 1,
                color: theme.palette.primary.contrastText,
                overflow: "hidden",
                textOverflow: "ellipsis",
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor: addAlphaToColor(
                    theme.palette.primary.main,
                    0.9
                  ),
                },
              }}
              onDragStart={(e) => dragStart(e, event)}
              onDragOver={onDragOver}
              onClick={() => {
                handleOpenModal("EVENT_INFO", { event: event });
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Circle sx={{ color: event.color, fontSize: 10, mr: 0.5 }} />
                {event.type === "reminder" ? (
                  <NotificationsActiveIcon sx={{ fontSize: 14, mr: 1 }} />
                ) : event.type === "task" ? (
                  <AssignmentIcon sx={{ fontSize: 14, mr: 1 }} />
                ) : (
                  ""
                )}
                <Typography fontSize="small" variant="body1" noWrap={true}>
                  {event.type === "event"
                    ? `${timeStamps[event.eventStartTime].label}-${
                        timeStamps[event.eventStartTime + event.eventLength]
                          .label
                      }`
                    : event.name}
                </Typography>
              </Box>
              <Typography fontSize="small" variant="body1" noWrap={true}>
                {event.name}
              </Typography>
            </Box>
          );
        })}
    </>
  );
};

export default WeekViewDayEvents;
