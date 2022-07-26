import { CalendarState } from "../../context/CalendarContext";
import CalendarLayout from './CalendarLayout'


const EventList = props => {
    const {
        state: { calendarState },
        dispatch,
    } = CalendarState();

    return (<div>
        {calendarState.selectedDate.getDate()}
    </div>)
}

export default EventList;