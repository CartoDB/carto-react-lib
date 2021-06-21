import React from 'react';
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
    '& .MuiTableCell-head': {
      border: 'none',
      ...theme.typography.subtitle2,
      color: theme.palette.primary.main
    }
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
                align={headCell.align}
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

export const Default = Template.bind({});
