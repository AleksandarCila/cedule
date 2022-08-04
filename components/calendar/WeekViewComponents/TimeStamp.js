import { Typography } from '@mui/material'

import { useTheme } from '@mui/material';
import { addAlphaToColor } from "../../../utility/addAlphaToColor";

const TimeStamp = props => {
    const { hour, hourInd } = props;
    const theme = useTheme();
    const isMainHourBorder = (hourInd % 4 === 3 && hourInd>0) ? true : false;
    const isMainHour = hourInd % 4 === 0  ? true : false;
    return (
        <div style={{ height: 20, width: "100%" }}>
            <div style={{
                height: "100%", display: 'flex', justifyContent: 'space-between', alignItems: 'center',

            }}>
                <div style={{
                    width: "100%", height: "100%", overflow: "hidden", textOverflow: "ellipsis",
                    borderRight: `1px solid ${theme.palette.grey['300']}`,
                    borderBottom: `1px solid ${theme.palette.grey[isMainHourBorder ? '300' : '200']}`,
                    backgroundColor: hourInd < 12 ? addAlphaToColor(theme.palette.primary.light, 0.15) : addAlphaToColor(theme.palette.primary.light, 0.2)
                }}>
                    <Typography variant="span" fontSize="small">
                        {isMainHour ? hour.label : ""}
                    </Typography>
                </div>
            </div>
        </div>
    )
}

export default TimeStamp;