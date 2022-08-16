

// Components
import { Box, Badge, Typography, useTheme } from '@mui/material'

// Icons
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventIcon from '@mui/icons-material/Event';
import { getTimeLabel } from '../../../utility/constants';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

// Types
import Event from '../../../types/interfaces/Event'
interface IEventsIconNotification{
    numberOfEvents:number;
    icon: ReactJSXElement;
}
interface IEventsBox{
    events:Event[];
}
const EventsIconNotification = (props:IEventsIconNotification) => {
    const { numberOfEvents, icon } = props;
    return (
        <>
            {numberOfEvents > 0 &&
                <Badge
                    badgeContent={numberOfEvents}
                    color="primary" variant="dot" sx={{ mr: 1 }}>
                    {icon}
                </Badge>}
        </>
    )
}

const EventsBox = (props:IEventsBox) => {
    const { events } = props;
    // States
    let numberOfEvents = 0
    let numberOfTasks = 0
    let numberOfReminders = 0

    events.filter((event) => {
        switch (event.type) {
            case 'event':
                numberOfEvents++;
                break;
            case 'task':
                numberOfTasks++;
                break;
            case 'reminder':
                numberOfReminders++;
                break;
            default:

        }
    })

    // Hooks
    const theme = useTheme();

    return (
        <Box sx={{ width: "100%", py: 0.5 }}>
            <EventsIconNotification numberOfEvents={numberOfTasks} icon={
                <AssignmentIcon fontSize="small"  />
            } />
            <EventsIconNotification numberOfEvents={numberOfReminders} icon={
                <NotificationsActiveIcon fontSize="small" />
            } />

            <Box component="span" sx={{ display: { xs: 'block', lg: 'none' } }}>
                <EventsIconNotification numberOfEvents={numberOfEvents} icon={
                    <EventIcon fontSize="small"  />
                } />
            </Box>

            <Box sx={{
                pb: 1,
                my: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap',
            }}>

                {events.map((event, ind) => {
                    if (event.type === 'event') return (
                        <Typography
                            key={ind}
                            sx={{
                                display: { xs: 'none', lg: 'block' }, borderRadius: 5, bgcolor: event.color,
                                color: 'white', textAlign: 'center',

                                fontSize: 9, mr: 0.3, my: 0.3, py: 0.4, px: 0.8
                            }}>
                            {getTimeLabel(event.eventStartTime)}
                        </Typography>

                    )

                })}

            </Box>

        </Box>
    )
}

export default EventsBox;