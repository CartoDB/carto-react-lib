import React from 'react';
import TableWidgetUI from '.../../../src/widgets/TableWidgetUI';

const options = {
  title: 'Widgets UI/TableWidgetUI',
  component: TableWidgetUI,
  argTypes: {}
};
export default options;

const COLUMNS = [
  { id: 'address', label: 'Address', sort: true },
  { id: 'city', label: 'City', sort: true },
  { id: 'state', label: 'State / Province', sort: true },
  { id: 'zip', label: 'Post Code', sort: false },
  { id: 'country', label: 'Country', sort: false },
  { id: 'geocode', label: 'Geocode', align: 'right' }
];

const ROWS = [
  {
    id: 'r1',
    address: 'Calle Ebro nº1',
    city: 'Sevilla',
    state: 'Sevilla',
    zip: '41013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 'r2',
    address: 'Calle Ebro nº1',
    city: 'Sevilla',
    state: 'Sevilla',
    zip: '41013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 'r3',
    address: 'Calle Ebro nº1',
    city: 'Sevilla',
    state: 'Sevilla',
    zip: '41013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 'r4',
    address: 'Calle Ebro nº1',
    city: 'Sevilla',
    state: 'Sevilla',
    zip: '41013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 'r5',
    address: 'Calle Ebro nº1',
    city: 'Sevilla',
    state: 'Sevilla',
    zip: '41013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 'r6',
    address: 'Calle Ebro nº1',
    city: 'Sevilla',
    state: 'Sevilla',
    zip: '41013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 'r7',
    address: 'Calle Ebro nº1',
    city: 'Sevilla',
    state: 'Sevilla',
    zip: '41013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 'r8',
    address: 'Calle Ebro nº1',
    city: 'Sevilla',
    state: 'Sevilla',
    zip: '41013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 'r9',
    address: 'Calle Ebro nº1',
    city: 'Sevilla',
    state: 'Sevilla',
    zip: '41013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 'r10',
    address: 'Calle Ebro nº1',
    city: 'Sevilla',
    state: 'Sevilla',
    zip: '41013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 'r11',
    address: 'Calle Ebro nº1',
    city: 'Sevilla',
    state: 'Sevilla',
    zip: '41013',
    country: 'Spain',
    geocode: '37.35559, -5.98317'
  },
  {
    id: 'r12',
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
