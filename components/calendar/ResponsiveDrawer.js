import { useState, useEffect } from "react";
import CalendarLayout from './CalendarLayout'
import { Box, Drawer, Fab } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

const ResponsiveDrawer = props => {
    const { children, anchor } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        if (mobileOpen)
            props.closeCalendarList();
        setMobileOpen(mobileOpen => !mobileOpen);

    };

    useEffect(() => {
        setMobileOpen(props.mobileOpenCalendarList)
        console.log(anchor);
    }, [props.mobileOpenCalendarList])

    return (<CalendarLayout>
        <Box
            component="nav"
            sx={{ width: { lg: "100%" }, flexShrink: { lg: 0 } }}
            aria-label="Calendar Options"

        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
                variant="temporary"
                anchor={anchor}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
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
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', border: 0, maxWidth: 240, width: "20%" },
                }}
                open
            >
                {children}
            </Drawer>
        </Box >
    </CalendarLayout >)
}

export default ResponsiveDrawer;