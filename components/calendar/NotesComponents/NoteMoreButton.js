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
    const { note, dispatch } = props;

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

    const handleDeleteButton = async (note_id) => {
        dispatch({
            type: "DELETE_NOTE",
            id: note_id
        })
        await fetch("/api/notes/deleteNote", {
            method: "POST",
            body: [JSON.stringify(note_id)],
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    const handleOpenEditNote = (note) => {
        dispatchModal({
            type: "SHOW_MODAL",
            modalType: "NEW_NOTE",
            modalProps: {
                title: note.title,
                content: note.content,
                edit:true,
                id: note.id
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
                    handleOpenEditNote(note);
                    handleClose();
                }}>
                    <EditIcon fontSize="small" /><Typography variant="span" fontSize="small">Edit</Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                    handleDeleteButton(note.id);
                    handleClose();
                }} >
                    <DeleteIcon fontSize="small" /><Typography variant="span" fontSize="small">Delete</Typography>
                </MenuItem>
            </Menu>
        </div>
    );
}
