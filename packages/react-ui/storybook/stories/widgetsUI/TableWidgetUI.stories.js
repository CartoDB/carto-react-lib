import React from 'react';
import { makeStyles } from '@material-ui/core';
import TableWidgetUI from '../../../src/widgets/TableWidgetUI';

const options = {
  title: 'TableWidgetUI',
  component: TableWidgetUI,
  argTypes: {
    checkboxSelection: {
      control: {
        type: 'boolean'
      }
    }
  }
};
export default options;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100]
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const Template = ({ required, size, ...rest }) => {
  const classes = useStyles();

  const columns = [
    { field: 'id', headerName: 'ID', width: 120 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 80
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 260,
      align: 'right',
      valueGetter: (params) =>
        `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`
    }
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
  ];

  return (
    <TableWidgetUI
      columns={columns}
      rows={rows}
      maxItems={5}
      checkboxSelection={rest.checkboxSelection}
    />
  );
};

export const Playground = Template.bind({});
