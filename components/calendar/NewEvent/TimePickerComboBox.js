// Components
import { Box, TextField, Autocomplete } from '@mui/material'

// Utility
import { timeStamps } from '../../../utility/constants'

export default function TimePickerComboBox(props) {
    const { label, minTime, value, onChange, disabled, error } = props;
    const timeStampsInternal = minTime ? timeStamps.slice(minTime.id + 1) : timeStamps;

    return (
        <Autocomplete
            id="time-picker-stamps"
            sx={{ width: "100%" }}
            value={value}
            disabled={disabled}
            options={timeStampsInternal}
            fullWidth
            // error={error}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            autoHighlight
            onInputChange={(newTime) => { if (newTime) onChange(newTime.target.value) }}
            getOptionLabel={(option) => option.label}
            disableClearable
            renderOption={(props, option) => (
                <Box component="li"  {...props} value={option.id}>
                    {option.label}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    size="small"
                    error={!error}

                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />
    );
}
