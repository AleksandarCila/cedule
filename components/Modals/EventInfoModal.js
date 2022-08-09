
import { Modal, Box, Typography, Button, Fab } from '@mui/material'

import { ModalState } from '../../context/ModalContext'
import { CalendarState } from '../../context/CalendarContext'

import { format } from 'date-fns';

import { useTheme } from '@mui/material';
import { addAlphaToColor } from '../../utility/addAlphaToColor';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close'

import { getTimeLabel } from '../../utility/constants';

const EventInfoModal = props => {
    const {
        state: { calendarState },
        dispatch
    } = CalendarState();
    const {
        state: { modalState },
        dispatch: dispatchModal
    } = ModalState();

    const { event } = modalState.modalProps;
    const calendar = event && calendarState.calendars[calendarState.calendars.findIndex((calendar) => {
        if (calendar.id === event.calendar_id) return calendar;
    })]

    const openAddEventModal = modalState.modalType === "EVENT_INFO" ? true : false;
    const theme = useTheme();

    return (
        <>
            {openAddEventModal &&
                <Modal
                    open={openAddEventModal}
                    onClose={() => dispatch(
                        {
                            type: "HIDE_MODAL",
                        }
                    )}
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',

                        width: { xs: "80vw", md: "50vw" },
                        height: "70vh",
                        overflow: 'hidden',
                        bgcolor: "#fff",
                        borderRadius: 5,
                        boxShadow: 24,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}>
                        <div style={{ width: "100%" }}>
                            <Fab
                                color="primary"
                                size="small"
                                onClick={() => {
                                    dispatch({
                                        type: "HIDE_MODAL",
                                    });
                                }}
                                sx={{
                                    position: 'absolute', top: 7, right: 10,
                                    display: "flex", justifyContent: 'center', alignItems: "center"
                                }}>
                                <CloseIcon />
                            </Fab>
                            <Box sx={{ width: "100%", height: 50, bgcolor: event.color }}>

                            </Box>
                            <Box sx={{ width: '100%', p: 2 }}>
                                <Typography variant="h5" sx={{ my: 2 }}>{event.name}</Typography>
                                <Box sx={{ display: "flex", justifyContent: 'flex-start', alignItems: 'center', my: 2 }}>
                                    <EventNoteIcon />
                                    <Typography variant="body1" sx={{ px: 1 }}>{event.description}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: 'flex-start', alignItems: 'center', my: 2 }}>
                                    <AccessTimeIcon />
                                    <Typography variant="body1" sx={{ px: 1 }}>
                                        {format(event.eventDate, 'MMMMMM dd, yyyy')}
                                    </Typography>

                                    <Typography variant="body1" sx={{ px: 1 }}>
                                        {event.allDay ? "All Day" : getTimeLabel(event.eventStartTime) + " - " + getTimeLabel(event.eventStartTime + event.eventLength)}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: 'flex-start', alignItems: 'center', my: 2 }}>
                                    <CalendarMonthIcon />
                                    <Typography variant="body1" sx={{ px: 1 }}>
                                        {calendar.name}
                                    </Typography>
                                </Box>
                            </Box>
                        </div>
                        <div style={{ width: "100%" }}>
                            <Box sx={{ width: "100%", p: 2, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Button size="medium" color="primary" variant="contained" startIcon={<EditIcon />} onClick={() => {
                                    dispatchModal({
                                        type: "HIDE_MODAL"
                                    });
                                    dispatchModal({
                                        type: "SHOW_MODAL",
                                        modalType: "NEW_EVENT",
                                        modalProps: {
                                            tabId: event.type === 'event' ? 0 : event.type === 'task' ? 1 : 2,
                                            event: event
                                        }
                                    })
                                }}
                                    sx={{ m: 1 }}>
                                    Edit
                                </Button>
                                <Button size="medium" color="error" variant="contained" startIcon={<DeleteIcon />} onClick={async () => {
                                    dispatchModal({
                                        type: "HIDE_MODAL"
                                    });
                                    dispatch({
                                        type: "DELETE_EVENT",
                                        event: event
                                    })
                                    await fetch("/api/events/deleteEvent", {
                                        method: "POST",
                                        body: [JSON.stringify(event.id)],
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    });
                                }}
                                    sx={{ m: 1 }}>
                                    Delete
                                </Button>
                            </Box>
                        </div>
                    </Box>
                </Modal>}</>
    )

}

export default EventInfoModal;