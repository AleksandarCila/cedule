// Components
import { Typography,useTheme } from '@mui/material'

// Utility
import { addAlphaToColor } from "../../../utility/addAlphaToColor";

// Types
import TimeStampObject from '../../../types/interfaces/TimeStampObject'
interface ITimeStamp {
    hour:TimeStampObject;
    hourInd:number;
}
const TimeStamp = (props:ITimeStamp) => {
    const { hour, hourInd } = props;
    // States
    const isMainHourBorder = (hourInd % 4 === 3 && hourInd>0) ? true : false;
    const isMainHour = hourInd % 4 === 0  ? true : false;

    // Hooks
    const theme = useTheme();
    
    return (
        <div style={{ height: 20, width: "100%" }}>
            <div style={{
                height: "100%", display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
                <div style={{
                    paddingLeft:4,
                    width: "100%", height: "100%", overflow: "hidden", textOverflow: "ellipsis",
                    borderRight: `1px solid ${theme.palette.backgroundLight}`,
                    borderBottom: `1px solid ${!isMainHourBorder ? "transparent" : theme.palette.backgroundLight}`,
                    backgroundColor: hour.timeLabel === "am" ? addAlphaToColor(theme.palette.primary.main, 0.15) : addAlphaToColor(theme.palette.primary.main, 0.2)
                }}>
                    <Typography variant="body1" fontSize="small">
                        {isMainHour ? hour.label : ""}
                    </Typography>
                </div>
            </div>
        </div>
    )
}

export default TimeStamp;