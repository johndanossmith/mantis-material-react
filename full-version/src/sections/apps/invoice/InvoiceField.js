import PropTypes from 'prop-types';

// material-ui
import { TableCell, TextField } from '@mui/material';

// ==============================|| INVOICE - TEXT FIELD ||============================== //

const InvoiceField = ({ onEditItem, cell }) => {
  return (
    <TableCell sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 } }}>
      <TextField
        type={cell.type}
        placeholder={cell.placeholder}
        name={cell.name}
        id={cell.id}
        value={cell.type === 'number' ? (cell.value > 0 ? cell.value : '') : cell.value}
        onChange={onEditItem}
        label={cell.label}
        error={Boolean(cell.errors && cell.touched)}
        inputProps={{
          ...(cell.type === 'number' && { min: 0 })
        }}
      />
    </TableCell>
  );
};

InvoiceField.propTypes = {
  onEditItem: PropTypes.func,
  cell: PropTypes.object
};

export default InvoiceField;
