import { useState } from "react";
// Context States
import { ModalState } from "../../context/ModalContext";
import { CalendarState } from "../../context/CalendarContext";

// Componentes
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
  DialogTitle,
} from "@mui/material";
import { ConfirmationDialog } from "../calendar/CalendarListComponents/EditDeleteMenuButton";
// Utility
import { format } from "date-fns";
import { getTimeLabel } from "../../utility/constants";

// Icons
import EventNoteIcon from "@mui/icons-material/EventNote";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

// Types
import Calendar from "../../types/interfaces/Calendar";
import Event from "../../types/interfaces/Event";
const EventInfoModal = () => {
  // States
  const [serverError, setServerError] = useState(false);

  const {
    state: { calendarState },
    dispatch,
  } = CalendarState();
  const {
    state: { modalState },
    dispatch: dispatchModal,
  } = ModalState();
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const { event }: { event: Event } = modalState.modalProps;
  const calendar =
    event &&
    calendarState.calendars[
      calendarState.calendars.findIndex((calendar: Calendar) => {
        if (calendar.id === event.calendar_id) return calendar;
      })
    ];

  const openAddEventModal =
    modalState.modalType === "EVENT_INFO" ? true : false;

  // Hooks
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // Functions
  const closeModal = () => {
    dispatchModal({ type: "HIDE_MODAL" });
  };
  const showModal = (type: string, props: object = {}) => {
    dispatchModal({
      type: "SHOW_MODAL",
      modalType: type,
      modalProps: props,
    });
  };
  const deleteEvent = async () => {
    setServerError(false);

    await fetch("/api/events/deleteEvent", {
      method: "POST",
      body: JSON.stringify(event.id),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 201) {
        dispatch({
          type: "DELETE_EVENT",
          event: event,
        });
      } else {
        setServerError(true);
        return;
      }
    });
  };
  return (
    <>
      {openAddEventModal && (
        <Dialog
          open={openAddEventModal}
          onClose={closeModal}
          fullScreen={fullScreen}
        >
          <DialogTitle
            sx={{
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 1,
              pl: 3,
              pr: 1,
            }}
          >
            <Typography variant="body1">
              {event.type.charAt(0).toUpperCase() +
                event.type.slice(1) +
                " Details"}
            </Typography>
            <IconButton onClick={closeModal} disableRipple={true}>
              <CloseIcon
                sx={{ fontSize: 30, color: theme.palette.primary.contrastText }}
              />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ p: 1 }}>
            {serverError && (
              <Typography
                color="error"
                variant="body1"
                textAlign="center"
                sx={{ my: 2 }}
                fontSize="large"
              >
                An error occured. Try again!
              </Typography>
            )}
            <Box sx={{ width: "100%", p: 2 }}>
              <Typography variant="h5" sx={{}}>
                {event.name}
              </Typography>
              <Divider
                sx={{
                  width: "100%",
                  borderBottomWidth: 2,
                  borderColor: event.color,
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  my: 2,
                }}
              >
                <EventNoteIcon />
                <Typography variant="body1" sx={{ px: 1 }}>
                  {event.description.length > 0
                    ? event.description
                    : "(no description)"}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  my: 2,
                }}
              >
                <AccessTimeIcon />
                <Typography variant="body1" sx={{ px: 1 }}>
                  {format(event.eventDate, "MMMMMM dd, yyyy")}
                </Typography>

                <Typography variant="body1" sx={{ px: 1 }}>
                  {event.allDay
                    ? "All Day"
                    : getTimeLabel(event.eventStartTime) +
                      " - " +
                      getTimeLabel(event.eventStartTime + event.eventLength)}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  my: 2,
                }}
              >
                <CalendarMonthIcon />
                <Typography variant="body1" sx={{ px: 1 }}>
                  {calendar.name}
                </Typography>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              color="secondary"
              startIcon={<EditIcon />}
              onClick={() => {
                closeModal();
                showModal("NEW_EVENT", {
                  tabId:
                    event.type === "event" ? 0 : event.type === "task" ? 1 : 2,
                  event: event,
                });
              }}
              sx={{ m: 1 }}
            >
              Edit
            </Button>
            <Button
              color="error"
              startIcon={<DeleteIcon />}
              onClick={async () => {
                // closeModal();
                setShowConfirmationDialog(true);
                // await deleteEvent();
              }}
              sx={{ m: 1 }}
            >
              Delete
            </Button>
            <Button onClick={closeModal}>Cancel</Button>
            <ConfirmationDialog
              handleAccept={async () => {
                await deleteEvent();
                setShowConfirmationDialog(false);
                closeModal();
              }}
              handleCancel={() => {
                setShowConfirmationDialog(false);
              }}
              info={`Are you sure that you want to delete this?`}
              show={showConfirmationDialog}
            />
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default EventInfoModal;
