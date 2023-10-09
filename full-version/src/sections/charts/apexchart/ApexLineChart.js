import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// third-party
import ReactApexChart from 'react-apexcharts';

// project import
import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';

// chart options
const lineChartOptions = {
  chart: {
    height: 350,
    type: 'line',
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
  }
};

// ==============================|| APEXCHART - LINE ||============================== //

const ApexLineChart = () => {
  const theme = useTheme();
  const { mode } = useConfig();

  const line = theme.palette.divider;
  const { primary } = theme.palette.text;
  const grey200 = theme.palette.grey[200];
  const secondary = theme.palette.primary[700];

  const [series] = useState([
    {
      name: 'Desktops',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }
  ]);

  const [options, setOptions] = useState(lineChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [secondary],
      xaxis: {
        labels: {
          style: {
            colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary]
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      }
    }));
  }, [mode, primary, line, grey200, secondary]);
  return (
    <Box id="chart" sx={{ bgcolor: 'transparent' }}>
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </Box>
  );
};

export default ApexLineChart;
