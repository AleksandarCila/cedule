// Context States
import { CalendarState } from "../../../context/CalendarContext";
import { ModalState } from '../../../context/ModalContext'

// Components
import { Typography, Box } from "@mui/material";

// Utility
import { isSameDay } from "date-fns";
import { timeStamps } from "../../../utility/constants"
import { addAlphaToColor } from "../../../utility/addAlphaToColor";

const WeekViewDayEvents = (props) => {
    const { weekDayIndex } = props;

    // States
    const {
        state: { calendarState },
    } = CalendarState();
    const {
        dispatch: dispatchModal
    } = ModalState();
    const day = calendarState.weekDays[weekDayIndex];

    // For each visible calendar, get events that are on the same day 
    let events = [];
    calendarState.calendars.forEach((calendar) => {
        if (calendar.visible)
            events = events.concat(calendar.events)
    })
    events = events.filter((event) => {
        if (isSameDay(day, event.eventDate)) return event;

    });
    events = events.sort((a, b) => { return a.eventStartTime - b.eventStartTime })


    // Drag Functions
    const dragStart = (e, event) => {
        e.dataTransfer.setData('data', JSON.stringify(event));
    };

    const onDragOver = (event) => {
        event.stopPropagation();
        event.preventDefault();
    }

    // Functions
    const handleOpenModal = (type, props = {}) => {
        dispatchModal({
            type: "SHOW_MODAL",
            modalType: type,
            modalProps: props,
        })
    }
    return (
        <>
            {!calendarState.loading && events.map((event, ind) => {
                return (
                    <Box
                        key={ind}
                        sx={{
                            position: 'absolute',
                            top: `${event.eventStartTime / timeStamps.length * 100}%`,
                            left: `${ind * 2}%`,
                            width: `${100 - 2 * ind}%`,
                            height: `${event.eventLength * (1 / timeStamps.length * 100)}%`,
                            backgroundColor: event.color,
                            borderRadius: 2,
                            zIndex: 999 + ind,
                            boxShadow: 3,
                            py: 0.1,
                            px: 0.5,
                            "&:hover": {
                                cursor: "pointer",
                                backgroundColor: addAlphaToColor(event.color, 0.9)
                            }
                        }}
                        draggable
                        onDragStart={(e) => dragStart(e, event)}
                        onDragOver={onDragOver}
                        onClick={() => { handleOpenModal("EVENT_INFO", { event: event }) }}
                    >
                        <Typography fontSize="small" noWrap={true}>{timeStamps[event.eventStartTime].label}-{timeStamps[event.eventStartTime + event.eventLength].label}</Typography>
                    </Box>)
            })}
        </>
    )
}

export default WeekViewDayEvents