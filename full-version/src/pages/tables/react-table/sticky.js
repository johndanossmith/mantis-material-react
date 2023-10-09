import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import { Box, Chip, Grid } from '@mui/material';

// project import
import makeData from 'data/react-table';
import Avatar from 'components/@extended/Avatar';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import StickyTable from 'sections/tables/react-table/StickyTable';

const avatarImage = require.context('assets/images/users', true);

// ==============================|| REACT TABLE - STICKY ||============================== //

//
const Address = ({ value }) => <Box sx={{ minWidth: 200 }}>{value}</Box>;

Address.propTypes = {
  value: PropTypes.string
};

//Progress
const CellProgress = ({ value }) => <LinearWithLabel value={value} sx={{ minWidth: 75 }} />;

CellProgress.propTypes = {
  value: PropTypes.number
};

const CellAvatar = ({ value }) => <Avatar alt="Avatar 1" size="sm" src={avatarImage(`./avatar-${!value ? 1 : value}.png`)} />;

CellAvatar.propTypes = {
  value: PropTypes.number
};

// Status
const StatusCell = (value) => {
  switch (value) {
    case 'Cancelled':
      return <Chip color="error" label="Cancelled" size="small" variant="light" />;
    case 'Paid':
      return <Chip color="success" label="Paid" size="small" variant="light" />;
    case 'Unpaid':
    default:
      return <Chip color="info" label="Unpaid" size="small" variant="light" />;
  }
};

StatusCell.propTypes = {
  value: PropTypes.array
};

const Sticky = () => {
  const data = useMemo(() => makeData(40), []);
  const columns = useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName'
      },
      {
        Header: 'Last Name',
        accessor: 'lastName'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Age',
        accessor: 'age',
        className: 'cell-right'
      },
      {
        Header: 'Role',
        accessor: 'role'
      },
      {
        Header: 'Visits',
        accessor: 'visits',
        className: 'cell-right'
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: StatusCell
      },
      {
        Header: 'Profile Progress',
        accessor: 'progress',
        Cell: CellProgress
      }
    ],
    []
  );

  const NewColumns = useMemo(
    () => [
      {
        Header: '#',
        Footer: '#',
        accessor: 'id',
        sticky: 'left',
        width: 80
      },
      {
        Header: 'Avatar',
        accessor: 'avatar',
        sticky: 'left',
        Cell: CellAvatar,
        width: 80
      },
      {
        Header: 'First Name',
        accessor: 'firstName',
        sticky: 'left',
        width: 120,
        defaultCanSort: true
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        width: 120
      },
      {
        Header: 'Father Name',
        accessor: 'fatherName',
        width: 150
      },
      {
        Header: 'Email',
        accessor: 'email',
        width: 200
      },
      {
        Header: 'Age',
        accessor: 'age',
        className: 'cell-right'
      },
      {
        Header: 'Role',
        accessor: 'role',
        width: 120
      },
      {
        Header: 'Contact',
        accessor: 'contact'
      },
      {
        Header: 'Location',
        accessor: 'address',
        Cell: Address,
        width: 200
      },
      {
        Header: 'Visits',
        accessor: 'visits',
        className: 'cell-right'
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: StatusCell,
        width: 200
      },
      {
        Header: 'Profile Progress',
        accessor: 'progress',
        Cell: CellProgress,
        width: 200
      }
    ],
    []
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <StickyTable title="Sticky Header" columns={columns} data={data.slice(0, 20)} />
      </Grid>
      <Grid item xs={12}>
        <StickyTable title="Sticky Column" columns={NewColumns} data={data.slice(0, 20)} />
      </Grid>
    </Grid>
  );
};

export default Sticky;
