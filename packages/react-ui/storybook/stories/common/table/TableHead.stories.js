import React, { useState } from 'react';
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  makeStyles
} from '@material-ui/core';

const options = {
  title: 'Common/Table/TableHead',
  component: TableHead
};

export default options;

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

const Template = ({ ...args }) => {
  const classes = useStyles();

  const headCells = [
    { id: 'address', label: 'Address' },
    { id: 'city', label: 'City' },
    { id: 'state', label: 'State / Province' },
    { id: 'zip', label: 'Post Code' },
    { id: 'country', label: 'Country' },
    { id: 'geocode', label: 'Geocode', align: 'right' }
  ];

  return (
    <TableContainer>
      <Table>
        <TableHead className={classes.tableHead}>
          <TableRow>
            {headCells.map((headCell) => (
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
      </Table>
    </TableContainer>
  );
};

const TemplateSorting = ({ ...args }) => {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('address');

  const headCells = [
    { id: 'address', label: 'Address' },
    { id: 'city', label: 'City' },
    { id: 'state', label: 'State / Province' },
    { id: 'zip', label: 'Post Code' },
    { id: 'country', label: 'Country' },
    { id: 'geocode', label: 'Geocode', align: 'right' }
  ];

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead className={classes.tableHead}>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.align || 'left'}
                padding={headCell.disablePadding ? 'none' : 'default'}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={() => handleRequestSort(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
};

export const Default = Template.bind({});
export const Sorting = TemplateSorting.bind({});
