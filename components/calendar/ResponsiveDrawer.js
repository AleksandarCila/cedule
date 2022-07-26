import { useState, useEffect } from "react";
import CalendarLayout from './CalendarLayout'
import { Box, Drawer } from '@mui/material'

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
    }, [props.mobileOpenCalendarList])

    return (<CalendarLayout>
        <Box
            component="nav"
            sx={{ width: { md: "100%" }, flexShrink: { md: 0 } }}
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
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: "80%" },
                }}
            >
                {children}
            </Drawer>
            <Drawer
                variant="permanent"
                anchor={anchor}
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box',border:0, maxWidth:240,width: "20%" },
                }}
                open
            >
                {children}
            </Drawer>
        </Box>
    </CalendarLayout>)
}

export default ResponsiveDrawer;