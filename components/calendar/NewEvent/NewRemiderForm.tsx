import { useEffect, useState } from "react";

// Context States
import { CalendarState } from "../../../context/CalendarContext";
import { ModalState } from "../../../context/ModalContext";

// Components
import {
  Box,
  TextField,
  Switch,
  FormControlLabel,
  Grid,
  Select,
  DialogActions,
  MenuItem,
  FormControl,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import TimePickerComboBox from "./TimePickerComboBox";

// Utility
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { timeStamps } from "../../../utility/constants";
import { addHours } from "date-fns";

// Icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ListAltIcon from "@mui/icons-material/ListAlt";
import BorderColorIcon from "@mui/icons-material/BorderColor";

// Types
import Calendar from "../../../types/interfaces/Calendar";
import Event from "../../../types/interfaces/Event";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
interface ISectionDivider {
  children: ReactJSXElement | ReactJSXElement[];
  title: string;
}
interface INewReminderForm {
  day?: Date;
  time?: number;
  calendars: Calendar[];
  event?: Event;
}
const SectionDivider = (props: ISectionDivider) => {
  const { children, title } = props;
  return (
    <Box
      sx={{
        mb: 2,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          pr: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
        <Typography sx={{ px: 2 }} variant="body1">
          {title}
        </Typography>
      </Box>
      <Divider sx={{ width: "100%", flex: 1 }} />
    </Box>
  );
};

const NewReminderForm = (props: INewReminderForm) => {
  const { day, time, calendars, event } = props;

  // States
  const [serverError, setServerError] = useState(false);
  const { dispatch } = CalendarState();
  const { dispatch: dispatchModal } = ModalState();
  const [formState, setFormState] = useState({
    name: event ? event.name : "",
    dateValue: event ? event.eventDate : day ? day : new Date(),
    timeValue: event
      ? event.eventStartTime
      : time
      ? new Date().setTime(time)
      : 0,
    allDay: event ? event.allDay : false,
    calendar: event ? 0 : 0,
    formErrors: { name: "", dateValue: "", timeValue: "" },
    nameValid: event ? true : false,
    dateValid: true,
    timeValid: true,
  });
  const [formValid, setFormValid] = useState(event ? true : false);

  // Hooks
  useEffect(() => {
    setFormValid(
      formState.nameValid && formState.dateValid && formState.timeValid
    );
  }, [formState.nameValid, formState.dateValid, formState.timeValid]);

  // Functions
  const handleUserInput = (e: any, inputName = "", inpuValue = "") => {
    const name = e ? e.target.name : inputName;
    const value = e ? e.target.value : inpuValue;
    validateField(name, value);
  };

  const validateField = (fieldName: string, value: any) => {
    let fieldValidationErrors = formState.formErrors;
    let nameValid = formState.nameValid;
    let dateValid = formState.dateValid;
    let timeValid = formState.timeValid;

    switch (fieldName) {
      case "name":
        nameValid = value.length > 0 ? true : false;
        fieldValidationErrors.name = nameValid ? "" : " is empty";
        break;
      case "allDay":
        if (!formState.allDay) {
          timeValid = true;
        } else {
          if (formState.timeValue < 0) {
            timeValid = false;
          } else {
            timeValid = true;
          }
        }
        break;
      case "dateValue":
        fieldValidationErrors.dateValue = dateValid ? "" : " is invalid";
        break;
      case "timeValue":
        if (value == "") timeValid = false;
        else timeValid = true;
        fieldValidationErrors.timeValue = timeValid ? "" : " is invalid";
        break;
      default:
        break;
    }
    setFormState({
      ...formState,
      [fieldName]: value,
      formErrors: fieldValidationErrors,
      nameValid: nameValid,
      dateValid: dateValid,
      timeValid: timeValid,
    });
  };

  const handleAddReminder = async () => {
    const eventData = {
      calendar_id: calendars[formState.calendar].id,
      name: formState.name,
      description: "",
      type: "reminder",
      eventDate: addHours(formState.dateValue, 0),
      eventStartTime: formState.timeValue,
      eventLength: 1,
      color: calendars[formState.calendar].color,
      allDay: formState.allDay,
    };
    setServerError(false);

    if (event) {
      await fetch("/api/events/updateEvent", {
        method: "POST",
        body: JSON.stringify({ ...eventData, id: event.id }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status === 201) {
          dispatch({
            type: "UPDATE_EVENT",
            eventData: { ...eventData, id: event.id },
          });
        } else {
          setServerError(true);
          return;
        }
      });
    } else {
      await fetch("/api/events/addNewEvent", {
        method: "POST",
        body: JSON.stringify(eventData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (response) => {
        if (response.status === 201) {
          const newEvent = await response.json();

          dispatch({
            type: "ADD_NEW_EVENT",
            eventData: { ...eventData, id: newEvent.result.insertId },
          });
        } else {
          setServerError(true);
          return;
        }
      });
    }
    dispatchModal({ type: "HIDE_MODAL" });
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {serverError && (
        <Typography
          color="error"
          variant="body1"
          textAlign="center"
          sx={{ my: 2 }}
          fontSize="large"
        >
          An error occured. Try again!
        </Typography>
      )}
      <Box
        component="form"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box sx={{ width: "100%", mb: 2 }}>
          <SectionDivider title="Reminder Name">
            <BorderColorIcon color="primary" />
          </SectionDivider>

          <TextField
            required
            onChange={(e) => handleUserInput(e)}
            id="name"
            name="name"
            label=""
            value={formState.name}
            placeholder="Add a Reminder name"
            variant="outlined"
            size="small"
            fullWidth
            helperText={formState.nameValid ? "" : "Reminder must have a name"}
            error={!formState.nameValid}
            inputProps={{ maxLength: 60 }}
          />
        </Box>
        <SectionDivider title="Reminder Time & Date">
          <AccessTimeIcon color="primary" />
        </SectionDivider>

        <Grid container sx={{ width: "100%", mb: 2 }} spacing={2}>
          <Grid item xs={8}>
            <MobileDatePicker
              inputFormat="MM/dd/yyyy"
              value={formState.dateValue}
              onChange={(newValue: any) => {
                handleUserInput(null, "dateValue", newValue);
              }}
              onError={() => {
                setFormState({ ...formState, dateValid: false });
              }}
              onAccept={(newValue) => {
                setFormState({ ...formState, dateValid: true });
              }}
              renderInput={(params) => (
                <TextField size="small" sx={{ my: 0 }} fullWidth {...params} />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                sx={{}}
                control={
                  <Switch
                    size="small"
                    checked={formState.allDay}
                    onChange={(event: any) => {
                      handleUserInput(null, "allDay", event.target.checked);
                    }}
                  />
                }
                label={
                  <Typography fontSize="small" variant="body1">
                    All Day
                  </Typography>
                }
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TimePickerComboBox
              onChange={(newValue: any) => {
                handleUserInput(null, "timeValue", newValue);
              }}
              value={timeStamps[formState.timeValue]}
              error={formState.timeValid}
              disabled={formState.allDay}
            />
          </Grid>
        </Grid>
        <Box sx={{ width: "100%", mb: 2 }}>
          <SectionDivider title="My Calendars">
            <ListAltIcon color="primary" />
          </SectionDivider>

          <FormControl fullWidth>
            <Select
              labelId="calendar-select-label"
              id="calendar-select"
              value={formState.calendar}
              label=""
              name="calendar"
              onChange={(event) => {
                handleUserInput(event);
              }}
              size="small"
            >
              {calendars.map((calendar, ind) => {
                return (
                  <MenuItem key={ind} value={ind}>
                    {calendar.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>

        <DialogActions>
          <Button
            onClick={handleAddReminder}
            size="large"
            variant="contained"
            disabled={!formValid}
          >
            {event ? "Save Reminder" : "Add Reminder"}
          </Button>
        </DialogActions>
      </Box>
    </LocalizationProvider>
  );
};

export default NewReminderForm;
