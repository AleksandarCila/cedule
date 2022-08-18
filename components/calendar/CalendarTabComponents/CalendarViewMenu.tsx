import { useState } from 'react';
// Context States

// Components
import { Box, ToggleButtonGroup, ToggleButton, Button, Menu, IconButton, Typography, useTheme } from '@mui/material'

// Icons
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


// Types
interface ITabButton {
    selectedTabIndex: number;
    tabIndex: number;
    title: string;
    handleTabChange(e: React.MouseEvent<HTMLElement>, tabIndex: number): void;
    onClick(e?: React.MouseEvent<HTMLButtonElement>): void;
    icon?: React.ReactNode
}
interface ICalendarViewMenu {
    tabValue: number;
    handleTabChange(e: React.MouseEvent<HTMLElement>, tabIndex: number): void;
    tabNames: {
        title: string;
        mobileTitle: string;
        content: React.ReactNode;
        icon: React.ReactNode
    }[];
}
const TabButton = (props: ITabButton) => {
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

const TabMenuButton = (props: ITabButton) => {
    const theme = useTheme();
    const { selectedTabIndex, tabIndex, title, icon } = props;
    return (
        <Button variant="outlined" startIcon={icon} onClick={(e) => {
            props.handleTabChange(e, tabIndex);
            props.onClick();
        }} sx={{
            width: "100%",
            p: 1, bgcolor: selectedTabIndex == tabIndex ? theme.palette.primary.main : theme.palette.background.default, cursor: 'pointer',
            color: selectedTabIndex == tabIndex ? theme.palette.primary.contrastText : ""
        }}>
            {title}
        </Button>
    )
}


const CalendarViewMenu = (props: ICalendarViewMenu) => {
    const { tabValue, handleTabChange, tabNames } = props;

    // States
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const open = Boolean(anchorEl);

    // Hooks
    const theme = useTheme();
    // Functions
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (tabValue === 3)
            handleTabChange(event, 0);
        else
            setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Box sx={{ display: { xs: 'none', lg: "flex" }, justifyContent: 'flex-end', alignItems: 'center', p: 1 }}>
                <ToggleButtonGroup color="primary" size="small" value={tabValue} onChange={handleTabChange} exclusive={true} sx={{
                    ".MuiToggleButton-root": {
                        borderRadius: 0,
                    }
                }}>
                    {tabNames.map((tab, ind) => (
                        <ToggleButton disableRipple value={ind} key={ind} >
                            {tab.title}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </Box>
            <Box sx={{ display: { xs: "flex", lg: "none" } }}>

                <IconButton
                    onClick={handleClick}
                    sx={{
                        borderRadius: 0, py: 0.4, px: 1, mx: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        "&:hover": {
                            bgcolor: theme.palette.primary.dark
                        }

                    }}>
                    {tabValue === 3 ? tabNames[0].icon : tabNames[tabValue].icon}
                    <Typography sx={{ display: { xs: "none", sm: "block" } ,mx:1}}>{tabValue === 3 ? tabNames[0].title : tabNames[tabValue].title}</Typography>
                    <KeyboardArrowDownIcon />
                </IconButton>
                <Menu
                    sx={{ p:0,m:0,".MuiList-root":{p:0,pt:0.5} }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    {tabNames.map((tab, ind) => {
                        if (ind !== 1 && ind !== 3)
                            return <TabMenuButton key={ind} icon={tab.icon} onClick={handleClose} handleTabChange={handleTabChange} selectedTabIndex={tabValue} tabIndex={ind} title={tab.mobileTitle} />
                    })}
                </Menu>
                <IconButton
                    onClick={(e) => handleTabChange(e, 3)}
                    sx={{
                        borderRadius: 0, py: 0.4, px: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        "&:hover": {
                            bgcolor: theme.palette.primary.dark
                        }
                    }}>
                    {tabNames[3].icon}
                    <Typography sx={{ display: { xs: "none", sm: "block" },ml:1 }}>{tabNames[3].title}</Typography>
                </IconButton>
            </Box>
        </>
    )
}

export default CalendarViewMenu;