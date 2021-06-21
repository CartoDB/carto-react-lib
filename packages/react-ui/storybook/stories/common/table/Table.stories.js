import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const options = {
  title: 'Common/Table/Table',
  component: Table
};

export default options;

const Template = ({ ...args }) => {
  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Franchise</TableCell>
            <TableCell>Large</TableCell>
            <TableCell>6516-6366 Edward Ave Niagara Falls, ON L2G 4K2</TableCell>
            <TableCell>12,345 €</TableCell>
            <TableCell>26/01/2021 – 13:41</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Franchise</TableCell>
            <TableCell>Large</TableCell>
            <TableCell>6516-6366 Edward Ave Niagara Falls, ON L2G 4K2</TableCell>
            <TableCell>12,345 €</TableCell>
            <TableCell>26/01/2021 – 13:41</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Franchise</TableCell>
            <TableCell>Large</TableCell>
            <TableCell>6516-6366 Edward Ave Niagara Falls, ON L2G 4K2</TableCell>
            <TableCell>12,345 €</TableCell>
            <TableCell>26/01/2021 – 13:41</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const Default = Template.bind({});