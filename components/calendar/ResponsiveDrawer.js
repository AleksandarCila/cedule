import { useState, useEffect } from "react";

// Components
import { Box, Drawer, Fab } from '@mui/material'

// Icons
import CloseIcon from '@mui/icons-material/Close';

const ResponsiveDrawer = props => {
    const { children, anchor } = props;
    // States
    const [mobileOpen, setMobileOpen] = useState(false);

    // Hooks
    useEffect(() => {
        setMobileOpen(props.mobileOpenCalendarList)
    }, [props.mobileOpenCalendarList])

    // Functions
    const handleDrawerToggle = () => {
        if (mobileOpen)
            props.closeCalendarList();
        setMobileOpen(mobileOpen => !mobileOpen);

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
                    display: { xs: 'block', lg: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: "90%" },
                }}
            >
                <Box sx={{ position: "absolute", top: 10, right: 10 }}>
                    <Fab variant="extended" color="primary" size="small" sx={{ width: 25, mx: 0.5 }}
                        onClick={handleDrawerToggle}
                    ><CloseIcon /></Fab>

                </Box>

                {children}
            </Drawer>
            <Drawer
                variant="permanent"
                anchor={anchor}
                sx={{
                    display: { xs: 'none', lg: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', boxShadow: 5, border: 0, maxWidth: 240, width: "20%" },
                }}
                open
            >
                {children}
            </Drawer>
        </Box >)
}

export default ResponsiveDrawer;