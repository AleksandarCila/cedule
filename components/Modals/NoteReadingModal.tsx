import { useState } from 'react';
// Context States
import { ModalState } from '../../context/ModalContext'
import { CalendarState } from '../../context/CalendarContext'

// Componentes
import { Box, Typography, Button, Fab, useTheme, Dialog, DialogContent, DialogActions, IconButton, Divider, DialogTitle, DialogContentText } from '@mui/material'
import { ConfirmationDialog } from '../calendar/CalendarListComponents/EditDeleteMenuButton';
// Utility
import { format } from 'date-fns';
import { getTimeLabel } from '../../utility/constants';

// Icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close'

// Types
import Note from '../../types/interfaces/Note';
const NoteReadingModal = () => {
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
    const { note }: { note: Note } = modalState.modalProps;

    const openAddEventModal = modalState.modalType === "NOTE_READ" ? true : false;

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
    const deleteNote = async () => {
        dispatch({
            type: "DELETE_NOTE",
            id: note.id
        })
        await fetch("/api/notes/deleteNote", {
            method: "POST",
            body: JSON.stringify(note.id),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    const handleOpenEditNote = () => {
        dispatchModal({
            type: "SHOW_MODAL",
            modalType: "NEW_NOTE",
            modalProps: {
                title: note.title,
                content: note.content,
                edit: true,
                id: note.id
            },

        })
    }
    return (
        <>
            {openAddEventModal &&
                <Dialog
                    open={openAddEventModal}
                    onClose={closeModal}
                >
                    <DialogTitle>{note.title}</DialogTitle>
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
                            {/* <Divider sx={{ width: "100%", borderBottomWidth: 2, borderColor: event.color }} /> */}
                            <DialogContentText>
                                {note.content}
                            </DialogContentText>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" startIcon={<EditIcon />} onClick={() => {
                            closeModal();
                            handleOpenEditNote();
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
                        <ConfirmationDialog handleAccept={async () => { await deleteNote(); setShowConfirmationDialog(false); closeModal(); }}
                            handleCancel={() => { setShowConfirmationDialog(false) }}
                            info={`Are you sure that you want to delete this?`} show={showConfirmationDialog} />
                    </DialogActions>
                </Dialog>}
        </>
    )

}

export default NoteReadingModal;