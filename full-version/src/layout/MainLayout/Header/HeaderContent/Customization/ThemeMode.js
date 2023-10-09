// material-ui
import { useTheme } from '@mui/material/styles';
import { CardMedia, FormControlLabel, Grid, Radio, RadioGroup, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';

// assets
import defaultLayout from 'assets/images/customization/default.svg';
import darkLayout from 'assets/images/customization/dark.svg';

// ==============================|| CUSTOMIZATION - MODE ||============================== //

const ThemeModeLayout = () => {
  const theme = useTheme();

  const { mode, onChangeMode } = useConfig();

  const handleModeChange = (event) => {
    onChangeMode(event.target.value);
  };

  return (
    <RadioGroup row aria-label="payment-card" name="payment-card" value={mode} onChange={handleModeChange}>
      <Grid container spacing={1.75} sx={{ ml: 0 }}>
        <Grid item>
          <FormControlLabel
            control={<Radio value={ThemeMode.LIGHT} sx={{ display: 'none' }} />}
            sx={{ display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
            label={
              <MainCard
                content={false}
                sx={{ bgcolor: mode === ThemeMode.LIGHT ? 'primary.lighter' : 'secondary.lighter', p: 1 }}
                border={false}
                {...(mode === ThemeMode.LIGHT && { boxShadow: true, shadow: theme.customShadows.primary })}
              >
                <Stack spacing={1.25} alignItems="center">
                  <CardMedia component="img" src={defaultLayout} alt="Vertical" sx={{ borderRadius: 1, width: 64, height: 64 }} />
                  <Typography variant="caption">Light</Typography>
                </Stack>
              </MainCard>
            }
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={<Radio value={ThemeMode.DARK} sx={{ display: 'none' }} />}
            sx={{ display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
            label={
              <MainCard
                content={false}
                sx={{ bgcolor: mode === ThemeMode.DARK ? 'primary.lighter' : 'secondary.lighter', p: 1 }}
                border={false}
                {...(mode === ThemeMode.DARK && { boxShadow: true, shadow: theme.customShadows.primary })}
              >
                <Stack spacing={1.25} alignItems="center">
                  <CardMedia component="img" src={darkLayout} alt="Vertical" sx={{ borderRadius: 1, width: 64, height: 64 }} />
                  <Typography variant="caption">Dark</Typography>
                </Stack>
              </MainCard>
            }
          />
        </Grid>
      </Grid>
    </RadioGroup>
  );
};

export default ThemeModeLayout;
