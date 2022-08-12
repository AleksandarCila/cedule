import { endOfWeek, getWeek, startOfWeek } from "date-fns"
import { months, daysLong } from "./constants";

export const getCalendarTabLabel = (date, tabValue) => {
    // const date = calendarState.selectedDate;

    let timeLabel = "";
    switch (tabValue) {
        case 0:
            timeLabel = months[date.getMonth()] + ", " + date.getFullYear();
            break;
        case 1:
            const startOfWeekDay = startOfWeek(date);
            const endOfWeekDay = endOfWeek(date);

            timeLabel = "Week " + getWeek(date, {
                weekStartsOn: 1,
                firstWeekContainsDate: 4
            }) + ", " + months[startOfWeekDay.getMonth()] + " " + startOfWeekDay.getDate() + " - " + months[endOfWeekDay.getMonth()] + " " + endOfWeekDay.getDate();
            break;
        case 2:
            timeLabel = months[date.getMonth()] + ", " + daysLong[date.getDay()] + " " + date.getDate();
            break;
        case 3:
            timeLabel = months[date.getMonth()] + ", " + date.getDate();
            break;
        default:
    }

    return timeLabel;
}