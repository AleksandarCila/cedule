import { startOfWeek, endOfWeek, eachDayOfInterval, isSameISOWeek } from 'date-fns'

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
      const newState = {
        ...state,
        calendarState: {
          ...state.calendarState,
          selectedDate: action.payload.day,
          weekDays: isSameISOWeek(action.payload.day, oldSelectedDate) ? state.calendarState.weekDays : getWeekDays(action.payload.day)
        },

      };
      console.log(state);
      // if (typeof window !== "undefined") {
      //   localStorage.setItem("cart", JSON.stringify(newState.cart));
      // }
      return newState;

    default:
      return state;
  }
};
