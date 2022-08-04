import { FormControlLabel,Checkbox } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';


const CalendarCheckButton = props => {
    const { color, label, checked, onClick } = props;
    return (
        <FormControlLabel  control={<Checkbox 
            onClick={onClick}
            size="small"
            disableRipple
            checked={checked}
            icon={<CircleOutlinedIcon sx={{ color: color, }} />}
            checkedIcon={<CircleIcon sx={{ color: color, }} />}
        />} label={label} />

    )
}

export default CalendarCheckButton;