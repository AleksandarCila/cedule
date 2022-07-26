export const calendarReducer = (state, action) => {
    switch (action.type) {
      case "SET_SELECTED_DATE":
        const newState = {
          ...state,
          calendarState: {selectedDate:action.payload.day},
          
        };
        // if (typeof window !== "undefined") {
        //   localStorage.setItem("cart", JSON.stringify(newState.cart));
        // }
        return newState;
      
      default:
        return state;
    }
  };
  