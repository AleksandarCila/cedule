import { useState } from "react";
import { CalendarState } from "../../context/CalendarContext";
import Image from 'next/image'
import { Divider, Fab, Typography, useTheme } from '@mui/material';
import { addAlphaToColor } from "../../utility/addAlphaToColor";

import { IconButton, Button } from '@mui/material'

import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

import NewEventModal from './NewEvent/NewEventModal'

const CalendarList = props => {
    const {
        state: { calendarState },
        dispatch,
    } = CalendarState();
    
    const [openAddEventModal, setOpenAddEventModal] = useState(false);
    const handleOpenAddEventModal = () => {
        setOpenAddEventModal(prev => !prev)
    }
    const theme = useTheme();
    return (
        <div>
            <NewEventModal openAddEventModal={openAddEventModal} handleOpenAddEventModal={handleOpenAddEventModal} />
            <div style={{ width: "100%", height: 113, position: 'relative' }}>

                <Image
                    src="/assets/calendar_header_image.webp"
                    alt="Various people stand in a line backwards cartoon"
                    layout='fill'
                    // width={300}
                    // height="100"
                    objectFit="cover"
                // height={300}
                />
                <div
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: addAlphaToColor(theme.palette.primary.main, 0.15) }}
                >
                </div>
            </div>
            <div style={{ padding: 8, width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: "wrap" }}>
                <Button size="medium" color="primary" variant="contained" endIcon={<PlaylistAddIcon />} onClick={handleOpenAddEventModal}
                    sx={{ width: "100%" }}>
                    Add a new Event
                </Button>
                <Divider sx={{ width: '100%', my: 2 }} />
                <div style={{
                    width: "100%", display: 'flex', justifyContent: 'flex-end', alignItems: 'center',

                }}>
                    <Typography variant="h6" sx={{ width: "100%" }}>Calendars</Typography>
                    <Fab variant="extended" color="primary" size="small" sx={{ width: 25, mx: 0.5 }}><AddIcon /></Fab>
                    <Fab variant="extended" color="secondary" size="small" sx={{ width: 25 }}><SettingsIcon /></Fab>
                </div>
            </div>

        </div>
    )
}

export default CalendarList;