import { useEffect, useState } from "react";
import { Modal, Box, Typography, Tab, Tabs, Fab } from "@mui/material";

import { ModalState } from '../../../context/ModalContext'
import { CalendarState } from '../../../context/CalendarContext'

import { useTheme } from '@mui/material';
import { addAlphaToColor } from "../../../utility/addAlphaToColor";

import CircleIcon from '@mui/icons-material/Circle';
import CloseIcon from '@mui/icons-material/Close';

import NewTaskForm from './NewTaskForm'
import NewReminderForm from './NewRemiderForm'
import NewEventForm from './NewEventForm'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`event-tabpanel-${index}`}
            aria-labelledby={`event-tab-${index}`}
            {...other}
            style={{ height: 'calc(100% - 60px)', overflowY: 'scroll' }}
        >
            {value === index && (
                <Box sx={{ p: 1 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `event-tab-${index}`,
        'aria-controls': `event-tabpanel-${index}`,
    };
}

const NewEventModal = props => {
    const {
        state: { modalState },
        dispatch
    } = ModalState();
    const {
        state: { calendarState },
    } = CalendarState();

    const { time, day } = modalState.modalProps;
    const openAddEventModal = modalState.modalType === "NEW_EVENT" ? true : false;


    const theme = useTheme();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue)

    };

    useEffect(() => {
        setValue(modalState.modalProps.tabId ? modalState.modalProps.tabId : 0)
    }, [modalState.modalProps])
    console.log(modalState.modalProps.tabId);

    return (
        <div>
            <Modal
                open={openAddEventModal}
                onClose={() => dispatch(
                    {
                        type: "HIDE_MODAL",
                    }
                )}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',

                    width: { xs: "80vw", md: "50vw" },
                    height: "70vh",
                    overflow: 'hidden',
                    bgcolor: "#fff",
                    borderRadius: 5,
                    boxShadow: 24,
                    p: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                    <Box sx={{ width: '100%', height: "100%" }}>
                        <Fab
                            color="primary"
                            onClick={() => {
                                dispatch({
                                    type: "HIDE_MODAL",
                                });
                            }}
                            sx={{
                                position: 'absolute', top: 15, right: 15,
                                display: "flex", justifyContent: 'center', alignItems: "center"
                            }}>
                            <CloseIcon />
                        </Fab>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="event tabs">
                                <Tab disabled={modalState.modalProps.tabId != null && modalState.modalProps.tabId != 0} icon={<CircleIcon sx={{ color: theme.custom.events.event }} fontSize="small" />} iconPosition="start" label="Event" {...a11yProps(0)} />
                                <Tab disabled={modalState.modalProps.tabId != null && modalState.modalProps.tabId != 1} icon={<CircleIcon sx={{ color: theme.custom.events.task }} fontSize="small" />} iconPosition="start" label="Task" {...a11yProps(1)} />
                                <Tab disabled={modalState.modalProps.tabId != null && modalState.modalProps.tabId != 2} icon={<CircleIcon sx={{ color: theme.custom.events.reminder }} fontSize="small" />} iconPosition="start" label="Reminder" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0} >
                            <NewEventForm time={time} day={day} calendars={calendarState.calendars} event={modalState.modalProps.event} />
                        </TabPanel>
                        <TabPanel value={value} index={1} >
                            <NewTaskForm time={time} day={day} calendars={calendarState.calendars} event={modalState.modalProps.event} />
                        </TabPanel>
                        <TabPanel value={value} index={2} >
                            <NewReminderForm time={time} day={day} calendars={calendarState.calendars} event={modalState.modalProps.event} />
                        </TabPanel>
                    </Box>
                </Box>
            </Modal>
        </div>
    )

}

export default NewEventModal;