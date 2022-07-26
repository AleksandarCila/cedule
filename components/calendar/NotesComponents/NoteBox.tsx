// Context States
import { ModalState } from "../../../context/ModalContext";
import { CalendarState } from "../../../context/CalendarContext";

// Components
import { Box, useTheme, Typography, Divider, Chip } from "@mui/material";
import EditDeleteMenuButton from "../CalendarListComponents/EditDeleteMenuButton";
import ErrorDialog from "../../Modals/ErrorDialog";
// Utility
import { format } from "date-fns";

// Icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

// Types
import Note from "../../../types/interfaces/Note";
import { useState } from "react";
interface INoteBox {
  note: Note;
}
const NoteBox = (props: INoteBox) => {
  const { note } = props;
  // States
  const [serverError, setServerError] = useState(false);
  const { dispatch: dispatchModal } = ModalState();
  const { dispatch } = CalendarState();

  // Hooks
  const theme = useTheme();

  // Functions
  const handleDeleteNote = async () => {
    setServerError(false);
    await fetch("/api/notes/deleteNote", {
      method: "POST",
      body: JSON.stringify(note.id),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 201) {
        dispatch({
          type: "DELETE_NOTE",
          id: note.id,
        });
      } else {
        setServerError(true);
        return;
      }
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

  const handleOpenToReadNote = () => {
    dispatchModal({
      type: "SHOW_MODAL",
      modalType: "NOTE_READ",
      modalProps: {
        note: note,
      },
    });
  };
  return (
    <Box
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleOpenToReadNote();
      }}
      sx={{
        borderRadius: 2,
        // border: 1,
        bgcolor: theme.palette.backgroundLight,
        // borderColor: theme.palette.backgroundLight,
        py: 1,
        px: 1,
        m: 0.5,
        boxShadow: `0px 0px 2px ${theme.palette.primary.main}`,
        width: "100%",
        height: "100%",
        "&:hover": {
          boxShadow: `0px 0px 6px ${theme.palette.primary.main}`,
          cursor: "pointer",
        },
      }}
    >
      {serverError && (
        <ErrorDialog open={serverError} handleClick={handleDeleteNote} />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <Typography variant="body1">{note.title}</Typography>
        </div>
        <EditDeleteMenuButton
          onEditClick={handleOpenEditNote}
          onDeleteClick={handleDeleteNote}
        />
      </div>

      <Box sx={{ my: 1, display: "flex", alignItems: "center" }}>
        <CalendarMonthIcon
          fontSize="small"
          sx={{ color: theme.palette.primary.main }}
        />
        <Typography fontSize="small" sx={{ px: 1 }}>
          {format(note.date, "MMMMMM dd, yyyy")}
        </Typography>
      </Box>
      {/* <Box sx={{ my: 1, display: 'flex', alignItems: 'center' }}>
            {note.tags.map((tag, ind) => {
                return (<Chip key={ind} size="small" label={tag.name} variant="outlined" />)
            })}
        </Box> */}
      <Divider sx={{ width: "100%", my: 1 }} />
      <Box
        sx={{
          width: "100%",
          height: 150,
          wordBreak: "break-all",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <Typography
          variant="body1"
          fontSize="small"
          sx={{ whiteSpace: "pre-line" }}
        >
          {note.content}
        </Typography>
      </Box>
    </Box>
  );
};

export default NoteBox;
