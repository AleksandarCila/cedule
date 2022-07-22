import { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material'

type AppProps = {
    value: string;
    handleYearChange: Function;
};

const years = [2021, 2022, 2023, 2024];

const YearInput = (props: AppProps): JSX.Element => {
    const handleChange = (event: SelectChangeEvent) => {
        console.log("YEAR" + event.target.value)
        props.handleYearChange(years[event.target.value]);
    };

    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="year-select-label">Year</InputLabel>
                <Select
                    labelId="year-select-label"
                    id="year-select"
                    value={years.indexOf(props.value) > 0 ? years.indexOf(props.value) : 0}
                    label="Year"
                    onChange={handleChange}
                >
                    {years.map((year, ind) => (
                        <MenuItem key={year + ind} value={ind}>{year}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

export default YearInput;