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
    address: 'Calle Ebro',
    city: 'Sevilla',
    state: 'Sevilla',
    zip: '41013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 2,
    address: 'Calle Luis Fuentes Bejarano',
    city: 'Sevilla',
    state: 'Sevilla',
    zip: '41020',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 3,
    address: 'Paseo Acacias',
    city: 'Madrid',
    state: 'Madrid',
    zip: '28013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 4,
    address: 'Av. Luis Fuentes Becerril',
    city: 'Sevilla',
    state: 'Sevilla',
    zip: '41013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 5,
    address: 'Calle Luna',
    city: 'Madrid',
    state: 'Madrid',
    zip: '28013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 6,
    address: 'Av. Luis Montoto',
    city: 'Sevilla',
    state: 'Sevilla',
    zip: '41013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 7,
    address: 'Av. Eduardo Dato',
    city: 'Sevilla',
    state: 'Sevilla',
    zip: '41013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 8,
    address: 'Calle Gran Via',
    city: 'Madrid',
    state: 'Madrid',
    zip: '28013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 9,
    address: 'Calle Arroyo',
    city: 'Sevilla',
    state: 'Sevilla',
    zip: '41013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 10,
    address: 'Calle Goya',
    city: 'Madrid',
    state: 'Madrid',
    zip: '28013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 11,
    address: 'Calle Tetuan',
    city: 'Sevilla',
    state: 'Sevilla',
    zip: '41013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 12,
    address: 'Calle Tetuan',
    city: 'Madrid',
    state: 'Madrid',
    zip: '28013',
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

export const Sorting = Template.bind({});
Sorting.args = { ...DefaultProps, rows: ROWS.slice(0, 5), sorting: true };

export const Selecting = Template.bind({});
Selecting.args = { ...DefaultProps, rows: ROWS.slice(0, 5), selecting: true };
