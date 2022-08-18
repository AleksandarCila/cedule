// Context States
import { CalendarState } from "../../../context/CalendarContext";
import { ModalState } from '../../../context/ModalContext'
// Components
import Image from "next/image";
import { useTheme, Skeleton, Typography, Box, Button, Divider } from "@mui/material";
import EventCollapseGroup from "./EventCollapseGroup";

// Utility
import { addAlphaToColor } from "../../../utility/addAlphaToColor";
import { daysLong, months } from "../../../utility/constants";

// Icons
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EventIcon from "@mui/icons-material/Event";

const EventList = () => {
  // States
  const {
    state: { calendarState },
  } = CalendarState();
  const {
    dispatch: dispatchModal
  } = ModalState();
  const theme = useTheme();

  const events = calendarState.todayEvents;

  // Functions
  const handleOpenModal = (type: string, props: object = {}) => {
    dispatchModal({
      type: "SHOW_MODAL",
      modalType: type,
      modalProps: props,
    });
  };
  return (
    <div>
      <Box sx={{ pl: 2, pt: 1, display: { xs: "block", lg: "none" } }}>
        <Image
          src="/assets/logo.png"
          alt="Cedule Logo"
          width={100}
          height={60}
          objectFit="contain"
        />
      </Box>
      <Box sx={{ width: "100%", p: 2 }}>
        <Button
          size="medium"
          color="primary"
          variant="contained"
          endIcon={<PlaylistAddIcon />}
          onClick={() => {
            handleOpenModal("EVENT_CHOOSE");
          }}
          sx={{ width: "100%", borderRadius: 0 }}
        >
          Add a new Event
        </Button>
        <Divider sx={{ width: "100%", my: 1 }} />
        <Typography variant="h6">
          {daysLong[calendarState.selectedDate.getDay()] +
            " " +
            calendarState.selectedDate.getDate() +
            ", " +
            months[calendarState.selectedDate.getMonth()]}
        </Typography>
        {calendarState.loading ? (
          <>
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
          </>
        ) : (
          events && (
            <>
              <EventCollapseGroup
                events={events[1].events}
                label={events[1].label}
              >
                <AssignmentIcon />
              </EventCollapseGroup>
              <EventCollapseGroup
                events={events[2].events}
                label={events[2].label}
              >
                <NotificationsActiveIcon />
              </EventCollapseGroup>
              <EventCollapseGroup
                events={events[0].events}
                label={events[0].label}
              >
                <EventIcon />
              </EventCollapseGroup>
            </>
          )
        )}
      </Box>
    </div>
  );
};

export default EventList;
