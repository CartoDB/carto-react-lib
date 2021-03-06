import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormGroup,
  Grid,
  TextField
} from '@material-ui/core';

const options = {
  title: 'Common/Dialog',
  component: Dialog
};
export default options;

const Template = ({ content, ...args }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        {...args}
      >
        <DialogTitle id='alert-dialog-title'>Dialog title</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleClose} color='primary' autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const TextContent = () => (
  <DialogContentText id='alert-dialog-description'>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nunc justo, tempus sit
    amet diam tristique, posuere egestas nisi. Aliquam erat volutpat. Sed eu elit nec diam
    semper porta.
  </DialogContentText>
);

const FormContent = () => (
  <>
    <DialogContentText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </DialogContentText>
    <FormGroup>
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <TextField label='Label' size='small' fullWidth style={{ marginTop: 16 }} />
        </Grid>
        <Grid item>
          <TextField label='Label' size='small' fullWidth style={{ marginTop: 16 }} />
        </Grid>
      </Grid>
    </FormGroup>
  </>
);

export const Default = Template.bind({});
Default.args = { content: <TextContent /> };

export const Form = Template.bind({});
Form.args = { content: <FormContent /> };
