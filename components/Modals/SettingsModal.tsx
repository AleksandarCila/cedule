import { useState } from "react";
import { signOut } from "next-auth/react";

// Context States
import { ModalState } from "../../context/ModalContext";

// Componentes
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
// Utility

// Icons
import CloseIcon from "@mui/icons-material/Close";

const SettingsModal = () => {
  // States
  const {
    state: { modalState },
    dispatch: dispatchModal,
  } = ModalState();

  const openAddEventModal = modalState.modalType === "SETTINGS" ? true : false;

  // Hooks
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // Functions
  const closeModal = () => {
    dispatchModal({ type: "HIDE_MODAL" });
  };

  return (
    <>
      {openAddEventModal && (
        <Dialog open={openAddEventModal} onClose={closeModal} fullScreen={fullScreen}>
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
            <Typography variant="body1">
              Settings
            </Typography>
            <IconButton onClick={closeModal} disableRipple={true}>
              <CloseIcon
                sx={{ fontSize: 30, color: theme.palette.primary.contrastText }}
              />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{my:3, display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
            <DialogContentText>
              Do you want to log out?
            </DialogContentText>
            <Box sx={{ width: "100%", p: 2 }}>
              {/* <Divider sx={{ width: "100%", borderBottomWidth: 2, borderColor: event.color }} /> */}
            </Box>
            <Button
              variant="contained"
              color="primary"
              sx={{ my: 2 }}
              onClick={() => signOut()}
            >
              Log Out
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default SettingsModal;
