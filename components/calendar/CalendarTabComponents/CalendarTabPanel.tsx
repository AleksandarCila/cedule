import { useState } from "react"

// Context States
import { CalendarState } from "../../../context/CalendarContext";
import { ModalState } from '../../../context/ModalContext'

// Components
import { Box, Typography,Fab, useTheme } from "@mui/material"
import MonthView from '../MonthViewComponents/MonthView'
import WeekView from "../WeekViewComponents/WeekView"
import DayView from '../DayViewElements/DayView'
import NoteView from '../NotesComponents/NoteView'
import CalendarNavigationPane from './CalendarNavigationPane'
import CalendarViewMenu from './CalendarViewMenu'

// Utility
import { getCalendarTabLabel } from "../../../utility/getCalendarTabLabel";

// Icons
import AddIcon from '@mui/icons-material/Add';

const tabNames = [{
    title: 'Month',
    content: <MonthView />
}, {
    title: 'Week',
    content: <WeekView />
}, {
    title: 'Day',
    content: <DayView />
}, {
    title: 'Notes',
    content: <NoteView />
}]

const CalendarTabPanel = () => {

    // States
    const {
        state: { calendarState },
    } = CalendarState();
    const {
        dispatch: dispatchModal
    } = ModalState();
    const [tabValue, setTabValue] = useState<number>(0);

    // Hooks
    const theme = useTheme();

    // Functions
    const handleTabChange = (e:React.MouseEvent<HTMLElement>, newValue:number) => {
        if (newValue !== null) setTabValue(newValue);
    }
    const handleOpenModal = (type:string, props:object = {}) => {
        dispatchModal({
            type: "SHOW_MODAL",
            modalType: type,
            modalProps: props,
        });
    }
    return (
        <Box sx={{ height: "100%", display: 'flex', justifyContent: 'space-between', flexDirection: 'column', overflowY: "auto"}}>
            <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
                <CalendarNavigationPane tabValue={tabValue} />
                <Box sx={{ flex: 1, display: { xs: "flex", sm: "flex" }, justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h6" fontSize="small">{getCalendarTabLabel(calendarState.selectedDate, tabValue)}</Typography>
                </Box>
                <CalendarViewMenu tabValue={tabValue} handleTabChange={handleTabChange} tabNames={tabNames} />
            </Box>
            <Fab
                color="primary"
                onClick={() => {
                    if (tabValue == 3) { handleOpenModal("NEW_NOTE"); }
                    else { handleOpenModal("NEW_EVENT") }
                }}
                sx={{
                    display: { xs: "flex", lg: "none" }, position: 'absolute', bottom: 25, right: 25,
                     justifyContent: 'center', alignItems: "center"
                }}>
                <AddIcon />
            </Fab>
            <Box sx={{ flex: 1, maxHeight: "100%", overflowY: "auto", position: 'relative', maxWidth:"99.5vw", overflowX:"auto" }}>


                {tabNames.map((tab, ind) => {
                    return (
                        <Typography component="div"
                            role="tabpanel"
                            hidden={tabValue !== ind}
                            key={ind}
                            sx={{
                                display: tabValue !== ind ? "none" : "flex", justifyContent: 'space-between', flexDirection: 'column'
                                , width: "100%", height: "100%", bgcolor: theme.palette.background.default,
                            }}
                        >
                            {tab.content}
                        </Typography>
                    )
                })}
            </Box>
        </Box >
    )
}

export default CalendarTabPanel;