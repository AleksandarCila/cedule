import { useState } from "react";
// Context States
import { ModalState } from "../../context/ModalContext";
import { CalendarState } from "../../context/CalendarContext";

// Componentes
import {
  Box,
  Typography,
  Button,
  Fab,
  useTheme,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  useMediaQuery,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import { ConfirmationDialog } from "../calendar/CalendarListComponents/EditDeleteMenuButton";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

// Types
import Note from "../../types/interfaces/Note";
const NoteReadingModal = () => {
  // States
  const {
    state: { calendarState },
    dispatch,
  } = CalendarState();
  const {
    state: { modalState },
    dispatch: dispatchModal,
  } = ModalState();
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const { note }: { note: Note } = modalState.modalProps;

  const openAddEventModal = modalState.modalType === "NOTE_READ" ? true : false;

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
  const deleteNote = async () => {
    dispatch({
      type: "DELETE_NOTE",
      id: note.id,
    });
    await fetch("/api/notes/deleteNote", {
      method: "POST",
      body: JSON.stringify(note.id),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const handleOpenEditNote = () => {
    dispatchModal({
      type: "SHOW_MODAL",
      modalType: "NEW_NOTE",
      modalProps: {
        title: note.title,
        content: note.content,
        edit: true,
        id: note.id,
      },
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
            <Typography variant="h6">{note.title}</Typography>
            <IconButton onClick={closeModal} disableRipple>
              <CloseIcon  sx={{ fontSize: 30,color: theme.palette.primary.contrastText, }} />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ p: 0.5 }}>
            <Box sx={{ width: "100%", p: 2 }}>
              {/* <Divider sx={{ width: "100%", borderBottomWidth: 2, borderColor: event.color }} /> */}
              <DialogContentText sx={{whiteSpace:"pre-line"}}>{note.content}</DialogContentText>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              color="secondary"
              startIcon={<EditIcon />}
              onClick={() => {
                closeModal();
                handleOpenEditNote();
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
            <ConfirmationDialog
              handleAccept={async () => {
                await deleteNote();
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

export default NoteReadingModal;
