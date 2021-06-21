import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  fade,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
  Checkbox,
  Typography,
  TableSortLabel
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  tableHead: {
    backgroundColor: theme.palette.common.white,
    '& .MuiTableCell-head, & .MuiTableCell-head span': {
      border: 'none',
      ...theme.typography.subtitle2,
      color: theme.palette.primary.main
    }
  },
  tableRow: {
    maxHeight: theme.spacing(6.5),
    transition: 'background-color 0.25s ease',
    '&:hover': {
      backgroundColor: theme.palette.background.default
    }
    // TODO: as prop
    // '&:nth-of-type(odd)': {
    //   backgroundColor: fade(theme.palette.primary.relatedLight, 0.05),
    // },
  },
  tableCell: {
    overflow: 'hidden',
    '& p': {
      maxWidth: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
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
  const {
    title,
    isLoading,
    columns,
    rows,
    sorting,
    selecting,
    order,
    orderBy,
    pagination,
    rowsPerPage
  } = props;
  const [selected, setSelected] = useState([]);
  const [tableOrder, setOrder] = useState(order);
  const [tableOrderBy, setOrderBy] = useState(orderBy);
  const [page, setPage] = useState(0);
  const [tableRowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (prop) => {
    console.log(prop);
    const isAsc = orderBy === prop && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(prop);
  };

  const onSelectAll = (event, name) => {
    // TODO
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  return (
    <TableContainer>
      <Table>
        <TableHeaderComponent
          columns={columns}
          sorting={sorting}
          selecting={selecting}
          order={tableOrder}
          orderBy={tableOrderBy}
          numSelected={selected.length}
          rowCount={rows.length}
          onSort={handleSort}
          onSelectAll={onSelectAll}
        />
        <TableBodyComponent
          columns={columns}
          rows={rows}
          selecting={selecting}
          selected={selected}
          pagination={pagination}
          page={page}
          rowsPerPage={tableRowsPerPage}
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
  onSelectAll,
  onSort
}) {
  const classes = useStyles();

  const handleRequestSort = (prop) => {
    onSort(prop);
  };

  const handleSelectAll = (event) => {
    console.log(event);
    onSelectAll(event);
  };

  return (
    <TableHead className={classes.tableHead}>
      <TableRow>
        {selecting && (
          <TableCell padding='checkbox'>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={handleSelectAll}
              inputProps={{ 'aria-label': 'select all rows' }}
            />
          </TableCell>
        )}
        {columns.map((headCell) => (
          <TableCell
            key={headCell.field}
            align={headCell.align || 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
          >
            {sorting && headCell.sort ? (
              <TableSortLabel
                active={orderBy === headCell.field}
                direction={orderBy === headCell.field ? order : 'asc'}
                onClick={() => handleRequestSort(headCell.field)}
              >
                {headCell.headerName}
              </TableSortLabel>
            ) : (
              headCell.headerName
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function TableBodyComponent({
  columns,
  rows,
  selecting,
  selected,
  order,
  orderBy,
  page,
  rowsPerPage,
  pagination
}) {
  const classes = useStyles();
  const pageFrom = pagination ? page * rowsPerPage : 0;
  const pageTo = pagination ? page * rowsPerPage + rowsPerPage : rows.length;
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleSelect = () => {};

  return (
    <TableBody>
      {stableSort(rows, getComparator(order, orderBy))
        .slice(pageFrom, pageTo)
        .map((row, r) => {
          const isItemSelected = isSelected(row.name);

          return (
            <TableRow key={row.id} className={classes.tableRow}>
              {selecting && (
                <TableCellWithCheckbox
                  selected={isItemSelected}
                  onChange={handleSelect}
                />
              )}
              {columns.map(
                (column, c) =>
                  column.headerName && (
                    <TableCell
                      key={`${r}_${c}`}
                      scope='row'
                      align={column.align || 'left'}
                      style={{ width: column.width, maxWidth: column.width }}
                      className={classes.tableCell}
                    >
                      {column.component
                        ? column.component(row[column.field])
                        : row[column.field]}
                    </TableCell>
                  )
              )}
            </TableRow>
          );
        })}
    </TableBody>
  );
}

function TableCellWithCheckbox({ selected, onChange }) {
  return (
    <TableCell padding='checkbox'>
      <Checkbox
        checked={selected}
        onChange={onChange}
        inputProps={{ 'aria-label': 'select row' }}
      />
    </TableCell>
  );
}

TableWidgetUI.defaultProps = {
  isLoading: false,
  sorting: false,
  selecting: false,
  order: 'asc',
  pagination: false,
  rowsPerPage: 5
};

TableWidgetUI.propTypes = {
  isLoading: PropTypes.bool,
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  sorting: PropTypes.bool,
  selecting: PropTypes.bool,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  pagination: PropTypes.bool,
  rowsPerPage: PropTypes.number
};

export default TableWidgetUI;
