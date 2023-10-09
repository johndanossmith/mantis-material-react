import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import InvoiceWidgetCard from 'sections/apps/invoice/InvoiceWidgetCard';
import InvoiceIncomeAreaChart from 'sections/apps/invoice/InvoiceIncomeAreaChart';
import InvoiceUserList from 'sections/apps/invoice/InvoiceUserList';
import InvoiceNotificationList from 'sections/apps/invoice/InvoiceNotificationList';
import InvoicePieChart from 'sections/apps/invoice/InvoicePieChart';
import InvoiceCard from 'sections/apps/invoice/InvoiceCard';

// ==============================|| INVOICE - DASHBOARD ||============================== //

const Dashboard = () => {
  const theme = useTheme();
  const [activeChart, setActiveChart] = useState(0);

  const widgetData = [
    {
      title: 'Total',
      count: '£5678.09',
      percentage: 20.3,
      isLoss: true,
      invoice: '3',
      color: theme.palette.warning
    },
    {
      title: 'Paid',
      count: '£5678.09',
      percentage: -8.73,
      isLoss: true,
      invoice: '5',
      color: theme.palette.error
    },
    {
      title: 'Pending',
      count: '£5678.09',
      percentage: 1.73,
      isLoss: false,
      invoice: '20',
      color: theme.palette.success
    },
    {
      title: 'Overdue',
      count: '£5678.09',
      percentage: -4.7,
      isLoss: true,
      invoice: '5',
      color: theme.palette.primary
    }
  ];

  const [series, setSeries] = useState([
    {
      name: 'TEAM A',
      type: 'column',
      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 25]
    },
    {
      name: 'TEAM B',
      type: 'line',
      data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 35]
    }
  ]);

  const handleSeries = (index) => {
    setActiveChart(index);
    switch (index) {
      case 1:
        setSeries([
          {
            name: 'TEAM A',
            type: 'column',
            data: [10, 15, 8, 12, 11, 7, 10, 13, 22, 10, 18, 4]
          },
          {
            name: 'TEAM B',
            type: 'line',
            data: [12, 18, 15, 17, 12, 10, 14, 16, 25, 17, 20, 8]
          }
        ]);
        break;
      case 2:
        setSeries([
          {
            name: 'TEAM A',
            type: 'column',
            data: [12, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 25]
          },
          {
            name: 'TEAM B',
            type: 'line',
            data: [17, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 35]
          }
        ]);
        break;
      case 3:
        setSeries([
          {
            name: 'TEAM A',
            type: 'column',
            data: [1, 2, 3, 5, 1, 0, 2, 0, 6, 1, 5, 3]
          },
          {
            name: 'TEAM B',
            type: 'line',
            data: [5, 3, 5, 6, 7, 0, 3, 1, 7, 3, 5, 4]
          }
        ]);
        break;
      case 0:
      default:
        setSeries([
          {
            name: 'TEAM A',
            type: 'column',
            data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 25]
          },
          {
            name: 'TEAM B',
            type: 'line',
            data: [34, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 35]
          }
        ]);
    }
  };

  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12} lg={9}>
        <MainCard>
          <Grid container spacing={2}>
            {widgetData.map((data, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box onClick={() => handleSeries(index)} sx={{ cursor: 'pointer' }}>
                  <InvoiceWidgetCard
                    title={data.title}
                    count={data.count}
                    percentage={data.percentage}
                    isLoss={data.isLoss}
                    invoice={data.invoice}
                    color={data.color.main}
                    isActive={index === activeChart}
                  />
                </Box>
              </Grid>
            ))}
            <Grid item xs={12}>
              <InvoiceIncomeAreaChart series={series} />
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
      <Grid item xs={12} lg={3}>
        <InvoiceCard />
      </Grid>
      <Grid item sm={6} md={4} xs={12}>
        <InvoiceUserList />
      </Grid>
      <Grid item sm={6} md={4} xs={12}>
        <InvoicePieChart />
      </Grid>
      <Grid item sm={12} md={4} xs={12}>
        <InvoiceNotificationList />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
