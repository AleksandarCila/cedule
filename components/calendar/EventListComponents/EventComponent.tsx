// Context States
import { ModalState } from '../../../context/ModalContext'

// Components
import { Typography, Box, Divider } from "@mui/material";

// Utility
import { getTimeLabel } from "../../../utility/constants";

// Icon
import EventNoteIcon from '@mui/icons-material/EventNote';

// Types
import Event from '../../../types/interfaces/Event'
interface IEventComponent {
    event: Event
}
const EventComponent = (props:IEventComponent) => {
    const { event } = props;

    // States
    const {
        dispatch
    } = ModalState();

    const handleOpenModal = (type:string, props:object = {}) => {
        dispatch({
            type: "SHOW_MODAL",
            modalType: type,
            modalProps: props
        })
    }
    return (
        <Box sx={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', "&:hover": {
                color: event.color
            }
        }}
            onClick={() => { handleOpenModal("EVENT_INFO", { event: event }) }}
        >
            <Divider sx={{ height: 25, width: 5, borderRightWidth: 5, mr: 1, borderColor: event.color }} orientation="vertical" />
            <Box sx={{ width: "100%", display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: "wrap", my: 0.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column' }}>
                    <Typography variant="body1" fontSize="small" sx={{}}>
                        {event.allDay ? "All Day" : getTimeLabel(event.eventStartTime) + " - " + getTimeLabel(event.eventStartTime + event.eventLength)}
                    </Typography>
                    <Typography variant="body1" sx={{}} noWrap={false}>{event.name}</Typography>
                </Box>

            </Box>
            {event.description.length > 0 && <EventNoteIcon fontSize="small" />}
        </Box>
    )
}

export default EventComponent;