import { useEffect, useState } from "react";

// Context States
import { ModalState } from '../../../context/ModalContext'
import { CalendarState } from '../../../context/CalendarContext'

// Components
import { Box, Typography, Tab, Tabs, Fab, useTheme, Dialog, DialogContent, DialogTitle, useMediaQuery } from "@mui/material";
import NewTaskForm from './NewTaskForm'
import NewReminderForm from './NewRemiderForm'
import NewEventForm from './NewEventForm'

// Utility
import { addAlphaToColor } from "../../../utility/addAlphaToColor";

// Icons
import CircleIcon from '@mui/icons-material/Circle';
import CloseIcon from '@mui/icons-material/Close';


// Types
interface ITabPanel {
    children?: React.ReactNode;
    value: number;
    index: number;
}
function TabPanel(props: ITabPanel) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            id={`event-tabpanel-${index}`}
            aria-labelledby={`event-tab-${index}`}
            {...other}
            style={{}}
        >
            {value === index && (
                <Box sx={{ height: 450, width: "100%" }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `event-tab-${index}`,
        'aria-controls': `event-tabpanel-${index}`,
    };
}

const NewEventModal = () => {
    // States
    const {
        state: { modalState },
        dispatch
    } = ModalState();
    const {
        state: { calendarState },
    } = CalendarState();
    const [value, setValue] = useState<number>(0);

    const { time, day } = modalState.modalProps;
    const openAddEventModal = modalState.modalType === "NEW_EVENT" ? true : false;

    // Hooks
    const theme = useTheme();
    useEffect(() => {
        setValue(modalState.modalProps.tabId ? modalState.modalProps.tabId : 0)
    }, [modalState.modalProps])
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    // Functions
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    };

    const hideModal = () => {
        dispatch(
            {
                type: "HIDE_MODAL",
            }
        )
    }
    return (
        <Dialog
            open={openAddEventModal}
            onClose={hideModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            fullScreen={fullScreen}
        >

            <DialogTitle>
                <Fab
                    color="primary"
                    onClick={hideModal}
                    size="small"
                    sx={{
                        position: 'absolute', top: 5, right: 5,
                        display: "flex", justifyContent: 'center', alignItems: "center"
                    }}>
                    <CloseIcon />
                </Fab>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                {/* @ts-ignore */}
                    <Tabs size="small" value={value} onChange={handleChange} aria-label="event tabs" >
                {/* @ts-ignore custom is not part of theme object*/}
                        <Tab disableRipple disabled={modalState.modalProps.tabId != null && modalState.modalProps.tabId != 0} icon={<CircleIcon sx={{ color: theme.custom.events.event }} fontSize="small" />} iconPosition="start" label={<Typography fontSize="small">Event</Typography>} {...a11yProps(0)} />
                {/* @ts-ignore custom is not part of theme object*/}
                        <Tab disableRipple disabled={modalState.modalProps.tabId != null && modalState.modalProps.tabId != 1} icon={<CircleIcon sx={{ color: theme.custom.events.task }} fontSize="small" />} iconPosition="start" label="Task" {...a11yProps(1)} />
                {/* @ts-ignore custom is not part of theme object*/}
                        <Tab disableRipple disabled={modalState.modalProps.tabId != null && modalState.modalProps.tabId != 2} icon={<CircleIcon sx={{ color: theme.custom.events.reminder }} fontSize="small" />} iconPosition="start" label="Reminder" {...a11yProps(2)} />
                    </Tabs>
                </Box>
            </DialogTitle>
            <DialogContent >
                <TabPanel value={value} index={0} >
                    <NewEventForm time={time} day={day} calendars={calendarState.calendars} event={modalState.modalProps.event} />
                </TabPanel>
                <TabPanel value={value} index={1} >
                    <NewTaskForm time={time} day={day} calendars={calendarState.calendars} event={modalState.modalProps.event} />
                </TabPanel>
                <TabPanel value={value} index={2} >
                    <NewReminderForm time={time} day={day} calendars={calendarState.calendars} event={modalState.modalProps.event} />
                </TabPanel>
            </DialogContent>
        </Dialog>
    )

}

export default NewEventModal;