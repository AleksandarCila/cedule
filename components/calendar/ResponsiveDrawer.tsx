import { useState, useEffect } from "react";
import { ModalState } from "../../context/ModalContext";
// Components
import { Box, Drawer, Fab, Button } from "@mui/material";

// Icons
import CloseIcon from "@mui/icons-material/Close";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

// Types
interface IResponsiveDrawer {
  children: ReactJSXElement[] | ReactJSXElement;
  anchor: "top" | "left" | "right" | "bottom" | undefined;
  mobileOpenCalendarList: boolean;
  closeCalendarList(): void;
}
const ResponsiveDrawer = (props: IResponsiveDrawer) => {
  const {
    state: { modalState },
  } = ModalState();
  const { dispatch: dispatchModal } = ModalState();
  const { children, anchor } = props;
  // States
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  // const openModal = modalState.modalType === "EVENTS"
  // Hooks
  useEffect(() => {
    setMobileOpen(props.mobileOpenCalendarList);
  }, [props.mobileOpenCalendarList]);

  // Functions
  const handleDrawerToggle = () => {
    dispatchModal({
      type: "HIDE_MODAL",
    });
    if (mobileOpen) props.closeCalendarList();
    setMobileOpen((mobileOpen) => !mobileOpen);
  };

  return (
    <Box
      component="nav"
      sx={{ width: { lg: "100%" }, flexShrink: { lg: 0 } }}
      aria-label="Calendar Options"
    >
      <Drawer
        variant="temporary"
        anchor={anchor}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: "90%" },
          position:"relative"
        }}
      >
        <Box sx={{ position: "absolute", top: 10, right: 10 }}>
          <Fab
            variant="extended"
            color="primary"
            sx={{ width: 25, mx: 0.5 }}
            onClick={handleDrawerToggle}
          >
            <CloseIcon />
          </Fab>
        </Box>

        {children}
        <Button sx={{position:"absolute", bottom:0, right:0}}onClick={handleDrawerToggle}>Close</Button>
      </Drawer>
      <Drawer
        variant="permanent"
        anchor={anchor}
        sx={{
          display: { xs: "none", lg: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            boxShadow: 5,
            border: 0,
            maxWidth: 240,
            width: "20%",
          },
        }}
        open
      >
        {children}
      </Drawer>
    </Box>
  );
};

export default ResponsiveDrawer;
