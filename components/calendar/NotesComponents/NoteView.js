
// Context States
import { CalendarState } from "../../../context/CalendarContext";

// Components
import { Box, Divider, useTheme } from "@mui/material";
import NoteTags from './NoteTags'
import NoteBox from './NoteBox'

const NoteView = props => {

    // States
    const {
        state: { calendarState },
    } = CalendarState();
    
    // Hooks
    const theme = useTheme();

    return (
        <Box sx={{
            borderTop: 1,
            borderColor: theme.palette.backgroundLight,
            p: 1,
            width: "100%",
            height: "100%",
            overflowY: "auto",
            position: 'relative'
        }}>
            <NoteTags />
            <Divider sx={{ width: "100%", my: 1 }} />
            <Box sx={{ width: "100%", display: "flex", justifyContent: 'space-around', alignItems: 'flex-start', flexWrap: "wrap" }}>
                {!calendarState.loading && calendarState.notes.map((note, ind) => {
                    return (
                        <NoteBox key={ind} note={note} />
                    )
                })}
            </Box>
        </Box>
    )
}

export default NoteView;