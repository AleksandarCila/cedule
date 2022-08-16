import { useState } from 'react';
// Context States
import { ModalState } from '../../context/ModalContext'
import { CalendarState } from '../../context/CalendarContext'

// Componentes
import { Box, Typography, Button, Fab, useTheme, Dialog, DialogContent, DialogActions, IconButton, Divider } from '@mui/material'
import { ConfirmationDialog } from '../calendar/CalendarListComponents/EditDeleteMenuButton';
// Utility
import { format } from 'date-fns';
import { getTimeLabel } from '../../utility/constants';

// Icons
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close'

// Types
import Calendar from '../../types/interfaces/Calendar'
import Event from '../../types/interfaces/Event'
const EventInfoModal = () => {
    // States
    const {
        state: { calendarState },
        dispatch
    } = CalendarState();
    const {
        state: { modalState },
        dispatch: dispatchModal
    } = ModalState();
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
    const { event }:{event:Event} = modalState.modalProps;
    const calendar = event && calendarState.calendars[calendarState.calendars.findIndex((calendar:Calendar) => {
        if (calendar.id === event.calendar_id) return calendar;
    })]

    const openAddEventModal = modalState.modalType === "EVENT_INFO" ? true : false;

    // Hooks
    const theme = useTheme();

    // Functions
    const closeModal = () => {
        dispatchModal({ type: "HIDE_MODAL", })
    }
    const showModal = (type:string, props:object = {}) => {
        dispatchModal({
            type: "SHOW_MODAL",
            modalType: type,
            modalProps: props
        })
    }
    const deleteEvent = async () => {
        dispatch({
            type: "DELETE_EVENT",
            event: event
        })
        await fetch("/api/events/deleteEvent", {
            method: "POST",
            body: JSON.stringify(event.id),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    return (
        <>
            {openAddEventModal &&
                <Dialog
                    open={openAddEventModal}
                    onClose={closeModal}
                >

                    
                    <DialogContent >
                        <IconButton
                            disableRipple
                            onClick={closeModal}
                            sx={{
                                position: 'absolute', top: 7, right: 10,
                                display: "flex", justifyContent: 'center', alignItems: "center",
                                color: ""
                            }}>
                            <CloseIcon />
                        </IconButton>

                        <Box sx={{ width: '100%', p: 2 }}>
                            <Typography variant="h5" sx={{ }}>{event.name}</Typography>
                            <Divider sx={{width:"100%", borderBottomWidth:2, borderColor: event.color }}/>
                            <Box sx={{ display: "flex", justifyContent: 'flex-start', alignItems: 'center', my: 2 }}>
                                <EventNoteIcon />
                                <Typography variant="body1" sx={{ px: 1 }}>{event.description.length > 0 ? event.description : "(no description)"}</Typography>
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
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" startIcon={<EditIcon />} onClick={() => {
                            closeModal();
                            showModal("NEW_EVENT", {
                                tabId: event.type === 'event' ? 0 : event.type === 'task' ? 1 : 2,
                                event: event
                            });
                        }}
                            sx={{ m: 1 }}>
                            Edit
                        </Button>
                        <Button color="error" startIcon={<DeleteIcon />} onClick={async () => {
                            // closeModal();
                            setShowConfirmationDialog(true);
                            // await deleteEvent();
                        }}
                            sx={{ m: 1 }}>
                            Delete
                        </Button>
                        <ConfirmationDialog handleAccept={async () => { await deleteEvent(); setShowConfirmationDialog(false); closeModal(); }}
                            handleCancel={() => { setShowConfirmationDialog(false) }}
                            info={`Are you sure that you want to delete this?`} show={showConfirmationDialog} />
                    </DialogActions>
                </Dialog>}
        </>
    )

}

export default EventInfoModal;