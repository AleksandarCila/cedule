import React, { useState } from "react";

// Context States
import { CalendarState } from "../../../context/CalendarContext";
import { ModalState } from "../../../context/ModalContext";

// Components
import {
  Box,
  Typography,
  Fab,
  useTheme,
  useMediaQuery,
  SpeedDial,
  SpeedDialAction,
  Backdrop,
} from "@mui/material";
import MonthView from "../MonthViewComponents/MonthView";
import WeekView from "../WeekViewComponents/WeekView";
import DayView from "../DayViewElements/DayView";
import NoteView from "../NotesComponents/NoteView";
import CalendarNavigationPane from "./CalendarNavigationPane";
import CalendarViewMenu from "./CalendarViewMenu";

// Utility
import { getCalendarTabLabel } from "../../../utility/getCalendarTabLabel";
import { addDays, addMonths, addWeeks } from "date-fns";

// Icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import TodayIcon from "@mui/icons-material/Today";
import ArticleIcon from "@mui/icons-material/Article";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EventIcon from "@mui/icons-material/Event";

const actions = [
  {
    icon: <EventIcon />,
    name: "Event",
    modal: "NEW_EVENT",
    props: { tabId: 0 },
  },
  {
    icon: <AssignmentIcon />,
    name: "Task",
    modal: "NEW_EVENT",
    props: { tabId: 1 },
  },
  {
    icon: <NotificationsActiveIcon />,
    name: "Reminder",
    modal: "NEW_EVENT",
    props: { tabId: 2 },
  },
  { icon: <ArticleIcon />, name: "Note", modal: "NEW_NOTE", props: {} },
];

const tabNames = [
  {
    title: "Month",
    mobileTitle: "Month",
    content: <MonthView />,
    icon: <CalendarMonthIcon />,
  },
  {
    title: "Week",
    mobileTitle: "3-day",
    content: <WeekView />,
    icon: <ViewWeekIcon />,
  },
  {
    title: "Day",
    mobileTitle: "Day",
    content: <DayView />,
    icon: <TodayIcon />,
  },
  {
    title: "Notes",
    mobileTitle: "Notes",
    content: <NoteView />,
    icon: <ArticleIcon />,
  },
];

const CalendarTabPanel = () => {
  // States
  const {
    state: { calendarState },
    dispatch,
  } = CalendarState();
  const { dispatch: dispatchModal } = ModalState();
  const [tabValue, setTabValue] = useState<number>(0);
  const [backdrop, setBackdrop] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 100;

  // Hooks
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  // Functions
  const handleTabChange = (
    e: React.MouseEvent<HTMLElement>,
    newValue: number
  ) => {
    if (newValue !== null) setTabValue(newValue);
  };
  const handleOpenModal = (type: string, props: object = {}) => {
    dispatchModal({
      type: "SHOW_MODAL",
      modalType: type,
      modalProps: props,
    });
  };
  const handleAddTimeClick = (qty: number) => {
    let newDate = calendarState.selectedDate;
    switch (tabValue) {
      case 0:
        newDate = addMonths(newDate, qty);
        newDate = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
        break;
      case 1:
        if (!isMobile) {
          newDate = addWeeks(newDate, qty);
        } else {
          newDate = addDays(newDate, qty);
        }
        break;
      case 2:
        newDate = addDays(newDate, qty);
        break;
      case 3:
        newDate = addDays(newDate, qty);
        break;
      default:
    }
    dispatch({
      type: "SET_SELECTED_DATE",
      payload: {
        day: newDate,
      },
    });
  };
  // Touch Events
  const onTouchStart = (e: any) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleAddTimeClick(+1);
    } else if (isRightSwipe) {
      if (tabValue === 3) {
        setTabValue(0);
      }
      handleAddTimeClick(-1);
    }

    // add your conditional logic here
  };
  return (
    
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
        }}
      >
        <CalendarNavigationPane
          isMobile={isMobile}
          handleAddTimeClick={handleAddTimeClick}
        />
        <Box
          sx={{
            flex: 1,
            display: { xs: "flex", sm: "flex" },
            justifyContent: "center",
            alignItems: "center",
            px: 1,
          }}
        >
          <Typography variant="h6" fontSize="small">
            {getCalendarTabLabel(calendarState.selectedDate, tabValue)}
          </Typography>
        </Box>
        <CalendarViewMenu
          tabValue={tabValue}
          handleTabChange={handleTabChange}
          tabNames={tabNames}
        />
      </Box>
      <Backdrop
        sx={{ color: theme.palette.primary.light, zIndex: 50 }}
        open={backdrop}
        onClick={() => {
          setBackdrop(false);
        }}
      />
      <SpeedDial
        ariaLabel="Adding New Events SpeedDial"
        sx={{ position: "absolute", bottom: 25, right: 25 }}
        icon={<SpeedDialIcon />}
        color="primary"
        onClose={() => {
          setBackdrop(false);
        }}
        onOpen={() => {
          setBackdrop(true);
        }}
        open={backdrop}
      >
        {actions.map((action) => (
          <SpeedDialAction
            tooltipOpen={true}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
              handleOpenModal(action.modal, {
                ...action.props,
                time: 0,
                day: calendarState.selectedDate,
              });
            }}
          />
        ))}
      </SpeedDial>
      <Box
        sx={{
          flex: 1,
          maxHeight: "100%",
          overflowY: "auto",
          position: "relative",
          overflowX: "auto",
        }}
      >
        {tabNames.map((tab, ind) => {
          if (tabValue !== ind) {
            return;
          }
          return (
            <Typography
              component="div"
              role="tabpanel"
              hidden={tabValue !== ind}
              key={ind}
              sx={{
                display: tabValue !== ind ? "none" : "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                bgcolor: theme.palette.background.default,
              }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {tab.content}
            </Typography>
          );
        })}
      </Box>
    </Box>
  );
};

export default CalendarTabPanel;
