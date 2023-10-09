import { useState } from 'react';

// material-ui
import { Stack, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

// project import
import MainCard from 'components/MainCard';

// ==============================|| DATE PICKER - DISABLED ||============================== //

export default function DisabledPickers() {
  const [value, setValue] = useState(null);
  const [valueRange, setValueRange] = useState([null, null]);

  const disabledDatepickerCodeString = `<LocalizationProvider dateAdapter={AdapterDateFns}>
  <DatePicker
    disabled
    value={value}
    onChange={(newValue) => {
      setValue(newValue);
    }}
  />
  <DatePicker
    readOnly
    value={value}
    onChange={(newValue) => {
      setValue(newValue);
    }}
  />
</LocalizationProvider>

<Typography variant="h6">Date Range Picker</Typography>
<LocalizationProvider dateAdapter={AdapterDateFns} localeText={{ start: 'disabled start', end: 'disabled end' }}>
  <DateRangePicker
    disabled
    value={valueRange}
    onChange={(newValue) => {
      setValueRange(newValue);
    }}
  />
</LocalizationProvider>
<LocalizationProvider dateAdapter={AdapterDateFns} localeText={{ start: 'read-only start', end: 'read-only end' }}>
  <DateRangePicker
    readOnly
    value={valueRange}
    onChange={(newValue) => {
      setValueRange(newValue);
    }}
  />
</LocalizationProvider>

<Typography variant="h6">Date Time Picker</Typography>
<LocalizationProvider dateAdapter={AdapterDateFns}>
  <DateTimePicker
    disabled
    value={value}
    onChange={(newValue) => {
      setValue(newValue);
    }}
  />
  <DateTimePicker
    readOnly
    value={value}
    onChange={(newValue) => {
      setValue(newValue);
    }}
  />

  <Typography variant="h6">Time Picker</Typography>
  <TimePicker
    disabled
    value={value}
    onChange={(newValue) => {
      setValue(newValue);
    }}
  />
  <TimePicker
    readOnly
    value={value}
    onChange={(newValue) => {
      setValue(newValue);
    }}
  />
</LocalizationProvider>`;

  return (
    <MainCard title="Disabled Pickers" codeString={disabledDatepickerCodeString}>
      <Stack spacing={3}>
        <Typography variant="h6">Date Picker</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            disabled
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
          <DatePicker
            readOnly
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </LocalizationProvider>

        <Typography variant="h6">Date Range Picker</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns} localeText={{ start: 'disabled start', end: 'disabled end' }}>
          <DateRangePicker
            disabled
            value={valueRange}
            onChange={(newValue) => {
              setValueRange(newValue);
            }}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns} localeText={{ start: 'read-only start', end: 'read-only end' }}>
          <DateRangePicker
            readOnly
            value={valueRange}
            onChange={(newValue) => {
              setValueRange(newValue);
            }}
          />
        </LocalizationProvider>

        <Typography variant="h6">Date Time Picker</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            disabled
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
          <DateTimePicker
            readOnly
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />

          <Typography variant="h6">Time Picker</Typography>
          <TimePicker
            disabled
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
          <TimePicker
            readOnly
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </LocalizationProvider>
      </Stack>
    </MainCard>
  );
}
