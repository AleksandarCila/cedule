import { Typography } from "@mui/material";

const CalendarLayout = props => {
    const { children } = props;

    return (
        <Typography component="div"
        >
            {children}
        </Typography>
    )
}

export default CalendarLayout;