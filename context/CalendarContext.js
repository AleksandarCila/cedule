import React, { createContext, useContext, useReducer } from "react";
import { calendarReducer } from "./Reducers";

const CalendarContext = createContext();

const initialState = {
  selectedDate:new Date()
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
