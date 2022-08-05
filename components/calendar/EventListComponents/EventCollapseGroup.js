import { useState } from "react";
import { Collapse, Divider, Typography, Box } from "@mui/material";
import EventComponent from './EventComponent'

const EventCollapseGroup = props => {
    const { events, label, color } = props;
    const [collapsed, setCollapsed] = useState(true);
    // console.log(events);
    return (
        <Box sx={{
            "&:hover": {
                cursor: 'pointer'
            }
        }}>
            <Typography variant="span" onClick={() => { setCollapsed(prev => !prev) }}
                sx={{
                    "&:hover": {
                        cursor: 'pointer'
                    }
                }}>
                {label + " (" + events.length + ")"}
                <Divider sx={{ borderBottomWidth: 2, borderColor: color }} />
            </Typography>
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