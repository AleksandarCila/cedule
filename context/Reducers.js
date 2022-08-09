import { startOfWeek, endOfWeek, eachDayOfInterval, isSameISOWeek, isSameDay, parseISO } from 'date-fns'

const getWeekDays = (date) => {
  const start = startOfWeek(date)
  const end = endOfWeek(date)
  return eachDayOfInterval({
    start: start,
    end: end
  });
}

const updateEventColors = (events, color) => {
  return events.map((event) => {
    return { ...event, color: color }
  })
}

const getTodayEvents = (calendars, selectedDate) => {
  const todayEvents = [
    {
      label: "Events",
      events: [],
    },
    {
      label: "Tasks",
      events: [],
    },
    {
      label: "Reminders",
      events: [],
    },
  ];
  calendars.forEach((calendar) => {
    if (calendar.visible) {
      calendar.events.forEach((event) => {

        switch (event.type) {
          case "event":
            if (isSameDay(event.eventDate, selectedDate))
              todayEvents[0].events.push(event);
            break;
          case "task":
            if (isSameDay(event.eventDate, selectedDate))
              todayEvents[1].events.push(event);
            break;
          case "reminder":
            if (isSameDay(event.eventDate, selectedDate))
              todayEvents[2].events.push(event);
            break;
        }
      })
    }
  })
  return todayEvents;
}

export const calendarReducer = (state, action) => {
  switch (action.type) {
    case "SET_SELECTED_DATE":
      const oldSelectedDate = state.calendarState.selectedDate;

      const newState = {
        ...state,
        calendarState: {
          ...state.calendarState,
          selectedDate: action.payload.day,
          weekDays: isSameISOWeek(action.payload.day, oldSelectedDate) ? state.calendarState.weekDays : getWeekDays(action.payload.day),
          todayEvents: getTodayEvents(state.calendarState.calendars, action.payload.day),
        },

      };
      return newState;
    case "SET_CALENDARS":
      oldSelectedDate = state.calendarState.selectedDate;
      const newCalendars = [];
      action.calendars.forEach((calendar) => {
        const events = calendar.events.map((event) => {
          return { ...event, eventDate: parseISO(event.eventDate) }
        });
        newCalendars.push({ ...calendar, events: events, visible: true })
      })
      newState = {
        ...state,
        calendarState: {
          ...state.calendarState,
          todayEvents: getTodayEvents(newCalendars, oldSelectedDate),
          calendars: newCalendars
        },
      }
      return newState;
    case "SET_CALENDAR_VISIBILITY":
      oldSelectedDate = state.calendarState.selectedDate;
      newCalendars = []
      state.calendarState.calendars.forEach((calendar) => {
        if (calendar.id === action.payload.calendarId) {
          newCalendars.push({ ...calendar, visible: action.payload.visible })
        }
        else
          newCalendars.push(calendar);
      })

      newState = {
        ...state,
        calendarState: {
          ...state.calendarState,
          todayEvents: getTodayEvents(newCalendars, oldSelectedDate),
          calendars: newCalendars
        },

      };

      return newState;

    case "ADD_NEW_CALENDAR":
      newCalendars = state.calendarState.calendars;
      newCalendars.push({ ...action.calendarData, visible: true, events: [] });

      newState = {
        ...state,
        calendarState: {
          ...state.calendarState,
          calendars: newCalendars
        },

      };
      return newState;
    case "DELETE_CALENDAR":
      oldSelectedDate = state.calendarState.selectedDate;

      newCalendars = state.calendarState.calendars.filter((calendar) => { if (calendar.id != action.id) return calendar });

      newState = {
        ...state,
        calendarState: {
          ...state.calendarState,
          todayEvents: getTodayEvents(newCalendars, oldSelectedDate),
          calendars: newCalendars
        },

      };
      return newState;
    case "EDIT_CALENDAR":
      oldSelectedDate = state.calendarState.selectedDate;

      newCalendars = state.calendarState.calendars.map((calendar) => {
        if (calendar.id != action.calendarData.id) return calendar;
        else {
          return { ...calendar, name: action.calendarData.name, color: action.calendarData.color, events: updateEventColors(calendar.events, action.calendarData.color) }
        }
      });
      newState = {
        ...state,
        calendarState: {
          ...state.calendarState,
          todayEvents: getTodayEvents(newCalendars, oldSelectedDate),
          calendars: newCalendars
        },

      };
      return newState;

    case "CHANGE_EVENT_DATE":
      oldSelectedDate = state.calendarState.selectedDate;

      newCalendars = state.calendarState.calendars;
      newCalendars.forEach((calendar) => {
        if (calendar.id === action.event.calendarId) {
          const newEvents = [];
          calendar.events.forEach((event) => {
            if (event.id === action.event.id) {
              const newEvent = event;
              newEvent.eventStartDate = action.newDate;
              newEvent.eventStartTime = action.startTime;
              newEvents.push(newEvent);
            }
            else
              newEvents.push(event);
          })
          calendar.events = newEvents;
        }
      })

      newCalendars = state.calendarState.calendars.map((calendar) => {
        if (calendar.id === action.event.calendar_id) {
          const newEvents = calendar.events.map((event) => {
            if (event.id === action.event.id) {
              const newEvent = event;
              newEvent.eventDate = action.newDate;
              newEvent.eventStartTime = action.startTime;
              return newEvent;
            }
            else
              return event;
          })
          return { ...calendar, events: newEvents }
        }
        else

          return calendar;
      })

      newState = {
        ...state,
        calendarState: {
          ...state.calendarState,
          todayEvents: getTodayEvents(newCalendars, oldSelectedDate),
          calendars: newCalendars
        },

      };
      return newState;
    case "ADD_NEW_EVENT":
      oldSelectedDate = state.calendarState.selectedDate;

      newCalendars = [];
      state.calendarState.calendars.forEach((calendar) => {
        if (calendar.id === action.eventData.calendar_id) {
          const newEvents = calendar.events;
          newEvents.push(action.eventData);
          newCalendars.push({ ...calendar, events: newEvents });
        }
        else
          newCalendars.push(calendar);
      })

      newState = {
        ...state,
        calendarState: {
          ...state.calendarState,
          todayEvents: getTodayEvents(newCalendars, oldSelectedDate),
          calendars: newCalendars
        },

      };
      return newState;
    case "UPDATE_EVENT":
      oldSelectedDate = state.calendarState.selectedDate;

      newCalendars = [];
      state.calendarState.calendars.forEach((calendar) => {
        if (calendar.id === action.eventData.calendar_id) {
          const newEvents = calendar.events.map((event) => {
            if (event.id === action.eventData.id) {
              return { ...action.eventData }
            }
            else return event;
          });
          newCalendars.push({ ...calendar, events: newEvents });
        }
        else
          newCalendars.push(calendar);
      })

      newState = {
        ...state,
        calendarState: {
          ...state.calendarState,
          todayEvents: getTodayEvents(newCalendars, oldSelectedDate),
          calendars: newCalendars
        },

      };
      return newState;
    case "DELETE_EVENT":
      oldSelectedDate = state.calendarState.selectedDate;

      newCalendars = state.calendarState.calendars.map((calendar) => {
        if (calendar.id === action.event.calendar_id) {
          return { ...calendar, events: calendar.events.filter((event) => { if (event.id != action.event.id) return event; }) }
        }
        else{
          return calendar;
        }
      });

      newState = {
        ...state,
        calendarState: {
          ...state.calendarState,
          todayEvents: getTodayEvents(newCalendars, oldSelectedDate),
          calendars: newCalendars
        },

      };
      return newState; F

    default:
      return state;
  }
};
