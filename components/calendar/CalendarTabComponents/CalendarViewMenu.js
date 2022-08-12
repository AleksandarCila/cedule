import { useState } from 'react';
// Context States

// Components
import { Box, ToggleButtonGroup, ToggleButton, Button, Menu } from '@mui/material'

// Icons
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const TabButton = props => {
    const { selectedTabIndex, tabIndex, title } = props;
    return (
        <Box>
            <Button size="small" onClick={(e) => {
                props.handleTabChange(e, tabIndex);
                props.onClick();
            }} sx={{ p: 1, border: selectedTabIndex == tabIndex ? 1 : 0, cursor: 'pointer' }}>
                {title}
            </Button>
        </Box>
    )
}

const CalendarViewMenu = props => {
    const { tabValue, handleTabChange, tabNames } = props;

    // States
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // Functions
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Box sx={{ display: { xs: 'none', lg: "flex" }, justifyContent: 'flex-end', alignItems: 'center', p: 1 }}>
                <ToggleButtonGroup color="primary" size="small" value={tabValue} onChange={handleTabChange} exclusive={true} sx={{".MuiToggleButton-root":{
                            borderRadius:0,
                        }}}>
                    {tabNames.map((tab, ind) => (
                        <ToggleButton disableRipple value={ind} key={ind} >
                            {tab.title}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </Box>
            <Box sx={{ display: { xs: "block", lg: "none" } }}>
                <Button
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                    size="small"
                    variant="contained"
                >
                    {tabNames[tabValue] && tabNames[tabValue].title}
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    {tabNames.map((tab, ind) => (
                        <TabButton key={"tabMenuButton" + ind} onClick={handleClose} handleTabChange={handleTabChange} selectedTabIndex={tabValue} tabIndex={ind} title={tab.title} />
                    ))}
                </Menu>
            </Box>
        </>
    )
}

export default CalendarViewMenu;