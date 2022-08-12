// Context states
import { CalendarState } from "../../../context/CalendarContext";
import { ModalState } from "../../../context/ModalContext";

// Components
import Image from 'next/image'
import { Divider, Typography, Button, useTheme, Skeleton, IconButton } from '@mui/material';
import CalendarListItem from './CalendarListItem'

// Utility
import { addAlphaToColor } from "../../../utility/addAlphaToColor";

// Icon
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const CalendarList = props => {
    // States
    const {
        state: { calendarState },
    } = CalendarState();
    const {
        dispatch: dispatchModal
    } = ModalState();
    const stateLoading = calendarState.loading;

    // Hooks
    const theme = useTheme();

    // Functions
    const handleOpenModal = (type, props = {}) => {
        dispatchModal({
            type: "SHOW_MODAL",
            modalType: type,
            modalProps: props,
        });
    }
    return (
        <div>
            <div style={{ width: "100%", height: 50, position: 'relative' }}>
                {/* <Image
                    src="/assets/calendar_header_image.webp"
                    alt="Various people stand in a line backwards cartoon"
                    layout='fill'
                    objectFit="cover"
                />
                <div
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: addAlphaToColor(theme.palette.primary.main, 0.15) }}
                >
                </div> */}
            </div>
            <div style={{ padding: 8, width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: "wrap",}}>
                <Button size="medium" color="primary" variant="contained" endIcon={<PlaylistAddIcon />} onClick={() => { handleOpenModal("NEW_EVENT") }}
                    sx={{ width: "100%",borderRadius:0 }}>
                    Add a new Event
                </Button>
                <Divider sx={{ width: '100%', my: 1 }} />
                <div style={{
                    width: "100%", display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
                }}>
                    <Typography variant="body1" fontSize="large" sx={{ width: "100%" }}>Calendars</Typography>
                    <IconButton disableRipple color="primary" size="small" sx={{ width: 25, mx: 0.5 }} onClick={() => { handleOpenModal("NEW_CALENDAR") }}><AddIcon /></IconButton>
                    <IconButton disableRipple color="primary" size="small" sx={{ width: 25 }}><SettingsIcon /></IconButton>
                </div>
                {/* <Divider sx={{ width: '100%', my: 1 }} /> */}
                <div style={{ width: "100%", padding: "0px 8px" }}>
                    {stateLoading ?
                        <>
                            <Skeleton variant="text" animation="wave" />
                            <Skeleton variant="text" animation="wave" />
                            <Skeleton variant="text" animation="wave" />
                        </> : calendarState.calendars.map((calendar, id) => {
                            return (<CalendarListItem key={id} calendar={calendar} />)
                        })}
                </div>
            </div>

        </div>
    )
}

export default CalendarList;