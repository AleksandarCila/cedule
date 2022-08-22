// Context States
import { CalendarState } from "../../../context/CalendarContext";

// Components
import { Box, Divider, Grid, Typography, useTheme } from "@mui/material";
import NoteTags from "./NoteTags";
import NoteBox from "./NoteBox";

// Types
import Note from "../../../types/interfaces/Note";
const NoteView = () => {
  // States
  const {
    state: { calendarState },
  } = CalendarState();

  // Hooks
  const theme = useTheme();

  return (
    <Box
      sx={{
        borderTop: 1,
        borderColor: theme.palette.backgroundLight,
        p: 1,
        width: "100%",
        height: "100%",
        overflowY: "auto",
        position: "relative",
      }}
    >
      <NoteTags />
      <Divider sx={{ width: "100%", my: 1 }} />
      <Grid container sx={{ width: "100%" }} spacing={2}>
        {!calendarState.loading &&
          calendarState.notes.map((note: Note, ind: number) => {
            return (
              <Grid key={ind} item xs={6} md={4} lg={3}>
                <NoteBox note={note} />
              </Grid>
            );
          })}
        {calendarState.notes.length === 0 && <Grid item xs={12}>
          <Typography color="secondary" variant="h6" textAlign="center">You do not have any Notes. Add some!</Typography></Grid>}
      </Grid>
    </Box>
  );
};

export default NoteView;
