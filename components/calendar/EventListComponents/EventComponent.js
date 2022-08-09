import { Typography, Box, Divider } from "@mui/material";
import { getTimeLabel } from "../../../utility/constants";
import EventNoteIcon from '@mui/icons-material/EventNote';
import { ModalState } from '../../../context/ModalContext'


const EventComponent = props => {
    const { event } = props;
    const {
        dispatch
    } = ModalState();

    return (
        <Box sx={{
            display: 'flex', justifyContent: 'flex-start', alignItems: 'center', "&:hover": {
                color: event.color
            }
        }}
            onClick={() => {
                dispatch({
                    type: "SHOW_MODAL",
                    modalType: "EVENT_INFO",
                    modalProps: {
                        event: event
                    }
                })
            }}
        >
            <Divider sx={{ height: 25, width: 5, borderRightWidth: 5, mr: 1, borderColor: event.color }} orientation="vertical" />
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: "wrap", my: 0.5 }}>
                <Typography variant="span" fontSize="small" sx={{ mr: 1, }}>
                    {event.allDay ? "All Day" : getTimeLabel(event.eventStartTime) + " - " + getTimeLabel(event.eventStartTime + event.eventLength)}
                </Typography>
                <Typography variant="span" fontSize="small" sx={{ mr: 1 }} noWrap={true}>{event.name}</Typography>
                {event.description.length > 0 && <EventNoteIcon fontSize="small" />}
            </Box>
        </Box>
    )
}

export default EventComponent;