import { useEffect, useState } from "react"
import { withRouter } from "next/router"
import { Box, Button, Menu, IconButton, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { addDays, addMonths, addWeeks, endOfWeek, getWeek, setDate, startOfWeek } from "date-fns"

import { CalendarState } from "../../context/CalendarContext";

import MonthView from './MonthView'
import WeekView from "./WeekView"
import DayView from './DayView'

import { daysLong,months } from "../../utility/constants"
import CalendarLayout from "./CalendarLayout"

const tabNames = [{
    href: 'month',
    title: 'Month',
    content: <MonthView />
}, {
    href: 'week',
    title: 'Week',
    content: <WeekView />
}, {
    href: 'day',
    title: 'Day',
    content: <DayView />
}, {
    href: 'agenda',
    title: 'Agenda',
    content: <>Agenda</>
}]

const TabButton = props => {
    const { selectedTabIndex, tabIndex, href, title } = props;
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

const CalendarTabPanel = ({ router }) => {
    const {
        query: { view }
    } = router

    const {
        state: { calendarState },
        dispatch,
    } = CalendarState();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [tabValue, setTabValue] = useState(0);
    useEffect(() => {
        switch (view) {
            case 'month':
                setTabValue(0);
                break;
            case 'week':
                setTabValue(1);
                break;
            case 'day':
                setTabValue(2);
                break;
            case 'agenda':
                setTabValue(3);
                break;
            default:
                setTabValue(0);

        }
    }, [])

    const handleTodayClick = () => {
        dispatch({
            type: "SET_SELECTED_DATE",
            payload: {
                day: new Date()
            },
        });
    }
    const handleAddTimeClick = (qty) => {
        let newDate = calendarState.selectedDate;
        switch (tabValue) {
            case 0:
                newDate = addMonths(newDate, qty);
                newDate = new Date(newDate.getFullYear(), newDate.getMonth(), 1)
                break;
            case 1:
                newDate = addWeeks(newDate, qty);
                break;
            case 2:
                newDate = addDays(newDate, qty);
                break;
            case 3:
                newDate = addDays(newDate, qty);
                break;
            default:
        }
        dispatch({
            type: "SET_SELECTED_DATE",
            payload: {
                day: newDate
            },
        });
    }

    const getTimeLabel = () => {
        const date = calendarState.selectedDate;

        let timeLabel = "";
        switch (tabValue) {
            case 0:
                timeLabel = months[date.getMonth()] + ", " + date.getFullYear();
                break;
            case 1:
                const startOfWeekDay = startOfWeek(date);
                const endOfWeekDay = endOfWeek(date);

                timeLabel = "Week " + getWeek(date, {
                    weekStartsOn: 1,
                    firstWeekContainsDate: 4
                }) + ", " + months[startOfWeekDay.getMonth()] + " " + startOfWeekDay.getDate() + " - " + months[endOfWeekDay.getMonth()] + " " + endOfWeekDay.getDate();
                break;
            case 2:
                timeLabel = months[date.getMonth()] + ", " + daysLong[date.getDay()] + " "+ date.getDate();
                break;
            case 3:
                timeLabel = months[date.getMonth()] + ", " + date.getDate();
                break;
            default:
        }

        return timeLabel;
    }
    const handleTabChange = (e, newValue) => {
        setTabValue(newValue);
    }
    return (
        <Box sx={{ height: "100%", display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
            <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
                <Box sx={{ display: "flex", justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Button variant="contained" size="small" onClick={handleTodayClick}>
                        Today
                    </Button>
                    <IconButton color="primary" onClick={() => handleAddTimeClick(-1)}>
                        <WestIcon />
                    </IconButton>
                    <IconButton color="primary" onClick={() => handleAddTimeClick(1)}>
                        <EastIcon />
                    </IconButton>
                </Box>
                <Box sx={{ flex: 1, display: { xs: "none", sm: "flex" }, justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h6">{getTimeLabel()}</Typography>

                </Box>
                <Box sx={{ display: { xs: 'none', lg: "flex" }, justifyContent: 'flex-end', alignItems: 'center', p: 1 }}>
                    <ToggleButtonGroup color="primary" size="small" value={tabValue} onChange={handleTabChange} exclusive={true}>
                        {tabNames.map((tab, ind) => (
                            <ToggleButton value={ind} key={ind}>
                                {tab.title}
                            </ToggleButton>
                            // <TabButton onClick={() => { }} handleTabChange={handleTabChange} selectedTabIndex={tabValue} tabIndex={ind} href={tab.href} title={tab.title} />
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
                        {tabNames[tabValue].title}
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        {tabNames.map((tab, ind) => (
                            <TabButton key={"tabMenuButton" + ind} onClick={handleClose} handleTabChange={handleTabChange} selectedTabIndex={tabValue} tabIndex={ind} href={tab.href} title={tab.title} />
                        ))}
                    </Menu>
                </Box>
            </Box>
            <Box sx={{ mb: 1, display: { xs: "flex", sm: "none" }, justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h5">{getTimeLabel()}</Typography>

            </Box>
            <Box sx={{ flex: 1, maxHeight: "100%", overflowY: "hidden" }}>
                {tabNames.map((tab, ind) => {
                    if (tabValue == ind) return <CalendarLayout key={ind}>{tab.content}</CalendarLayout>;
                })}
            </Box>
        </Box>
    )
}

export default withRouter(CalendarTabPanel)