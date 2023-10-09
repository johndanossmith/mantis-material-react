import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';
import { useTable, useSortBy, useBlockLayout } from 'react-table';
import { FixedSizeList } from 'react-window';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Chip, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// project-import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import { CSVExport, HeaderSort } from 'components/third-party/ReactTable';

import { ThemeMode } from 'config';
import makeData from 'data/react-table';

const TableWrapper = styled('div')(() => ({
  '.header': {
    position: 'sticky',
    zIndex: 1,
    width: 'fit-content'
  },
  '& th[data-sticky-td]': {
    position: 'sticky',
    zIndex: '5 !important'
  }
}));

function ReactTable({ columns, data, getHeaderProps }) {
  const theme = useTheme();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data
    },
    useSortBy,
    useBlockLayout
  );

  const RenderRow = useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <TableRow
          {...row.getRowProps({
            style
          })}
        >
          {row.cells.map((cell, index) => {
            return (
              <TableCell
                key={index}
                sx={{
                  backgroundColor: theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[100] : theme.palette.common.white
                }}
                {...cell.getCellProps()}
              >
                {cell.render('Cell')}
              </TableCell>
            );
          })}
        </TableRow>
      );
    },
    [prepareRow, rows, theme]
  );

  // Render the UI for your table
  return (
    <Stack spacing={10}>
      <MainCard
        title="Virtualized Rows"
        content={false}
        secondary={<CSVExport data={data} filename="virtualized-row-table.csv" />}
        sx={{ maxWidth: 1205 }}
      >
        <ScrollX>
          <TableWrapper>
            <Table {...getTableProps()} stickyHeader>
              <TableHead>
                {headerGroups.map((headerGroup, index) => (
                  <TableRow key={index} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, i) => (
                      <TableCell
                        key={i}
                        sx={{ position: 'sticky !important' }}
                        {...column.getHeaderProps([{ className: column.className }, getHeaderProps(column)])}
                      >
                        <HeaderSort column={column} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>

              <TableBody {...getTableBodyProps()}>
                <FixedSizeList height={600} itemCount={rows.length} itemSize={60} width="100%">
                  {RenderRow}
                </FixedSizeList>
              </TableBody>
            </Table>
          </TableWrapper>
        </ScrollX>
      </MainCard>
    </Stack>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  getHeaderProps: PropTypes.func
};

const StatusCell = ({ value }) => {
  switch (value) {
    case 'Complicated':
      return <Chip color="error" label="Complicated" size="small" variant="light" />;
    case 'Relationship':
      return <Chip color="success" label="Relationship" size="small" variant="light" />;
    case 'Single':
    default:
      return <Chip color="info" label="Single" size="small" variant="light" />;
  }
};

StatusCell.propTypes = {
  value: PropTypes.string
};

const ProgressCell = ({ value }) => <LinearWithLabel value={value} sx={{ minWidth: 75 }} />;

ProgressCell.propTypes = {
  value: PropTypes.number
};

function App() {
  const data = useMemo(() => makeData(10000), []);

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
        Header: 'Progress',
        accessor: 'progress',
        Cell: ProgressCell
      }
    ],
    []
  );

  return <ReactTable columns={columns} data={data} getHeaderProps={(column) => column.getSortByToggleProps()} />;
}

export default App;
