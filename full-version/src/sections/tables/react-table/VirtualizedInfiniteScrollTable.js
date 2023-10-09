import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Chip, Table, TableBody, TableCell, TableHead, TableRow, Stack } from '@mui/material';

// third-party
import { useTable, useSortBy } from 'react-table';
import { useSticky } from 'react-table-sticky';
import InfiniteScroll from 'react-infinite-scroll-component';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { CSVExport, HeaderSort } from 'components/third-party/ReactTable';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';

import { ThemeMode } from 'config';
import makeData from 'data/react-table';

// ==============================|| REACT TABLE ||============================== //

// table style
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

function ReactTable({ columns, data, update, getHeaderProps }) {
  const defaultColumn = useMemo(
    () => ({
      minWidth: 80,
      width: 100,
      maxWidth: 400
    }),
    []
  );
  const theme = useTheme();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn
    },
    useSortBy,
    useSticky
  );

  const sortingRow = rows;
  let sortedData = sortingRow.map((d) => d.original);
  Object.keys(sortedData).forEach((key) => sortedData[Number(key)] === undefined && delete sortedData[Number(key)]);
  return (
    <Stack spacing={10}>
      <MainCard
        title="Virtualized Infinite Scroll"
        content={false}
        secondary={<CSVExport data={sortedData} filename="infinite-scroll-table.csv" />}
      >
        <ScrollX sx={{ height: 540 }} id="scrollableDiv">
          <InfiniteScroll
            dataLength={rows.length}
            next={update}
            hasMore={true}
            loader={<h4>Loading more 20 items...</h4>}
            scrollThreshold={0.5}
            scrollableTarget="scrollableDiv"
          >
            <TableWrapper>
              <Table {...getTableProps()} stickyHeader>
                <TableHead>
                  {headerGroups.map((headerGroup, index) => (
                    <TableRow key={index} {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column, i) => {
                        return (
                          <TableCell
                            key={i}
                            sx={{ position: 'sticky !important' }}
                            {...column.getHeaderProps([{ className: column.className }, getHeaderProps(column)])}
                          >
                            <HeaderSort column={column} />
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                  {rows.map((row, index) => {
                    prepareRow(row);
                    return (
                      <TableRow key={index} {...row.getRowProps()}>
                        {row.cells.map((cell, i) => {
                          return (
                            <TableCell
                              key={i}
                              sx={{
                                backgroundColor:
                                  theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[100] : theme.palette.common.white
                              }}
                              {...cell.getCellProps([{ className: cell.column.className }])}
                            >
                              {cell.render('Cell')}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableWrapper>
          </InfiniteScroll>
        </ScrollX>
      </MainCard>
    </Stack>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  update: PropTypes.func,
  getHeaderProps: PropTypes.func
};

// ==============================|| REACT TABLE - STICKY ||============================== //

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

const VirtualizedInfiniteScrollTable = () => {
  const data = useMemo(() => makeData(50), []);

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
        Cell: ProgressCell
      }
    ],
    []
  );

  const [scrollData, setScrollData] = useState(data);

  const fetchMoreData = () => {
    setTimeout(() => {
      setScrollData(scrollData.concat(makeData(10)));
    }, 1500);
  };

  return (
    <ReactTable columns={columns} data={scrollData} update={fetchMoreData} getHeaderProps={(column) => column.getSortByToggleProps()} />
  );
};

export default VirtualizedInfiniteScrollTable;
