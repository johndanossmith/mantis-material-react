import { useState } from 'react';

// material-ul
import { Button, Slider } from '@mui/material';

// third-party
import { enqueueSnackbar } from 'notistack';

// project import
import MainCard from 'components/MainCard';

// ==============================|| NOTISTACK - TIMEOUT ||============================== //

export default function HideDuration() {
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    if (typeof newValue === 'number') {
      setValue(newValue);
    }
  };

  const marks = [
    {
      value: 1
    },
    {
      value: 3
    },
    {
      value: 5
    },
    {
      value: 7
    },
    {
      value: 9
    },
    {
      value: 11
    }
  ];

  function valueLabelFormat(value) {
    if (value === 11) return `persist`;
    return `${value}s`;
  }

  const NotistackHideDurationCodeString = `<Button
  variant="contained"
  fullWidth
  sx={{ marginBlockStart: 2 }}
  onClick={() => {
    if (value !== 11) {
     enqueueSnackbar('Your notification here', { autoHideDuration: value * 1000 });
    } else {
     enqueueSnackbar('Your notification here', { persist: true });
    }
  }}
>
  Show Snackbar
</Button>`;

  return (
    <MainCard title="Hide Duration" codeString={NotistackHideDurationCodeString}>
      <Slider
        value={value}
        min={1}
        step={2}
        max={11}
        valueLabelDisplay="on"
        marks={marks}
        getAriaValueText={valueLabelFormat}
        valueLabelFormat={valueLabelFormat}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{ marginBlockStart: 2 }}
        onClick={() => {
          if (value !== 11) {
            enqueueSnackbar('Your notification here', { autoHideDuration: value * 1000 });
          } else {
            enqueueSnackbar('Your notification here', { persist: true });
          }
        }}
      >
        Show Snackbar
      </Button>
    </MainCard>
  );
}
