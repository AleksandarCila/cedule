import { useState } from "react";
import { Modal, Box, Typography, Tab, Tabs } from "@mui/material";

import { useTheme } from '@mui/material';
import { addAlphaToColor } from "../../../utility/addAlphaToColor";

import CircleIcon from '@mui/icons-material/Circle';
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
    const { openAddEventModal, handleOpenAddEventModal, time, day } = props;
    const theme = useTheme();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <Modal
                open={openAddEventModal}
                onClose={handleOpenAddEventModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',

                    width: { sx: "80vw", md: "50vw" },
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
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="event tabs">
                                <Tab icon={<CircleIcon color="primary" fontSize="small" />} iconPosition="start" label="Event" {...a11yProps(0)} />
                                <Tab icon={<CircleIcon sx={{ color: "#f00" }} fontSize="small" />} iconPosition="start" label="Task" {...a11yProps(1)} />
                                <Tab icon={<CircleIcon sx={{ color: "#0f0" }} fontSize="small" />} iconPosition="start" label="Reminder" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <NewEventForm time={time} day={day} />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <NewTaskForm time={time} day={day} />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <NewReminderForm time={time} day={day} />
                        </TabPanel>
                    </Box>
                </Box>
            </Modal>
        </div>
    )

}

export default NewEventModal;