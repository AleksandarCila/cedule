import { useState } from "react";
// Context states
import { CalendarState } from "../../../context/CalendarContext";
import { ModalState } from "../../../context/ModalContext";

// Components
import EditDeleteMenuButton from "./EditDeleteMenuButton";
import CalendarCheckButton from "./CalendarCheckButton";
import ErrorDialog from "../../Modals/ErrorDialog";
// Types
import Calendar from "../../../types/interfaces/Calendar";
interface ICalendarListItem {
  calendar: Calendar;
}

const CalendarListItem = (props: ICalendarListItem) => {
  const { calendar } = props;

  // States
  const [serverError, setServerError] = useState(false);

  const { dispatch } = CalendarState();
  const { dispatch: dispatchModal } = ModalState();
  // Functions
  const handleCheckButton = () => {
    dispatch({
      type: "SET_CALENDAR_VISIBILITY",
      payload: {
        calendarId: calendar.id,
        visible: !calendar.visible,
      },
    });
  };

  const handleDeleteCalendar = async () => {
    setServerError(false);
    await fetch("/api/calendar/deleteCalendar", {
      method: "POST",
      body: JSON.stringify(calendar.id),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 201) {
        dispatch({
          type: "DELETE_CALENDAR",
          id: calendar.id,
        });
      } else {
        setServerError(true);
        return;
      }
    });
  };
  const handleOpenEditCalendar = () => {
    dispatchModal({
      type: "SHOW_MODAL",
      modalType: "NEW_CALENDAR",
      modalProps: {
        name: calendar.name,
        edit: true,
        id: calendar.id,
      },
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {serverError && (
        <ErrorDialog open={serverError} handleClick={handleDeleteCalendar} />
      )}
      <CalendarCheckButton
        color={calendar.color}
        label={calendar.name}
        checked={calendar.visible}
        onClick={handleCheckButton}
      />

      <EditDeleteMenuButton
        onEditClick={handleOpenEditCalendar}
        onDeleteClick={handleDeleteCalendar}
      />
    </div>
  );
};

export default CalendarListItem;
