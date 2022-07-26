import { Box } from "@mui/material";

const CalendarLayout = props => {
    const { children } = props;

    return (
        <Box sx={{ display: "flex", justifyContent: 'space-between', flexDirection: 'column'
        , width: "100%", maxHeight: 1080, height: "100%", minHeight: 460, bgcolor: "#fff", ...props.style }}>
            {children}
        </Box>
    )
}

export default CalendarLayout;