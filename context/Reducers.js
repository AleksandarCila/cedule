import { startOfWeek, endOfWeek, eachDayOfInterval, isSameISOWeek, isSameDay } from 'date-fns'

const getWeekDays = (date) => {
  const start = startOfWeek(date)
  const end = endOfWeek(date)
  return eachDayOfInterval({
    start: start,
    end: end
  });
}

const checkIfSameWeek = (newDate, oldDate) => {

}

export const calendarReducer = (state, action) => {
  switch (action.type) {
    case "SET_SELECTED_DATE":
      const oldSelectedDate = state.calendarState.selectedDate;
      const todayEvents = []
      state.calendarState.calendars.forEach((calendar) => {
        if (calendar.visible) {
          todayEvents.push({
            ...calendar, events: calendar.events.filter((event) => {
              return isSameDay(event.eventDate, action.payload.day)
            })
          });
        }
      })
      const newState = {
        ...state,
        calendarState: {
          ...state.calendarState,
          selectedDate: action.payload.day,
          weekDays: isSameISOWeek(action.payload.day, oldSelectedDate) ? state.calendarState.weekDays : getWeekDays(action.payload.day),
          todayEvents: todayEvents
        },

      };
      // console.log(todayEvents);
      // if (typeof window !== "undefined") {
      //   localStorage.setItem("cart", JSON.stringify(newState.cart));
      // }
      return newState;
    case "SET_CALENDAR_VISIBILITY":
      oldSelectedDate = state.calendarState.selectedDate;
      const newCalendars = []
      state.calendarState.calendars.forEach((calendar) => {
        if (calendar.id === action.payload.calendarId) {
          newCalendars.push({ ...calendar, visible: action.payload.visible })
        }
        else
          newCalendars.push(calendar);
      })
      todayEvents = []
      newCalendars.forEach((calendar) => {
        if (calendar.visible) {
          todayEvents.push({
            ...calendar, events: calendar.events.filter((event) => {
              return isSameDay(event.eventDate, action.payload.day)
            })
          });
        }
      })
      newState = {
        ...state,
        calendarState: {
          ...state.calendarState,
          todayEvents: todayEvents,
          calendars: newCalendars
        },

      };

      return newState;
    case "CHANGE_EVENT_DATE":
      // newCalendars = state.calendarState.calendars;
      // newCalendars.forEach((calendar) => {
      //   if (calendar.id === action.payload.calendarId) {

      //   }
      // })

      // return newState;
    default:
      return state;
  }
};
