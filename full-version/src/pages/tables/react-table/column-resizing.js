import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import { Box, Chip, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// third-party
import { useTable, useResizeColumns, useBlockLayout } from 'react-table';

// project import
import ScrollX from 'components/ScrollX';
import makeData from 'data/react-table';
import MainCard from 'components/MainCard';
import { CSVExport } from 'components/third-party/ReactTable';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';

// assets
import { MinusOutlined } from '@ant-design/icons';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }) {
  const defaultColumn = useMemo(
    () => ({
      minWidth: 120,
      width: 155,
      maxWidth: 400
    }),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn
    },
    useBlockLayout,
    useResizeColumns
  );

  const sortingRow = rows.slice(0, 9);
  let sortedData = sortingRow.map((d) => d.original);
  Object.keys(sortedData).forEach((key) => sortedData[Number(key)] === undefined && delete sortedData[Number(key)]);

  return (
    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup, m) => (
          <TableRow key={m} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, x) => (
              <TableCell
                key={x}
                {...column.getHeaderProps([{ className: column.className }])}
                sx={{ '&:hover::after': { bgcolor: 'primary.main', width: 2 } }}
              >
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  {column.render('Header')}
                  <Box {...column.getResizerProps()} sx={{ position: 'absolute', right: -6, opacity: 0, zIndex: 1 }}>
                    <MinusOutlined style={{ transform: 'rotate(90deg)' }} />
                  </Box>
                </Stack>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {sortingRow.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow key={i} {...row.getRowProps()}>
              {row.cells.map((cell, x) => (
                <TableCell key={x} {...cell.getCellProps([{ className: cell.column.className }])}>
                  {cell.render('Cell')}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array
};

// ==============================|| REACT TABLE - COLUMN RESIZING ||============================== //

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

const ColumnResizing = () => {
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
        accessor: 'age'
      },
      {
        Header: 'Role',
        accessor: 'role'
      },
      {
        Header: 'Visits',
        accessor: 'visits'
      },
      {
        Header: 'country',
        accessor: 'country'
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: StatusCell
      },
      {
        Header: 'Progress',
        Footer: 'Progress',
        accessor: 'progress',
        Cell: CellProgress
      }
    ],
    []
  );

  return (
    <MainCard title="Column Resizing" content={false} secondary={<CSVExport data={data} filename={'resizing-column-table.csv'} />}>
      <ScrollX>
        <ReactTable columns={columns} data={data} />
      </ScrollX>
    </MainCard>
  );
};

export default ColumnResizing;
