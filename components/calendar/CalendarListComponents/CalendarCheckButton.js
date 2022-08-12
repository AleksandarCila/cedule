// Components
import { FormControlLabel, Checkbox, Typography } from "@mui/material";

// Icons
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';


const CalendarCheckButton = props => {
    const { color, label, checked, onClick } = props;
    return (
        <FormControlLabel sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }} control={<Checkbox
            onClick={onClick}
            size="small"
            disableRipple
            checked={checked}
            icon={<CircleOutlinedIcon sx={{ color: color, }} />}
            checkedIcon={<CircleIcon sx={{ color: color, }} />}
        />} label={<Typography variant="span" fontSize="small" >{label}</Typography>} />

    )
}

export default CalendarCheckButton;