import { useState } from 'react';

// Context States
import { ModalState } from "../../../context/ModalContext";

// Components
import { Box, Chip, Typography, useTheme } from '@mui/material';

// Icons
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';


const TagCheckButton = props => {
    const { tag } = props;
    const [selected, setSelected] = useState(true);

    const handleClick = () => {
        setSelected(prev => !prev);
    }
    const theme = useTheme();
    return (

        <Chip size="small" label={tag.name} variant="outlined" color={selected ? "primary" : "default"} onClick={handleClick} sx={{
        }} icon={selected ? <CheckIcon /> : <></>} />
    )
}

const NoteTags = props => {
    // States
    const {
        dispatch: dispatchModal
    } = ModalState();

    // Functions
    const handleAddTag = () => {
        dispatchModal({
            type: "SHOW_MODAL",
            modalType: "NEW_NOTE",
            modalProps: {}
        })
    }
    return (
        <Box sx={{ width: "100%", overflowX: 'auto', py: 1, display: { xs: "none", lg: "block" } }}>
            <Chip icon={<AddIcon />} label={<Typography sx={{display:'flex', alignItems:'center'}}>Add Note</Typography>} color="primary" onClick={handleAddTag} />
            {/* <Stack direction="row" spacing={1}>
                <Divider sx={{ height: 25, width: 5, borderRightWidth: 2 }} orientation="vertical" />
                <Chip size="small" icon={<AddIcon />} label="Add Tag" color="primary" onClick={() => { handleAddTag }} />
                {NOTE_TAGS.map((tag, ind) => {
                    return (<TagCheckButton key={ind} tag={tag} />)
                })}
            </Stack> */}
        </Box>
    )
}

export default NoteTags;