import { CalendarState } from "../../context/CalendarContext";
import Image from 'next/image'
import { useTheme } from '@mui/material';
import { addAlphaToColor } from "../../utility/addAlphaToColor";
import { isSameDay } from "date-fns";


const EventList = props => {
    const {
        state: { calendarState },
        dispatch,
    } = CalendarState();
    const theme = useTheme();
    return (<div>
        <div style={{ width: "100%", height: 113, position: 'relative' }}>
            <Image
                src="/assets/tasks_header_image.jpg"
                alt="To Do list on the computer cartoon"
                layout='fill'
                // width={300}
                // height="100"

                objectFit="cover"
            // height={300}
            />
            <div
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: addAlphaToColor(theme.palette.primary.main, 0.4) }}
            >

            </div>

        </div>
        {calendarState.selectedDate.getDate()}
        {calendarState.events.map((event) => {
            const isThisDay = isSameDay(event.eventDate, calendarState.selectedDate);
            if (isThisDay) return <div>{event.username}</div>
            else return;
        })}
    </div>)
}

export default EventList;