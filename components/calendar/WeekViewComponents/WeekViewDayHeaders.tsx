// Context States
import { CalendarState } from "../../../context/CalendarContext";

// Components
import { Typography, useTheme, useMediaQuery, Box } from "@mui/material";

// Utility
import { isSameDay, isToday } from "date-fns";
import { days } from "../../../utility/constants";

// Types
interface IWeekDayHeaderElement {
  ind: number;
  day: Date;
  isMobile: boolean;
}
const WeekDayHeaderElement = (props: IWeekDayHeaderElement) => {
  const { ind, day, isMobile } = props;
  // States
  const {
    state: { calendarState },
    dispatch,
  } = CalendarState();
  const selected = isSameDay(day, calendarState.selectedDate);

  // Hooks
  const theme = useTheme();

  // Functions
  const handleSelectDate = (day: Date) => {
    dispatch({
      type: "SET_SELECTED_DATE",
      payload: {
        day,
      },
    });
  };

  return (
    <div
      style={{
        cursor: "pointer",
        width: `${80 / (isMobile ? 3 : 7)}%`,
        height: "100%",
        padding: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: selected ? theme.palette.primary.light : "",
        borderBottom: isToday(day)
          ? `5px solid ${theme.palette.primary.light}`
          : selected
          ? theme.palette.primary.main
          : `5px solid ${theme.palette.backgroundLight}`,
        borderRight:
          (ind + 1) % 7 != 0
            ? `1px solid ${theme.palette.backgroundLight}`
            : "",
        color: selected ? theme.palette.primary.contrastText : "",
      }}
      onClick={(e) => handleSelectDate(day)}
    >
      <Typography fontSize="small" variant="body1">
        {day.getDate()} {days[day.getDay()]}
      </Typography>
    </div>
  );
};

const WeekViewDayHeaders = () => {
  // States
  const {
    state: { calendarState },
    dispatch,
  } = CalendarState();
  const weekDays = calendarState.weekDays;

  // Hooks
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const days = isMobile ? calendarState.threeDays : calendarState.weekDays;

  return (
    <div
      style={{
        width: "100%",
        height: 40,
        minHeight: 40,
        paddingRight: isMobile ? 0 : 16,
      }}
    >
      <Box
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            borderRight: `1px solid ${theme.palette.backgroundLight}`,
            height: "100%",
            width: "20%",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        ></div>
        {days.map((day: Date, ind: number) => {
          return (
            <WeekDayHeaderElement
              key={ind}
              ind={ind}
              day={day}
              isMobile={isMobile}
            />
          );
        })}
      </Box>
    </div>
  );
};

export default WeekViewDayHeaders;
