import { useEffect, useState } from "react";

// Context States
import { ModalState } from '../../../context/ModalContext'
import { CalendarState } from '../../../context/CalendarContext'

// Components
import { Box, Typography, IconButton, Tabs, Fab, useTheme, Dialog, DialogContent, DialogTitle, useMediaQuery } from "@mui/material";
import NewTaskForm from './NewTaskForm'
import NewReminderForm from './NewRemiderForm'
import NewEventForm from './NewEventForm'

// Utility
import { addAlphaToColor } from "../../../utility/addAlphaToColor";

// Icons
import CloseIcon from '@mui/icons-material/Close';


// Types

const NewEventModal = () => {
    // States
    const {
        state: { modalState },
        dispatch
    } = ModalState();
    const {
        state: { calendarState },
    } = CalendarState();
    const [value, setValue] = useState<number>(0);

    const { time, day } = modalState.modalProps;
    const openAddEventModal = modalState.modalType === "NEW_EVENT" ? true : false;

    let title = "";
    switch (value) {
        case 0:
            title = modalState.modalProps.event ? "Edit Event" : "New Event";
            break;
        case 1:
            title = modalState.modalProps.event ? "Edit Task" : "New Task";

            break;
        case 2:
            title = modalState.modalProps.event ? "Edit Reminder" : "New Reminder";

            break;
        default:

    }
    // Hooks
    const theme = useTheme();
    useEffect(() => {
        setValue(modalState.modalProps.tabId ? modalState.modalProps.tabId : 0)
    }, [modalState.modalProps])
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    // Functions
    const hideModal = () => {
        dispatch(
            {
                type: "HIDE_MODAL",
            }
        )
    }
    return (
        <Dialog
            open={openAddEventModal}
            onClose={hideModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
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
                    {title}
                </Typography>
                <IconButton onClick={hideModal} disableRipple={true}>
                    <CloseIcon sx={{ fontSize: 30, color: theme.palette.primary.contrastText, }} />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{my:2}}>
                {value === 0 && <NewEventForm time={time} day={day} calendars={calendarState.calendars} event={modalState.modalProps.event} />}
                {value === 1 && <NewTaskForm time={time} day={day} calendars={calendarState.calendars} event={modalState.modalProps.event} />}
                {value === 2 && <NewReminderForm time={time} day={day} calendars={calendarState.calendars} event={modalState.modalProps.event} />}
            </DialogContent>
        </Dialog>
    )

}

export default NewEventModal;