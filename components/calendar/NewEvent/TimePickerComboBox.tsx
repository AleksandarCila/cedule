// Components
import { Box, TextField, Autocomplete, Select, MenuItem } from "@mui/material";

// Utility
import { timeStamps } from "../../../utility/constants";

// Types
import TimeStampObject from "../../../types/interfaces/TimeStampObject";
import React from "react";
interface ITimePickerComboBox {
  label?: string;
  minTime?: TimeStampObject;
  value: TimeStampObject;
  onChange(newTime: number): void;
  disabled: boolean;
  error: boolean;
}
export default function TimePickerComboBox(props: ITimePickerComboBox) {
  const { label, minTime, value, onChange, disabled, error } = props;
  const timeStampsInternal = minTime
    ? timeStamps.slice(minTime.id + 1)
    : timeStamps;

  return (
    <Select
      labelId="time-picker-label"
      id="time-picker-select"
      value={value.id}
      onChange={(event) => {
         /* @ts-ignore */
        onChange(event.target.value);
      }}
      fullWidth
      disabled={disabled}
      size="small"
      MenuProps={{
        style: {
          maxHeight: 48 * 5,
        },
      }}
    >
      {timeStampsInternal.map((timeStamp, ind) => {
        return (
          <MenuItem key={ind} value={timeStamp.id}>
            {timeStamp.label}
          </MenuItem>
        );
      })}
    </Select>
  );

}
