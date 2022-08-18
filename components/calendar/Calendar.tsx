import { useState, useEffect, useCallback } from "react";
// Context States
import { CalendarState } from "../../context/CalendarContext";
import { ModalState } from "../../context/ModalContext";

// Components
import { Button, Box, useTheme, Fab } from "@mui/material";
import EventList from "./EventListComponents/EventList";
import CalendarTabPanel from "./CalendarTabComponents/CalendarTabPanel";
import ResponsiveDrawer from "./ResponsiveDrawer";
import CalendarList from "./CalendarListComponents/CalendarList";

//Icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScheduleIcon from "@mui/icons-material/Schedule";

const drawerStyle = {
  width: { xs: "0%", lg: "20%" },
  maxWidth: { xs: 0, lg: 240 },
};

const MyCalendar = () => {
  // States
  const {
    state: { calendarState },
    dispatch,
  } = CalendarState();
  const {
    state: { modalState },
    dispatch: dispatchModal
  } = ModalState();
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [openTasks, setOpenTasks] = useState<boolean>(false);
  const [counter, setCounter] = useState(0);
  // Hooks
  const theme = useTheme();
  const fetchCalendarsAndNotes = useCallback(async () => {
    await fetch("api/calendar/getAllCalendars", {
      method: "GET",
    }).then(async (res) => {
      const calendars = await res.json();
      dispatch({
        type: "SET_CALENDARS",
        calendars: calendars,
      });
    });
    let res = await fetch("api/notes/getAllNotes", {
      method: "GET",
    });
    const notes = await res.json();
    dispatch({
      type: "SET_NOTES",
      notes: notes,
    });
  }, []);
  useEffect(() => {
    if (modalState.modalProps.modalType === "AGENDA") setOpenTasks(true);
  }, [modalState]);

  useEffect(() => {
    fetchCalendarsAndNotes();
  }, [fetchCalendarsAndNotes]);


  // Handles back button on PWA
  // useEffect(() => {
  //   const popstateListener = (event: any) => {
  //     console.log(event.state)
  //   }

  //   window.addEventListener('popstate', popstateListener);

  //   return () => { window.removeEventListener('popstate', popstateListener) }
  // }, [])

  // useEffect(() => {
  //   if (openTasks) {
  //     setCounter(prev => prev + 1);
  //   }
  //   else {
  //     setCounter(prev => { if (prev <= 0) return 0; else return prev - 1 });
  //   }

  // }, [openTasks])
  // useEffect(() => {
  //   if (openOptions) {
  //     setCounter(prev => prev + 1);
  //   }
  //   else {
  //     setCounter(prev => { if (prev <= 0) return 0; else return prev - 1 });

  //   }
  // }, [openOptions])
  // useEffect(() => {
  //   if (modalState.modalType !== "HIDE_MODAL") {
  //     setCounter(prev => prev + 1)
  //   }
  //   else {
  //     setCounter(prev => { if (prev <= 0) return 0; else return prev - 1 });

  //   }
  // }, [modalState])
  // useEffect(() => {
  //   if (window) window.history.pushState({ depth: counter }, '')
  //   var popStateEvent = new PopStateEvent('popstate', { state: counter });
  //   dispatchEvent(popStateEvent);
  // }, [counter])
  return (
    <div style={{ width: "100%" }}>
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
            setOpenOptions((prev) => !prev);
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
          <CalendarMonthIcon />
        </Fab>
        <Fab
          color="primary"
          onClick={() => setOpenTasks((prev) => !prev)}
          sx={{
            display: { xs: "flex", lg: "none" },
            position: "absolute",
            bottom: 100,
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
            closeCalendarList={() => setOpenOptions(false)}
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
            closeCalendarList={() => setOpenTasks(false)}
          >
            <EventList />
          </ResponsiveDrawer>
        </Box>
      </Box>
    </div>
  );
};

export default MyCalendar;
