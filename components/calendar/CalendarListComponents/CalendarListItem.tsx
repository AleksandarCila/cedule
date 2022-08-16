// Context states
import { CalendarState } from "../../../context/CalendarContext";
import { ModalState } from "../../../context/ModalContext";

// Components
import EditDeleteMenuButton from './EditDeleteMenuButton'
import CalendarCheckButton from './CalendarCheckButton'

// Types
import Calendar from "../../../types/interfaces/Calendar";
interface ICalendarListItem{
    calendar: Calendar
}

const CalendarListItem = (props: ICalendarListItem) => {
    const { calendar } = props;

    // States
    const {
        dispatch,
    } = CalendarState();
    const {
        dispatch: dispatchModal
    } = ModalState();
    // Functions
    const handleCheckButton = () => {
        dispatch({
            type: "SET_CALENDAR_VISIBILITY",
            payload: {
                calendarId: calendar.id,
                visible: !calendar.visible
            },
        });
    }

    const handleDeleteCalendar = async () => {
        dispatch({
            type: "DELETE_CALENDAR",
            id: calendar.id
        })
        await fetch("/api/calendar/deleteCalendar", {
            method: "POST",
            body: JSON.stringify(calendar.id),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    const handleOpenEditCalendar = () => {
        dispatchModal({
            type: "SHOW_MODAL",
            modalType: "NEW_CALENDAR",
            modalProps: {
                name: calendar.name,
                edit: true,
                id: calendar.id
            },

        })
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <CalendarCheckButton color={calendar.color} label={calendar.name} checked={calendar.visible}
                onClick={handleCheckButton}
            />

            <EditDeleteMenuButton onEditClick={handleOpenEditCalendar} onDeleteClick={handleDeleteCalendar} />
        </div>
    )
}

export default CalendarListItem;