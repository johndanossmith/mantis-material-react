import PropTypes from 'prop-types';
import { useCallback, useMemo, Fragment } from 'react';

// material-ui
import { Box, Chip, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// third-party
import { useExpanded, useTable } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import ExpandingUserDetail from './ExpandingUserDetail';
import { CSVExport } from 'components/third-party/ReactTable';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';

// assets
import { DownOutlined, RightOutlined } from '@ant-design/icons';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns: userColumns, data, renderRowSubComponent }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, visibleColumns } = useTable(
    {
      columns: userColumns,
      data
    },
    useExpanded
  );

  return (
    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup, i) => (
          <TableRow key={i} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => (
              <TableCell key={index} {...column.getHeaderProps([{ className: column.className }])}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          const rowProps = row.getRowProps();

          return (
            <Fragment key={i}>
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell, index) => (
                  <TableCell key={index} {...cell.getCellProps([{ className: cell.column.className }])}>
                    {cell.render('Cell')}
                  </TableCell>
                ))}
              </TableRow>
              {row.isExpanded && renderRowSubComponent({ row, rowProps, visibleColumns })}
            </Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  renderRowSubComponent: PropTypes.any
};

// ==============================|| REACT TABLE - EXPANDING TABLE ||============================== //

const CellExpander = ({ row }) => {
  const collapseIcon = row.isExpanded ? <DownOutlined /> : <RightOutlined />;
  return (
    <Box sx={{ fontSize: '0.75rem', color: 'text.secondary', textAlign: 'center' }} {...row.getToggleRowExpandedProps()}>
      {collapseIcon}
    </Box>
  );
};

CellExpander.propTypes = {
  row: PropTypes.object
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

const CellProgress = ({ value }) => <LinearWithLabel value={value} sx={{ minWidth: 75 }} />;

CellProgress.propTypes = {
  value: PropTypes.number
};

const ExpandingDetails = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: () => null,
        id: 'expander',
        className: 'cell-center',
        Cell: CellExpander,
        SubCell: () => null
      },
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

  const renderRowSubComponent = useCallback(({ row }) => <ExpandingUserDetail data={data[row.id]} />, [data]);

  return (
    <MainCard title="Expanding User Details" content={false} secondary={<CSVExport data={data} filename={'expanding-details-table.csv'} />}>
      <ScrollX>
        <ReactTable columns={columns} data={data} renderRowSubComponent={renderRowSubComponent} />
      </ScrollX>
    </MainCard>
  );
};

ExpandingDetails.propTypes = {
  data: PropTypes.any
};

export default ExpandingDetails;
