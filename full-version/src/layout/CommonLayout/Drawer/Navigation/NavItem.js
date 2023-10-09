import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Avatar, Chip, ListItemButton, ListItemText, Typography } from '@mui/material';

// project imports
import { ThemeMode } from 'config';
import { dispatch, useSelector } from 'store';
import { activeComponent, openComponentDrawer } from 'store/reducers/menu';

// ==============================|| NAVIGATION - LIST ITEM ||============================== //

const NavItem = ({ item }) => {
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  const menu = useSelector((state) => state.menu);
  const { openComponent } = menu;

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps = { component: forwardRef((props, ref) => <Link {...props} to={item.url} target={itemTarget} ref={ref} />) };
  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: itemTarget };
  }

  const itemHandler = (id) => {
    dispatch(activeComponent({ openComponent: id }));
    if (matchesMD) dispatch(openComponentDrawer({ componentDrawerOpen: false }));
  };

  // active menu item on page load
  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      dispatch(activeComponent({ openComponent: item.id }));
    }
    // eslint-disable-next-line
  }, []);

  const textColor = theme.palette.mode === ThemeMode.DARK ? 'grey.400' : 'text.primary';
  const iconSelectedColor = theme.palette.mode === ThemeMode.DARK ? 'text.primary' : 'primary.main';

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      onClick={() => itemHandler(item.id)}
      selected={openComponent === item.id}
      sx={{
        pl: 4,
        py: 1,
        mb: 0.5,
        '&:hover': {
          bgcolor: theme.palette.mode === ThemeMode.DARK ? 'divider' : 'primary.lighter'
        },
        '&.Mui-selected': {
          bgcolor: theme.palette.mode === ThemeMode.DARK ? 'divider' : 'primary.lighter',
          borderRight: `2px solid ${theme.palette.primary.main}`,
          '&:hover': {
            bgcolor: theme.palette.mode === ThemeMode.DARK ? 'divider' : 'primary.lighter'
          }
        }
      }}
    >
      <ListItemText
        primary={
          <Typography variant="h6" sx={{ color: openComponent === item.id ? iconSelectedColor : textColor }}>
            {item.title}
          </Typography>
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object
};

export default NavItem;
