import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { Typography, Toolbar, IconButton, Tooltip, Grid, Chip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import Filter from './Filter';
import FiltersChips from './FiltersChips';

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                  color: theme.palette.secondary.main,
                  backgroundColor: lighten(theme.palette.secondary.light, 0.85),
              }
            : {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.secondary.dark,
              },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
}));

const TableToolbarCustom = ({
    numSelected,
    tableTitle = '',
    columns = [],
    filterChange,
    filters,
    deleteHanlder,
    deleteChipsHandler,
    permissions,
}) => {
    const classes = useToolbarStyles();
    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography variant="h6" id="tableTitle">
                        {tableTitle}
                    </Typography>
                )}
            </div>
            <div className={classes.spacer}>
                <Grid container>
                    <Grid item>
                        <FiltersChips
                            filters={filters}
                            columns={columns}
                            onDelete={deleteChipsHandler}
                        />
                    </Grid>
                </Grid>
            </div>

            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton
                            disabled={!permissions.delete}
                            onClick={deleteHanlder}
                            aria-label="Delete"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <Filter columns={columns} filter={filterChange} />
                    </Tooltip>
                )}
            </div>
        </Toolbar>
    );
};

TableToolbarCustom.propTypes = {
    numSelected: PropTypes.number.isRequired,
    tableTitle: PropTypes.string,
    columns: PropTypes.array,
    filterChange: PropTypes.func,
    filters: PropTypes.object,
    deleteHanlder: PropTypes.func,
    permissions: PropTypes.shape({
        create: PropTypes.bool,
        update: PropTypes.bool,
        read: PropTypes.bool,
        delete: PropTypes.bool,
    }),
};
export default TableToolbarCustom;
