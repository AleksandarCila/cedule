import { useState, useEffect, useRef } from "react";

// Context States
import { ModalState } from "../../context/ModalContext";
import { CalendarState } from "../../context/CalendarContext";

// Components
import {
  Box,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  Typography,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

const NewNoteModal = () => {
  // States
  const [serverError, setServerError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);
  const {
    state: { modalState },
    dispatch: dispatchModal,
  } = ModalState();
  const { dispatch } = CalendarState();

  const [formState, setFormState] = useState({
    title: modalState.modalProps.title ? modalState.modalProps.title : "",
    content: modalState.modalProps.content ? modalState.modalProps.content : "",
    formErrors: { name: "", content: "" },
    titleValid: modalState.modalProps.title ? true : false,
  });
  const [formValid, setFormValid] = useState(false);

  const open = modalState.modalType === "NEW_NOTE" ? true : false;
  const bottomDividerRef = useRef();

  // Hooks
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setFormState({
      ...formState,
      title: modalState.modalProps.title ? modalState.modalProps.title : "",
      content: modalState.modalProps.content
        ? modalState.modalProps.content
        : "",
      titleValid: modalState.modalProps.title ? true : false,
    });
  }, [modalState.modalProps]);

  useEffect(() => {
    setFormValid(formState.titleValid);
  }, [formState.titleValid]);

  // Functions
  const handleUserInput = (e: any, inputName = "", inputValue = "") => {
    const name = e ? e.target.name : inputName;
    const value = e ? e.target.value : inputValue;
    validateField(name, value);
  };

  const validateField = (fieldName: string, value: any) => {
    let fieldValidationErrors = formState.formErrors;
    let titleValid = formState.titleValid;

    switch (fieldName) {
      case "title":
        titleValid = value.length > 0 ? true : false;
        fieldValidationErrors.name = titleValid ? "" : " is empty";
        break;
      default:
        break;
    }
    setFormState({
      ...formState,
      [fieldName]: value,
      formErrors: fieldValidationErrors,
      titleValid: titleValid,
    });
  };

  const handleAddNote = async () => {
    const noteData = {
      // user_id: calendars[formState.calendar].id,
      title: formState.title,
      content: formState.content,
      date: new Date(),
    };
    setServerError(false);
    setLoading(true);
    if (modalState.modalProps.edit) {
      await fetch("/api/notes/editNote", {
        method: "POST",
        body: JSON.stringify({ ...noteData, id: modalState.modalProps.id }),
        headers: {
          "Content-Type": "application/json",
        },

      }).then((response) => {
        if (response.status === 201) {
          dispatch({
            type: "EDIT_NOTE",
            noteData: { ...noteData, id: modalState.modalProps.id },
          });
          setLoading(false);

        } else {
          setServerError(true);
          setLoading(false);
          return;
        }
      });
    } else {
      await fetch("/api/notes/addNewNote", {
        method: "POST",
        body: JSON.stringify(noteData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (response) => {
        if (response.status === 201) {
          const note = await response.json();

          dispatch({
            type: "ADD_NEW_NOTE",
            noteData: { ...noteData, id: note.result.insertId },
          });
          setLoading(false);
        } else {
          setServerError(true);
          setLoading(false);

          return;
        }
      });
    }
    handleClose();
  };

  const handleClose = () => {
    dispatchModal({ type: "HIDE_MODAL" });
  };
  return (
    <>
      {open && (
        <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
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
              {modalState.modalProps.edit ? "Edit Note" : "Add a new Note"}
            </Typography>
            <IconButton onClick={handleClose} disableRipple={true}>
              <CloseIcon
                sx={{ fontSize: 30, color: theme.palette.primary.contrastText }}
              />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ p: 0.5 }}>
            <Box sx={{ width: "100%", p: 2 }}>
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
              <TextField
                required
                onChange={(e) => handleUserInput(e)}
                id="title"
                name="title"
                label="Note Title"
                value={formState.title}
                placeholder="Add a Note title"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
                helperText={
                  formState.titleValid ? "" : "Note must have a title"
                }
                error={!formState.titleValid}
                inputProps={{ maxLength: 60 }}
              />
              <TextField
                id="note-content-input"
                label=""
                name="content"
                placeholder="Note text..."
                size="small"
                multiline
                minRows={7}
                fullWidth
                value={formState.content}
                autoFocus={modalState.modalProps.edit ? true : false}
                onFocus={(event) => {
                  event.target.setSelectionRange(1000, 1000);
                  if (bottomDividerRef.current)
                    /* @ts-ignore */
                    bottomDividerRef.current.scrollIntoView({
                      behavior: "smooth",
                    });
                }}
                onChange={(event) => {
                  handleUserInput(event);
                }}
                inputProps={{ maxLength: 2000 }}
              />
              <Box ref={bottomDividerRef}></Box>
            </Box>
          </DialogContent>
          <DialogActions>
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                <Button onClick={handleClose}>Cancel</Button>
                <Button disabled={!formValid} onClick={handleAddNote}>
                  {modalState.modalProps.edit ? "Save Note" : "Add Note"}
                </Button>
              </>
            )}
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default NewNoteModal;
