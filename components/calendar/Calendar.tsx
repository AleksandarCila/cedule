import { useState, useEffect, useCallback } from "react";
// Context States
import { CalendarState } from "../../context/CalendarContext";
import { ModalState } from "../../context/ModalContext";

// Components
import { Box, useTheme, Fab, useMediaQuery } from "@mui/material";
import EventList from "./EventListComponents/EventList";
import CalendarTabPanel from "./CalendarTabComponents/CalendarTabPanel";
import ResponsiveDrawer from "./ResponsiveDrawer";
import CalendarList from "./CalendarListComponents/CalendarList";
import ErrorDialog from "../Modals/ErrorDialog";

//Icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const drawerStyle = {
  width: { xs: "0%", lg: "20%" },
  maxWidth: { xs: 0, lg: 240 },
};

const MyCalendar = () => {
  // States
  const [serverError, setServerError] = useState(true);
  const {
    state: { calendarState },
    dispatch,
  } = CalendarState();
  const {
    state: { modalState },
    dispatch: dispatchModal,
  } = ModalState();
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [openTasks, setOpenTasks] = useState<boolean>(false);

  // Hooks
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const fetchCalendarsAndNotes = useCallback(async () => {
    setServerError(false);
    await fetch("api/calendar/getAllCalendars", {
      method: "GET",
    }).then(async (res) => {
      if (res.status === 200) {
        const calendars = await res.json();
        dispatch({
          type: "SET_CALENDARS",
          calendars: calendars,
        });
      } else {
        setServerError(true);
        return;
      }
    });
    await fetch("api/notes/getAllNotes", {
      method: "GET",
    }).then(async (res) => {
      if (res.status === 200) {
        try {
          const notes = await res.json();

          dispatch({
            type: "SET_NOTES",
            notes: notes,
          });
        } catch (error) {
          setServerError(true);
          return;
        }
      } else {
        setServerError(true);
        return;
      }
    });
  }, []);
  useEffect(() => {
    if (modalState.modalProps.modalType === "AGENDA") setOpenTasks(true);
  }, [modalState]);

  useEffect(() => {
    fetchCalendarsAndNotes();
  }, [fetchCalendarsAndNotes]);

  return (
    <div style={{ width: "100%" }}>
      <ErrorDialog open={serverError} handleClick={fetchCalendarsAndNotes} />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Fab
          color="primary"
          onClick={() => {
            dispatchModal({
              type: "SHOW_MODAL",
              modalType: "DEPTH",
            });
            setOpenOptions((prev) => !prev);
          }}
          sx={{
            display: { xs: "flex", lg: "none" },
            position: "absolute",
            bottom: 100,
            left: 25,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CalendarMonthIcon />
        </Fab>
        <Fab
          color="primary"
          onClick={() => {
            dispatchModal({
              type: "SHOW_MODAL",
              modalType: "DEPTH",
            });
            setOpenTasks((prev) => !prev);
          }}
          sx={{
            display: { xs: "flex", lg: "none" },
            position: "absolute",
            bottom: 25,
            left: 25,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ScheduleIcon />
        </Fab>
        <Box sx={drawerStyle}>
          <ResponsiveDrawer
            anchor="left"
            mobileOpenCalendarList={openOptions}
            closeCalendarList={() => {
              setOpenOptions(false);
            }}
          >
            <CalendarList />
          </ResponsiveDrawer>
        </Box>
        <Box
          sx={{
            flex: 1,
            height: "100vh",
            border: `1px solid ${theme.palette.backgroundLight}`,
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <CalendarTabPanel />
        </Box>
        <Box sx={drawerStyle}>
          <ResponsiveDrawer
            anchor="right"
            mobileOpenCalendarList={openTasks}
            closeCalendarList={() => {
              setOpenTasks(false);
            }}
          >
            <EventList />
          </ResponsiveDrawer>
        </Box>
      </Box>
    </div>
  );
};

export default MyCalendar;
