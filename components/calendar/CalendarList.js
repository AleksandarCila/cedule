import { CalendarState } from "../../context/CalendarContext";
import CalendarLayout from './CalendarLayout'


const CalendarList = props => {
    const {
        state: { calendarState },
        dispatch,
    } = CalendarState();

    return (<div>
        Options
    </div>)
}

export default CalendarList;