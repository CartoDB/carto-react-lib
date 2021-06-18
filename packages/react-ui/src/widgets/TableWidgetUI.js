import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

const useStyles = makeStyles((theme) => ({
  widgetTableWrapper: {
    flex: 1,
    position: 'relative',
    width: '100%',
    height: 'auto',
    minHeight: 1
  },
  datagrid: {
    border: 'none !important',
    '& .columns-container': {
      backgroundColor: 'transparent !important',
      borderBottom: `1px solid ${theme.palette.divider} !important`
    },
    '& .material-col-cell': {
      outline: 'none !important',
      alignItems: 'center'
    },
    '& .title': {
      color: theme.palette.primary.main,
      fontSize: 14,
      fontWeight: 500,
      letterSpacing: 0.15,
      lineHeight: 1.71
    },
    '& .column-separator': {
      opacity: '0 !important'
    }
  }
}));

function TableWidgetUI(props) {
  const { checkboxSelection, columns, rows, isLoading, maxItems } = props;
  const classes = useStyles();

  function handleRowClick() {
    // TODO
  }

  function handlePageChange() {
    // TODO
  }

  return (
    <div className={classes.widgetTableWrapper}>
      <DataGrid
        loading={isLoading}
        onPageChange={handlePageChange}
        onRowClick={handleRowClick}
        disableExtendRowFullWidth={false}
        autoHeight
        checkboxSelection={checkboxSelection}
        className={classes.datagrid}
        pageSize={maxItems}
        columns={columns}
        rows={rows}
        hideFooter={true}
        hideFooterPagination={true}
        hideFooterRowCount={true}
        hideFooterSelectedRowCount={true}
      />
    </div>
  );
}

TableWidgetUI.defaultProps = {
  checkboxSelection: false,
  columns: null,
  rows: null,
  isLoading: false,
  maxItems: 10
};

TableWidgetUI.propTypes = {
  checkboxSelection: PropTypes.bool,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
      width: PropTypes.number
    })
  ),
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ),
  isLoading: PropTypes.bool,
  maxItems: PropTypes.number
};

export default TableWidgetUI;
