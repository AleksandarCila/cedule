import { Box, Chip, Stack, Divider, useTheme } from '@mui/material';
import { useState } from 'react';
import { NOTE_TAGS } from '../../../utility/constants'
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { ModalState } from "../../../context/ModalContext";


const TagCheckButton = props => {
    const { tag } = props;
    const [selected, setSelected] = useState(true);

    const handleClick = () => {
        setSelected(prev => !prev);
    }
    const theme = useTheme();
    console.log(tag.color);
    return (

        <Chip size="small" label={tag.name} variant="outlined" color={selected ? "primary" : "default"} onClick={handleClick} sx={{
        }} icon={selected ? <CheckIcon /> : <></>} />
    )
}

const NoteTags = props => {
    const {
        dispatch: dispatchModal
    } = ModalState();


    const handleAddTag = () => {
        dispatchModal({
            type: "SHOW_MODAL",
            modalType: "NEW_NOTE",
            modalProps: {}
        })
    }
    return (
        <Box sx={{ width: "100%", overflowX: 'auto', py: 1, display: { xs: "none", lg: "block" } }}>
            <Chip icon={<AddIcon />} label="Add Note" color="primary" onClick={handleAddTag} />
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