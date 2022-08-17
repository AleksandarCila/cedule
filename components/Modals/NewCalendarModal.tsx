import { useState, useEffect } from "react";

// Context States
import { ModalState } from "../../context/ModalContext";
import { CalendarState } from "../../context/CalendarContext";

// Components
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  useMediaQuery,
  TextField,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  useTheme,
  IconButton,
} from "@mui/material";

// Utility
import { calendarColors } from "../../utility/constants";

// Icons
import CloseIcon from "@mui/icons-material/Close";

// Types
interface IColorRadioButton {
  value: number;
  ind: number;
  color: string;
  onClick(e: any): void;
}
const ColorRadioButton = (props: IColorRadioButton) => {
  const { value, ind, color, onClick } = props;
  const selected = value === ind;

  return (
    <Box
      sx={{
        m: 0.2,
        p: 0.2,
        border: selected ? `1px solid ${color}` : "1px solid transparent",
        "&:hover": { cursor: "pointer" },
      }}
      onClick={onClick}
    >
      <Box sx={{ width: 20, height: 20, bgcolor: color }}></Box>
    </Box>
  );
};

const NewCalendarModal = () => {
  // States
  const {
    state: { modalState },
    dispatch: dispatchModal,
  } = ModalState();
  const { dispatch } = CalendarState();
  const [value, setValue] = useState(0);
  const [formState, setFormState] = useState({
    name: modalState.modalProps.name ? modalState.modalProps.name : "",
    color: calendarColors[0],
    formErrors: { name: "" },
    nameValid: modalState.modalProps.name ? true : false,
  });
  const [formValid, setFormValid] = useState(false);
  const open = modalState.modalType === "NEW_CALENDAR" ? true : false;

  // Hooks
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setFormState({
      ...formState,
      name: modalState.modalProps.name ? modalState.modalProps.name : "",
      nameValid: modalState.modalProps.name ? true : false,
    });
  }, [modalState.modalProps]);

  useEffect(() => {
    setFormValid(formState.nameValid);
  }, [formState.nameValid]);

  // Functions
  const handleChange = (e: any, newValue: any) => {
    setFormState({
      ...formState,
      color: calendarColors[newValue],
    });
    setValue(newValue);
  };

  const handleUserInput = (e: any, inputName = "", inputValue = "") => {
    const name = e ? e.target.name : inputName;
    const value = e ? e.target.value : inputValue;
    validateField(name, value);
  };

  const validateField = (fieldName: string, value: any) => {
    let fieldValidationErrors = formState.formErrors;
    let nameValid = formState.nameValid;

    switch (fieldName) {
      case "name":
        nameValid = value.length > 0 ? true : false;
        fieldValidationErrors.name = nameValid ? "" : " is empty";
        break;
      default:
        break;
    }
    setFormState({
      ...formState,
      [fieldName]: value,
      formErrors: fieldValidationErrors,
      nameValid: nameValid,
    });
  };

  const handleAddCalendar = async () => {
    const calendarData = {
      // user_id: calendars[formState.calendar].id,
      name: formState.name,
      color: formState.color,
    };
    if (modalState.modalProps.edit) {
      dispatch({
        type: "EDIT_CALENDAR",
        calendarData: { ...calendarData, id: modalState.modalProps.id },
      });
      await fetch("/api/calendar/editCalendar", {
        method: "POST",
        body: JSON.stringify({ ...calendarData, id: modalState.modalProps.id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      dispatch({
        type: "ADD_NEW_CALENDAR",
        calendarData: calendarData,
      });
      await fetch("/api/calendar/addNewCalendar", {
        method: "POST",
        body: JSON.stringify(calendarData),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    hideModal();
  };

  const hideModal = () => {
    dispatchModal({ type: "HIDE_MODAL" });
  };
  return (
    <>
      {open && (
        <Dialog open={open} onClose={hideModal} fullScreen={fullScreen}>
          <DialogTitle
            sx={{
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 1,
              pl: 3,
              pr: 1,
            }}
          >
            <Typography variant="h6">
              {modalState.modalProps.edit
                ? "Edit Calendar"
                : "Add a new Calendar"}
            </Typography>
            <IconButton onClick={hideModal} disableRipple={true}>
              <CloseIcon
                sx={{ fontSize: 30, color: theme.palette.primary.contrastText }}
              />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{p:0.5}}>
            <Box sx={{ width: "100%", p: 2 }}>
              <TextField
                required
                onChange={(e) => handleUserInput(e)}
                id="name"
                name="name"
                label="Calendar Name"
                value={formState.name}
                placeholder="Add a Calendar name"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mb: 0 }}
                helperText={
                  formState.nameValid ? "" : "Calendar must have a name"
                }
                error={!formState.nameValid}
                inputProps={{ maxLength: 60 }}
              />
            </Box>
            <Typography variant="body1" sx={{ px: 2 }}>
              Pick a Calendar color
            </Typography>
            <FormControl sx={{ px: 2 }}>
              <RadioGroup
                row
                aria-labelledby="colors-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                {calendarColors.map((color, ind) => {
                  return (
                    <ColorRadioButton
                      key={ind}
                      ind={ind}
                      value={value}
                      color={color}
                      onClick={(e: any) => {
                        handleChange(e, ind);
                      }}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleAddCalendar}
              size="large"
              variant="contained"
              disabled={!formValid}
              sx={{ my: 2 }}
            >
              {modalState.modalProps.edit ? "Save Calendar" : "Add Calendar"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default NewCalendarModal;
