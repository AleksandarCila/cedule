// Components
import { FormControlLabel, Checkbox, Typography } from "@mui/material";

// Icons
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

// Types
interface ICalendarCheckButton {
    color: string;
    label: string;
    checked: boolean;
    onClick(event: React.MouseEvent<HTMLButtonElement>): void
  }

const CalendarCheckButton = (props:ICalendarCheckButton) => {
    const { color, label, checked, onClick } = props;
    return (
        <FormControlLabel sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }} control={<Checkbox
            onClick={onClick}
            size="small"
            disableRipple
            checked={checked}
            icon={<CircleOutlinedIcon sx={{ color: color, }} />}
            checkedIcon={<CircleIcon sx={{ color: color, }} />}
        />} label={<Typography variant="body1" fontSize="small" >{label}</Typography>} />

    )
}

export default CalendarCheckButton;