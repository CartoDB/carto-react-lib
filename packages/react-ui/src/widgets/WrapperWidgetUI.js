import React, { useState, createRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Collapse,
  Grid,
  Icon,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Tooltip,
  Typography
} from '@material-ui/core';
import { ExpandLess, ExpandMore, MoreVert } from '@material-ui/icons';

/*
Options props must have this format:
[
  { id: 'o0', name: 'Option 1', action: null },
  ...
];

Actions props must have this format:
[
  { id: 'a0', name: 'Autostyle', icon: '/icon-content-autostyle.svg', action: null },
  ...
];
*/

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    maxWidth: '100%',
    padding: 0
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: theme.spacing(0.25)
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '56px',
    padding: theme.spacing(1.25, 1.25, 1.25, 3)
  },
  optionsMenu: {
    marginTop: theme.spacing(6),
    maxHeight: theme.spacing(21),
    minWidth: theme.spacing(16)
  },
  button: {
    padding: 0,
    cursor: (props) => (props.expandable ? 'pointer' : 'default'),
    '& .MuiButton-label': {
      ...theme.typography.body1,

      '& .MuiButton-startIcon': {
        marginRight: theme.spacing(1)
      }
    },
    '&:hover': {
      background: 'none'
    }
  },
  iconToggle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: theme.spacing(3),
    height: theme.spacing(3),
    color: theme.palette.text.secondary
  },
  iconAction: {
    color: theme.palette.text.secondary
  },
  content: {
    padding: theme.spacing(0, 3, 3, 3)
  }
}));

function WrapperWidgetUI(props) {
  const wrapper = createRef();
  const classes = useStyles(props);
  const [expanded, setExpanded] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { options = [], actions = [], optionsIcon = <MoreVert /> } = props;

  const handleExpandClick = () => {
    if (props.expandable) {
      setExpanded(!expanded);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionAction = (action) => {
    if (action) {
      action();
    }

    handleClose();
  };

  const iconButtonTooltip = (action) => {
    return (
      <IconButton
        key={action.id}
        aria-label={action.label}
        onClick={action.action}
        className={classes.iconAction}
      >
        {action.icon}
      </IconButton>
    );
  };

  return (
    <Box component='section' aria-label={props.title} className={classes.root}>
      {props.isLoading ? <LinearProgress className={classes.loading} /> : null}
      <Grid container className={classes.header}>
        <Button
          className={classes.button}
          startIcon={
            props.expandable && (
              <Icon>
                {expanded ? (
                  <ExpandLess className={classes.iconToggle} />
                ) : (
                  <ExpandMore className={classes.iconToggle} />
                )}
              </Icon>
            )
          }
          onClick={handleExpandClick}
        >
          <Typography variant='subtitle1'>{props.title}</Typography>
        </Button>

        <Grid item style={{ display: 'flex' }}>
          {actions.length > 0 &&
            actions.map((action) => {
              return action.tooltip ? (
                <Tooltip
                  key={action.id}
                  title={action.tooltip.text}
                  placement={action.tooltip.placement || 'top'}
                >
                  {iconButtonTooltip(action)}
                </Tooltip>
              ) : (
                iconButtonTooltip(action)
              );
            })}

          {options.length > 0 && (
            <div>
              <IconButton
                aria-label='options'
                aria-controls='options-menu'
                aria-haspopup='true'
                onClick={handleClick}
                className={classes.iconAction}
              >
                {optionsIcon}
              </IconButton>
              <Menu
                id='options-menu'
                elevation={3}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{ className: classes.optionsMenu }}
              >
                {options.map((option) => (
                  <MenuItem
                    key={option.id}
                    selected={option.selected}
                    onClick={() => handleOptionAction(option.action)}
                  >
                    {option.name}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )}
        </Grid>
      </Grid>
      {/* TODO: check collapse error */}
      <Collapse ref={wrapper} in={expanded} timeout='auto' unmountOnExit>
        <Box className={classes.content}>{props.children}</Box>
      </Collapse>
    </Box>
  );
}

WrapperWidgetUI.defaultProps = {
  expandable: true,
  isLoading: false
};

WrapperWidgetUI.propTypes = {
  title: PropTypes.string.isRequired,
  expandable: PropTypes.bool,
  isLoading: PropTypes.bool,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
      action: PropTypes.func.isRequired
    })
  ),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired
    })
  ),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired
  ])
};

export default WrapperWidgetUI;
