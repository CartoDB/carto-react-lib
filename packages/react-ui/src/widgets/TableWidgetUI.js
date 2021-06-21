import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
  Checkbox
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  tableHead: {
    backgroundColor: theme.palette.common.white,
    '& .MuiTableCell-head, & .MuiTableCell-head span': {
      border: 'none',
      ...theme.typography.subtitle2,
      color: theme.palette.primary.main
    }
  },
  visuallyHidden: {
    position: 'absolute',
    top: 20,
    width: 1,
    height: 1,
    margin: -1,
    padding: 0,
    border: 0,
    clip: 'rect(0 0 0 0)',
    overflow: 'hidden'
  }
}));

function TableWidgetUI(props) {
  const { title, isLoading, columns, rows, sorting, selecting, order, orderBy } = props;
  const [selected, setSelected] = useState([]);
  const [tableOrder, setOrder] = useState(order);
  const [tableOrderBy, setOrderBy] = useState(orderBy);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = (event, name) => {
    // TODO
  };

  return (
    <TableContainer>
      <Table>
        <TableHeaderComponent columns={columns} sorting={sorting} selecting={selecting} />
        <TableBodyComponent
          columns={columns}
          rows={rows}
          sorting={sorting}
          selecting={selecting}
          selected={selected}
        />
      </Table>
    </TableContainer>
  );
}

function TableHeaderComponent({
  columns,
  sorting,
  selecting,
  order,
  orderBy,
  numSelected,
  rowCount,
  onSelectAllClick,
  onRequestSort
}) {
  const classes = useStyles();

  return (
    <TableHead className={classes.tableHead}>
      <TableRow>
        {selecting && (
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all rows' }}
          />
        )}
        {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function TableBodyComponent({ columns, rows, sorting, selecting, selected }) {
  const classes = useStyles();
  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <TableBody>
      {rows.map((row) => {
        const isItemSelected = isSelected(row.name);

        return (
          <TableRow key={row.id}>
            <TableCell>{row.address}</TableCell>
            <TableCell>{row.city}</TableCell>
            <TableCell>{row.state}</TableCell>
            <TableCell>{row.zip}</TableCell>
            <TableCell>{row.country}</TableCell>
            <TableCell align='right'>{row.geocode}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}

TableWidgetUI.defaultProps = {
  isLoading: false,
  sorting: false,
  selecting: false,
  order: 'asc'
};

TableWidgetUI.propTypes = {
  isLoading: PropTypes.bool,
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  sorting: PropTypes.bool,
  selecting: PropTypes.bool,
  order: PropTypes.string,
  orderBy: PropTypes.string
};

export default TableWidgetUI;
