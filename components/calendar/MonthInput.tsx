import { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Grid } from '@mui/material'

type AppProps = {
  value: string;
  handleMonthChange: Function;
};

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const MonthInput = (props: AppProps): JSX.Element => {
  const handleChange = (event: SelectChangeEvent) => {
    props.handleMonthChange(event.target.value);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="month-select-label">Month</InputLabel>
        <Select
          labelId="month-select-label"
          id="month-select"
          value={props.value}
          label="Month"
          onChange={handleChange}
        >
          {months.map((month, ind) => (
            <MenuItem key={month+ind} value={ind}>{month}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default MonthInput;