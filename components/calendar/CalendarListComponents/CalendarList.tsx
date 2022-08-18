// Context states
import { CalendarState } from "../../../context/CalendarContext";
import { ModalState } from "../../../context/ModalContext";

// Components
import Image from "next/image";
import {
  Divider,
  Typography,
  Button,
  useTheme,
  Skeleton,
  IconButton,
  Box,
} from "@mui/material";
import CalendarListItem from "./CalendarListItem";

// Utility
import { addAlphaToColor } from "../../../utility/addAlphaToColor";

// Icon
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
// Types
import Calendar from "../../../types/interfaces/Calendar";
interface ICalendarList {}

const CalendarList = () => {
  // States
  const {
    state: { calendarState },
  } = CalendarState();
  const { dispatch: dispatchModal } = ModalState();
  const stateLoading = calendarState.loading;

  // Hooks
  const theme = useTheme();

  // Functions
  const handleOpenModal = (type: string, props: object = {}) => {
    dispatchModal({
      type: "SHOW_MODAL",
      modalType: type,
      modalProps: props,
    });
  };
  return (
    <div>
      <Box sx={{ pl: 1, pt: 1 }}>
        <Image
          src="/assets/logo.png"
          alt="Cedule Logo"
          width={100}
          height={60}
          objectFit="contain"
        />
      </Box>
      <div
        style={{
          padding: 8,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        
        <Divider sx={{ width: "100%", mb: 1 }} />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ width: "100%" }}>
            Calendars
          </Typography>
          <IconButton
            disableRipple
            color="primary"
            sx={{ width: 25, mx: 1 }}
            onClick={() => {
              handleOpenModal("NEW_CALENDAR");
            }}
          >
            <AddIcon sx={{fontSize:35}}/>
          </IconButton>
          <IconButton
            disableRipple
            color="primary"
            sx={{ width: 25,mx:1 }}
            onClick={() => {
              handleOpenModal("SETTINGS");
            }}
          >
            <SettingsIcon sx={{fontSize:35}}/>
          </IconButton>
        </div>
        {/* <Divider sx={{ width: '100%', my: 1 }} /> */}
        <div style={{ width: "100%", padding: "0px 8px" }}>
          {stateLoading ? (
            <>
              <Skeleton variant="text" animation="wave" />
              <Skeleton variant="text" animation="wave" />
              <Skeleton variant="text" animation="wave" />
            </>
          ) : (
            calendarState.calendars.map((calendar: Calendar, id: number) => {
              return <CalendarListItem key={id} calendar={calendar} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarList;
