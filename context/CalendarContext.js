import React, { createContext, useContext, useReducer } from "react";
import { calendarReducer } from "./Reducers";
import { startOfWeek, endOfWeek, eachDayOfInterval, addDays } from "date-fns";

const CalendarContext = createContext();

const getWeekDays = (date) => {
  const start = startOfWeek(date);
  const end = endOfWeek(date);
  return eachDayOfInterval({
    start: start,
    end: end,
  });
};

const getThreeDays = (date) => {
  const yesterday = addDays(date, -1);
  const tomorrow = addDays(date, 1);
  return [yesterday, date, tomorrow];
};

const initialState = {
  selectedDate: new Date(),
  weekDays: getWeekDays(new Date()),
  threeDays: getThreeDays(new Date()),
  events: [],
  calendars: [],
  todayEvents: [],
  notes: [],
  loading: true,
};

const Context = ({ children }) => {
  let savedCalendarState = false;
  if (typeof window !== "undefined") {
    savedCalendarState = localStorage.getItem("savedCalendarState");
  }
  if (savedCalendarState) savedCalendarState = JSON.parse(savedCalendarState);
  else savedCalendarState = initialState;

  const [state, dispatch] = useReducer(calendarReducer, {
    calendarState: savedCalendarState,
  });
  return (
    <CalendarContext.Provider value={{ state, dispatch }}>
      {children}
    </CalendarContext.Provider>
  );
};

export default Context;

export const CalendarState = () => {
  return useContext(CalendarContext);
};
