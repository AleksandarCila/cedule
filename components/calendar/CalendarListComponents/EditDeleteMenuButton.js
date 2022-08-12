import { useState } from 'react';

// Components
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material"

// Icons
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const ConfirmationDialog = props => {
    const { handleAccept, handleCancel, info, show } = props;


    return (
        <Dialog
            open={show}
            onClose={handleCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Warning!"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {info}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    handleCancel()
                }
                }>No</Button>
                <Button onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    handleAccept();
                }
                }>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default function EditDeleteMenuButton(props) {
    const { onEditClick, onDeleteClick } = props;
    // States
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
    // Functions
    const handleClick = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div style={{ zIndex: 1000 }}>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                disableRipple
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
                onClose={(event) => {
                    event.stopPropagation();
                    event.preventDefault(); handleClose();
                }}

            >
                <MenuItem onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    onEditClick();
                    handleClose();
                }}>
                    <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                </MenuItem>
                <MenuItem onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    setShowConfirmationDialog(true);
                }} >
                    <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </MenuItem>
                <ConfirmationDialog handleAccept={() => { onDeleteClick(); setShowConfirmationDialog(false); handleClose(); }}
                    handleCancel={() => { setShowConfirmationDialog(false) }}
                    info={`Are you sure that you want to delete this?`} show={showConfirmationDialog} />
            </Menu>
        </div>
    );
}
