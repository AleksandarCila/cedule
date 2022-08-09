import { useState } from "react";
import { Collapse, Divider, Typography, Box } from "@mui/material";
import EventComponent from './EventComponent'

const EventCollapseGroup = props => {
    const { children, events, label, color } = props;
    const [collapsed, setCollapsed] = useState(true);
    // console.log(events);
    return (
        <Box sx={{
            "&:hover": {
                cursor: 'pointer'
            },
            my:1
        }}>

            <Typography variant="span" onClick={() => { setCollapsed(prev => !prev) }}
                sx={{
                    "&:hover": {
                        cursor: 'pointer'
                    },
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                {children}
                {label + " (" + events.length + ")"}
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