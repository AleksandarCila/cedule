
const { Box, useTheme, Typography, Divider, Chip } = require("@mui/material")
import { ModalState } from "../../../context/ModalContext";

import NoteMoreButton from './NoteMoreButton'

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { format } from 'date-fns'
import { CalendarState } from "../../../context/CalendarContext";

const NoteBox = props => {
    const { note } = props;
    const theme = useTheme();
    const {
        dispatch: dispatchModal
    } = ModalState();

    const {
        dispatch
    } = CalendarState();

    return <Box sx={{
        borderRadius: 10,
        border: 1,
        borderColor: theme.palette.grey['300'],
        py: 3, px: 2, m: 0.5, boxShadow: 2,
        width: { xs: "100%", sm: "40%", lg: "30%" },
    }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis" }}>
                <Typography variant="span" >{note.title}</Typography>
            </div>
            <NoteMoreButton note={note} dispatch={dispatch} />
        </div>

        <Box sx={{ my: 1, display: 'flex', alignItems: 'center' }}>
            <CalendarMonthIcon fontSize="small" sx={{ color: theme.palette.grey['300'] }} />
            <Typography fontSize="small" sx={{ px: 1 }}>
                {format(note.date, 'MMMMMM dd, yyyy')}
            </Typography>
        </Box>
        {/* <Box sx={{ my: 1, display: 'flex', alignItems: 'center' }}>
            {note.tags.map((tag, ind) => {
                return (<Chip key={ind} size="small" label={tag.name} variant="outlined" />)
            })}
        </Box> */}
        <Divider sx={{ width: "100%", my: 1 }} />
        <Box sx={{ width: "100%", height: 150, wordBreak: "break-all", overflow: "hidden", textOverflow: "ellipsis", }}>
            <Typography variant="body1" fontSize="small">
                {note.content}
            </Typography>
        </Box>
    </Box>
}

export default NoteBox;