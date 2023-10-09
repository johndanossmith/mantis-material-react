import PropTypes from 'prop-types';
import { Fragment, useEffect, useMemo, useState } from 'react';

// material-ui
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  Stack,
  Slider,
  Tooltip,
  IconButton
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// third-party
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useTable, useFilters, useRowSelect } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { CSVExport } from 'components/third-party/ReactTable';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';

import { ThemeMode } from 'config';
import makeData from 'data/react-table';
import { DefaultColumnFilter } from 'utils/react-table';

// assets
import { EditTwoTone, SendOutlined } from '@ant-design/icons';

const RowEdit = ({ value: initialValue, row: { index }, column: { id, dataType }, updateData, editableRowIndex }) => {
  const [value, setValue] = useState(initialValue);
  const theme = useTheme();

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    updateData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const ShowStatus = (value) => {
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

  let element;
  let userInfoSchema;

  switch (id) {
    case 'email':
      userInfoSchema = Yup.object().shape({
        userInfo: Yup.string().email('Enter valid email ').required('Email is a required field')
      });
      break;
    case 'age':
      userInfoSchema = Yup.object().shape({
        userInfo: Yup.number()
          .typeError('Age must be number')
          .required('Age is required')
          .min(18, 'You must be at least 18 years')
          .max(100, 'You must be at most 60 years')
      });
      break;
    case 'visits':
      userInfoSchema = Yup.object().shape({
        userInfo: Yup.number().typeError('Visits must be number').required('Required')
      });
      break;
    default:
      userInfoSchema = Yup.object().shape({
        userInfo: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is Required')
      });
      break;
  }
  let IsEditAble = index === editableRowIndex;

  switch (dataType) {
    case 'text':
      element = (
        <>
          {IsEditAble ? (
            <>
              <Formik
                initialValues={{
                  userInfo: value
                }}
                enableReinitialize
                validationSchema={userInfoSchema}
                onSubmit={() => {}}
              >
                {({ values, handleChange, handleBlur, errors, touched }) => (
                  <Form>
                    <TextField
                      value={values.userInfo}
                      id={`${index}-${id}`}
                      name="userInfo"
                      onChange={(e) => {
                        handleChange(e);
                        onChange(e);
                      }}
                      onBlur={handleBlur}
                      error={touched.userInfo && Boolean(errors.userInfo)}
                      helperText={touched.userInfo && errors.userInfo && errors.userInfo}
                      sx={{
                        '& .MuiOutlinedInput-input': {
                          py: 0.75,
                          px: 1,
                          backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'inherit' : 'common.white'
                        }
                      }}
                    />
                  </Form>
                )}
              </Formik>
            </>
          ) : (
            value
          )}
        </>
      );
      break;
    case 'select':
      element = (
        <>
          {IsEditAble ? (
            <Select
              labelId="editable-select-label"
              sx={{
                '& .MuiOutlinedInput-input': {
                  py: 0.75,
                  px: 1,
                  backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'inherit' : 'common.white'
                }
              }}
              id="editable-select"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            >
              <MenuItem value="Complicated">
                <Chip color="error" label="Complicated" size="small" variant="light" />
              </MenuItem>
              <MenuItem value="Relationship">
                <Chip color="success" label="Relationship" size="small" variant="light" />
              </MenuItem>
              <MenuItem value="Single">
                <Chip color="info" label="Single" size="small" variant="light" />
              </MenuItem>
            </Select>
          ) : (
            ShowStatus(value)
          )}
        </>
      );
      break;
    case 'progress':
      element = (
        <>
          {IsEditAble ? (
            <>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ pl: 1, minWidth: 120 }}>
                <Slider
                  value={value}
                  min={0}
                  max={100}
                  step={1}
                  onBlur={onBlur}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  valueLabelDisplay="auto"
                  aria-labelledby="non-linear-slider"
                />
              </Stack>
            </>
          ) : (
            <div>
              <LinearWithLabel value={value} sx={{ minWidth: 75 }} />
            </div>
          )}
        </>
      );
      break;
    default:
      element = <span></span>;
      break;
  }

  return element;
};

const ColumnCell = ({ row, setEditableRowIndex, editableRowIndex }) => (
  <>
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
      <Tooltip title={editableRowIndex !== row.index ? 'Edit' : 'Save'}>
        <IconButton
          color={editableRowIndex !== row.index ? 'primary' : 'success'}
          onClick={() => {
            const currentIndex = row.index;
            if (editableRowIndex !== currentIndex) {
              // row requested for edit access
              setEditableRowIndex(currentIndex);
            } else {
              // request for saving the updated row
              setEditableRowIndex(null);
            }
          }}
        >
          {editableRowIndex !== row.index ? <EditTwoTone /> : <SendOutlined />}
        </IconButton>
      </Tooltip>
    </Stack>
  </>
);

ColumnCell.propTypes = {
  row: PropTypes.object,
  setEditableRowIndex: PropTypes.func,
  editableRowIndex: PropTypes.number
};

function ReactTableRowEditing({ columns, data, updateData, skipPageReset }) {
  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
      Cell: RowEdit
    }),
    []
  );

  const [editableRowIndex, setEditableRowIndex] = useState(null);

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable(
    {
      columns,
      data,
      defaultColumn: defaultColumn,
      autoResetPage: !skipPageReset,
      updateData,
      editableRowIndex,
      setEditableRowIndex
    },
    useFilters,
    useRowSelect,
    (hooks) => {
      hooks.allColumns.push((columns) => [
        ...columns,
        {
          accessor: 'edit',
          id: 'edit',
          Header: 'edit',
          Cell: ColumnCell
        }
      ]);
    }
  );

  return (
    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup, index) => (
          <TableRow key={index} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, i) => (
              <TableCell key={i} {...column.getHeaderProps()}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <Fragment key={index}>
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell, i) => (
                  <Fragment key={i}>
                    <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                  </Fragment>
                ))}
              </TableRow>
            </Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
}

ReactTableRowEditing.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  updateData: PropTypes.func,
  skipPageReset: PropTypes.bool
};

// ==============================|| REACT TABLE - EDITABLE ROW ||============================== //

const EditableRow = () => {
  const [data, setData] = useState(() => makeData(10));
  const [skipPageReset, setSkipPageReset] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName',
        dataType: 'text'
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        dataType: 'text'
      },
      {
        Header: 'Email',
        accessor: 'email',
        dataType: 'text'
      },
      {
        Header: 'Age',
        accessor: 'age',
        dataType: 'text'
      },
      {
        Header: 'Visits',
        accessor: 'visits',
        dataType: 'text'
      },
      {
        Header: 'Status',
        accessor: 'status',
        dataType: 'select'
      },
      {
        Header: 'Profile Progress',
        accessor: 'progress',
        dataType: 'progress'
      }
    ],
    []
  );

  const updateData = (rowIndex, columnId, value) => {
    // we also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value
          };
        }
        return row;
      })
    );
  };

  useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  return (
    <MainCard title="Row Editable" content={false} secondary={<CSVExport data={data} filename={'row-editable-table.csv'} />}>
      <ScrollX>
        <ReactTableRowEditing columns={columns} data={data} updateData={updateData} skipPageReset={skipPageReset} />
      </ScrollX>
    </MainCard>
  );
};

export default EditableRow;
