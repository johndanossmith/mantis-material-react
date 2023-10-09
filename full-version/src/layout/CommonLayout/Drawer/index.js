import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Box, Drawer as MuiDrawer, TextField } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import DrawerContent from './DrawerContent';
import { DRAWER_WIDTH } from 'config';

// assets
import { SearchOutlined } from '@ant-design/icons';

// ==============================|| DRAWER - NAVIGATION ||============================== //

const Drawer = ({ handleDrawerOpen, open }) => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const [searchValue, setSearchValue] = useState();

  const handleSearchValue = (event) => {
    const search = event.target.value.trim().toLowerCase();
    setSearchValue(search);
  };

  return (
    <MuiDrawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        position: { xs: 'fixed', md: 'sticky' },
        top: { xs: 0, md: 84, xl: 90 },
        height: { xs: 'auto', md: 'calc(100vh - 140px)', xl: 'calc(100vh - 176px)' },
        zIndex: { xs: open ? 1200 : -1, md: 0 },
        '& .MuiDrawer-paper': {
          position: 'relative',
          border: 'none'
        }
      }}
      variant={matchDownMd ? 'temporary' : 'persistent'}
      anchor="left"
      open={open}
      ModalProps={{ keepMounted: true }}
      onClose={handleDrawerOpen}
    >
      <MainCard sx={{ height: '100%' }} content={false}>
        <Box sx={{ p: 2, mb: 2 }}>
          <TextField
            fullWidth
            sx={{
              borderRadius: '4px',
              bgcolor: theme.palette.background.paper,
              boxShadow: theme.customShadows.primary,
              border: `1px solid ${theme.palette.primary.main}`
            }}
            InputProps={{
              startAdornment: <SearchOutlined />,
              placeholder: 'Search Components',
              type: 'search'
            }}
            onChange={handleSearchValue}
          />
        </Box>
        <DrawerContent searchValue={searchValue} />
      </MainCard>
    </MuiDrawer>
  );
};

Drawer.propTypes = {
  handleDrawerOpen: PropTypes.func,
  open: PropTypes.bool
};

export default Drawer;
