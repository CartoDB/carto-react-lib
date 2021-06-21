import React from 'react';
import TableWidgetUI from '.../../../src/widgets/TableWidgetUI';

const options = {
  title: 'Widgets UI/TableWidgetUI',
  component: TableWidgetUI,
  argTypes: {}
};
export default options;

const COLUMNS = [
  { field: 'address', headerName: 'Address', sort: true },
  { field: 'city', headerName: 'City', sort: true },
  { field: 'state', headerName: 'State / Province', sort: true },
  { field: 'zip', headerName: 'Post Code', sort: false },
  { field: 'country', headerName: 'Country', sort: false },
  { field: 'geocode', headerName: 'Geocode', align: 'right' }
];

const ROWS = [
  {
    id: 1,
    address: 'Calle Ebro nº1',
    city: 'Sevilla',
    state: 'Sevilla',
    zip: '41013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 2,
    address: 'Calle Ebro nº1',
    city: 'Sevilla',
    state: 'Sevilla',
    zip: '41013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 3,
    address: 'Calle Ebro nº1',
    city: 'Sevilla',
    state: 'Sevilla',
    zip: '41013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 4,
    address: 'Calle Ebro nº1',
    city: 'Sevilla',
    state: 'Sevilla',
    zip: '41013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 5,
    address: 'Calle Ebro nº1',
    city: 'Sevilla',
    state: 'Sevilla',
    zip: '41013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 6,
    address: 'Calle Ebro nº1',
    city: 'Sevilla',
    state: 'Sevilla',
    zip: '41013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 7,
    address: 'Calle Ebro nº1',
    city: 'Sevilla',
    state: 'Sevilla',
    zip: '41013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 8,
    address: 'Calle Ebro nº1',
    city: 'Sevilla',
    state: 'Sevilla',
    zip: '41013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 9,
    address: 'Calle Ebro nº1',
    city: 'Sevilla',
    state: 'Sevilla',
    zip: '41013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 10,
    address: 'Calle Ebro nº1',
    city: 'Sevilla',
    state: 'Sevilla',
    zip: '41013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 11,
    address: 'Calle Ebro nº1',
    city: 'Sevilla',
    state: 'Sevilla',
    zip: '41013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 12,
    address: 'Calle Ebro nº1',
    city: 'Sevilla',
    state: 'Sevilla',
    zip: '41013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  }
];

const Template = (args) => {
  return <TableWidgetUI {...args} />;
};

const DefaultProps = {
  columns: COLUMNS,
  rows: ROWS
};

export const Playgound = Template.bind({});
Playgound.args = { ...DefaultProps, rows: ROWS.slice(0, 5) };
