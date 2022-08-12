import { useState } from "react";

// Components
import { Collapse, Divider, Typography, Box } from "@mui/material";
import EventComponent from './EventComponent'

const EventCollapseGroup = props => {
    const { children, events, label } = props;
    
    // States
    const [collapsed, setCollapsed] = useState(true);

    const handleClick = () =>{
        setCollapsed(prev => !prev)
    }
    return (
        <Box sx={{
            "&:hover": {
                cursor: 'pointer'
            },
            my:1
        }}>
            <Typography component="div" fontSize="small" variant="body1" onClick={handleClick}
                sx={{
                    "&:hover": {
                        cursor: 'pointer'
                    },
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                {children}
                <Typography fontSize="small" sx={{ml:1}}>{label + " (" + events.length + ")"}</Typography>
            </Typography>
            <Divider sx={{ borderBottomWidth: 2,mt:0.5 }} />

            <Collapse in={collapsed} >
                <Box sx={{ p: 1 }}>
                    {events && events.map((event, id) => (
                        <EventComponent key={id} event={event} />
                    ))}
                </Box>
            </Collapse>
        </Box>
    )
}

export default EventCollapseGroup;