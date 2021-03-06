import React from 'react';
import { Divider, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import {
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatUnderlined
} from '@material-ui/icons';

const options = {
  title: 'Common/Divider',
  component: Divider
};
export default options;

const Template = ({ ...args }) => {
  return (
    <List component='nav' aria-label='mailbox folders'>
      <ListItem button>
        <ListItemText primary='Inbox' />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemText primary='Drafts' />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemText primary='Settings' />
      </ListItem>
      <Divider />
    </List>
  );
};

const VerticalDividerTemplate = ({ ...args }) => {
  return (
    <Grid container alignItems='center'>
      <FormatAlignLeft />
      <FormatAlignCenter />
      <FormatAlignRight />
      <Divider orientation='vertical' flexItem />
      <FormatBold />
      <FormatItalic />
      <FormatUnderlined />
    </Grid>
  );
};

export const Playground = Template.bind({});

export const ListWithDivider = Template.bind({});

export const VerticalDivider = VerticalDividerTemplate.bind({});
VerticalDivider.args = {};
