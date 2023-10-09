import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { useMediaQuery, Box } from '@mui/material';

// project import
import Drawer from './Drawer';

import { DRAWER_WIDTH } from 'config';
import { dispatch } from 'store';
import { openComponentDrawer } from 'store/reducers/menu';

// components content
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  minHeight: `calc(100vh - 188px)`,
  width: `calc(100% - ${DRAWER_WIDTH}px)`,
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  [theme.breakpoints.down('md')]: {
    paddingLeft: 0
  },
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

// ==============================|| COMPONENTS LAYOUT ||============================== //

const ComponentsLayout = ({ handleDrawerOpen, componentDrawerOpen }) => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    dispatch(openComponentDrawer({ componentDrawerOpen: !matchDownMd }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownMd]);

  return (
    <Box sx={{ display: 'flex', pt: componentDrawerOpen ? { xs: 0, md: 3, xl: 5.5 } : 0 }}>
      <Drawer handleDrawerOpen={handleDrawerOpen} open={componentDrawerOpen} />
      <Main theme={theme} open={componentDrawerOpen}>
        <Outlet />
      </Main>
    </Box>
  );
};

ComponentsLayout.propTypes = {
  handleDrawerOpen: PropTypes.func,
  componentDrawerOpen: PropTypes.bool
};

export default ComponentsLayout;
