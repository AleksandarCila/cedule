import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Typography } from '@mui/material';

import { ModalState } from '../../../context/ModalContext';

export default function CalendarMoreButton(props) {
    const { calendar, dispatch } = props;

    const {
        dispatch: dispatchModal
    } = ModalState();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteButton = async (calendar_id) => {
        dispatch({
            type: "DELETE_CALENDAR",
            id: calendar_id
        })
        await fetch("/api/calendar/deleteCalendar", {
            method: "POST",
            body: [JSON.stringify(calendar_id)],
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    const handleOpenEditCalendar = (calendar) => {
        dispatchModal({
            type: "SHOW_MODAL",
            modalType: "NEW_CALENDAR",
            modalProps: {
                name: calendar.name,
                edit:true,
                id: calendar.id
            },

        })
    }
    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}

            >
                <MenuItem onClick={() => {
                    handleOpenEditCalendar(calendar);
                    handleClose();
                }}>
                    <EditIcon fontSize="small" /><Typography variant="span" fontSize="small">Edit</Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                    handleDeleteButton(calendar.id);
                    handleClose();
                }} >
                    <DeleteIcon fontSize="small" /><Typography variant="span" fontSize="small">Delete</Typography>
                </MenuItem>
            </Menu>
        </div>
    );
}
