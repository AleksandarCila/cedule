
import { Box, Divider, useTheme, Fab } from "@mui/material";

import { CalendarState } from "../../../context/CalendarContext";

import NoteTags from './NoteTags'
import NoteBox from './NoteBox'
// import { notes } from '../../../utility/constants'

const NoteView = props => {
    const {
        state: { calendarState },
        dispatch
    } = CalendarState();
    
    const theme = useTheme();
    return (
        <Box sx={{
            borderTop: 1,
            borderColor: theme.palette.grey['200'],
            p: 1,
            width: "100%",
            height: "100%",
            overflowY: "scroll",
            position: 'relative'
        }}>
            <NoteTags />
            <Divider sx={{ width: "100%", my: 1 }} />
            <Box sx={{ width: "100%", display: "flex", justifyContent: 'space-around', alignItems: 'flex-start', flexWrap: "wrap" }}>
                {calendarState.notes.map((note, ind) => {
                    return (
                        <NoteBox key={ind} note={note} />
                    )
                })}
            </Box>
        </Box>
    )
}

export default NoteView;